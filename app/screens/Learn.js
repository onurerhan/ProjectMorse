import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Morse from '../config/Morse';
import I18n from '../../app/config/i18n';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf:'stretch',
      backgroundColor: colors.backgroundColor
    },
    innerContainer:{
      flex:1,
      alignSelf:'stretch',
      margin: 20,
      padding:5,
      backgroundColor:'#FFF'
    },
    content:{
      flex: 1,
      flexDirection:'column',
      justifyContent:'space-around',
      alignSelf: 'stretch'
    },
    textSection:{
      flex:4,
    },
    characterSection:{
      flex: 2,
      borderRadius: 4, borderWidth: 2.5, borderColor: '#77D400',
      justifyContent:'center', alignItems:'center',
      marginBottom: 7,
      backgroundColor:'#FFF'
    },
    morseSection:{
      flex: 2,
      justifyContent:'space-around', alignItems:'center',
      borderRadius: 4, borderWidth: 2.5, borderColor: '#77D400',
      marginBottom: 7,
      backgroundColor:'#FFF'
    },
    buttonSection:{
      flex: 2,
      alignSelf:'stretch',
      borderRadius: 6, borderWidth: 2.5, borderColor: '#A4A3A3',
      backgroundColor:'#A4A3A3'
    },
    header:{
      flexDirection:'row',
      marginBottom:7
    },
    iconSection:{
      flex:2,
      justifyContent:'center',
      alignItems:'center'
    },
    learnText:{
      fontWeight:'bold', fontSize:20, color:'#000'
    },
    astText:{
      padding:5, color:'#fff',borderRadius: 6, alignSelf: 'flex-start',
      backgroundColor:'#A9A9A9',
      fontSize:18
    },
    letter:{fontSize:50, fontWeight:'500'},
    answer:{fontSize:35, fontWeight:'500'},
    userInput:{fontSize:54, fontWeight:'500'},
    buttonContainer:{flex:1, backgroundColor:'#A4A3A3'},
    button: {flex:1, justifyContent:'center', alignItems:'center'}
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class Learn extends Component {

  static navigationOptions  = () => ({
    tabBarLabel:  I18n.t('Learn')
  });

  async GetAsyncStorageData(key){
    try {
      let value = await AsyncStorage.getItem(key);
      if (value !== null){
        return value;
      }
    } catch (error) {
      console.warn(error);
      // Error retrieving data
    }
  }

  async GetLanguageData(){
    let a = await this.GetAsyncStorageData('_LANGUAGE').then((s) => {
     if(s == 'tr') return "1"; else return "0";
    });
    return a;
   }


  fetchLanguage = async() => {
    try {
      const res = await this.GetLanguageData();
      this.setState({lang:res});
    } catch (e) {
    } 
  }

  componentWillMount(){
    this.fetchLanguage();
    this.randomizeLevels();
    this.Hint(0);
  }

  constructor(props){
    super(props);
    this.state = {
      morse: "",
      text: "",
      hint: "",
      counter: 0,
      lock: [],
      space_lock: [],
      space_counter: 0,
      wpm: 20,
      level: 0,
      game: [["E"], ["T"],
      ["A", "I", "N", "M"],
      ["AN", "ET", "IN"],
      ["O", "G", "K", "D", "W", "R", "U", "S"],
      ["SOS", "SMS", "DAN", "RUS", "WIN", "GROUND"],
      ["Q", "Z", "Y", "C", "X", "B", "J", "P", "L", "F", "V", "H"],
      ["FLY", "QUICK", "PLAYGROUND"],
      ["-", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      ],
      sub_level: 0,
      level_completion: 0,
      sub_level_completion: 0,
      complete_progress: 0,
      try_number: 3,
      hint_hide: false,
      border: '#77D400',
      background: '#FFF',
      tries: 0,
    }
  }

  async ConvertMorseToText(){
    var userinput = this.state.morse.split(" ");
    var textoutput = "";
    for(n=0;n<userinput.length;n++){
      textoutput += Object.keys(Morse).find(key => Morse[key] === userinput[n]);
    }
    this.setState({text: textoutput});
    
  }

  async clearWindow(){
    this.setState({text: ""});
    this.setState({morse: ""});
  }


  async Game(){
    if (this.state.game[this.state.level][this.state.sub_level] == this.state.text){
      this.setState({background:'#77D400'})
      await wait(1000);
      this.setState({background:'#fff'})
      this.state.sub_level_completion += 1;
      this.state.tries = 0;
      this.clearWindow();
      if (this.state.sub_level_completion == this.state.try_number){
        this.state.sub_level_completion = 0;
        this.state.sub_level += 1;
        this.state.complete_progress = Math.floor(this.state.sub_level / this.state.game[this.state.level].length * 100);
        if(this.state.complete_progress >= 100){
          this.state.level += 1;
          this.state.sub_level = 0;
          this.state.complete_progress = 0;
        }
        this.Hint();
      }
      return 0;
    }else if(this.state.text.length >= this.state.game[this.state.level][this.state.sub_level].length){
      this.setState({background:'#ff0000'})
      this.state.tries += 1;
      await wait(1000);
      this.setState({background:'#fff'})
      this.clearWindow();
    }
  }

  async Hint(){
    this.setState({hint:""})
    if(this.state.hint_hide == true){
      this.setState({hint:this.state.game[this.state.level][this.state.sub_level]});
    } else {
      this.setState({hint:this.state.game[this.state.level][this.state.sub_level] + ": " + this.state.game[this.state.level][this.state.sub_level].split('')
      .map((character) => this.FindMorseOf(character.toUpperCase()))
      .join('  ')});
    }
  }

  FindMorseOf = (charInput) => {
    return Morse[charInput];
  }

  async getMorse(counter){
    if(this.state.space_lock[this.state.space_counter] == true){
      this.state.space_lock[this.state.space_counter] = false;
      var incounter = this.state.space_counter + 1;
      this.setState({space_counter: incounter});
      this.state.space_lock[this.state.space_counter] = false;
    }
    var morseofbutton = "";
    await wait(200);
    if(this.state.lock[counter] == false){
      morseofbutton += ".";
    } else{
      await wait(600);
      if(this.state.lock[counter] == false){
        morseofbutton += "-";
      }
    }
    this.setState({morse:this.state.morse + morseofbutton});
  }

  async getSpace(counter){
    
    var morseofbutton = "";
    await wait(1000);
    if(this.state.lock[counter] == false && this.state.lock[counter + 1] == null){
      if(this.state.text != " " || this.state.text != ""){
        this.state.space_lock[this.state.space_counter] = true;
        this.blankSpace();
      }
      morseofbutton += " ";
      this.ConvertMorseToText();
      this.Game();
      
    }
    this.setState({morse:this.state.morse + morseofbutton});
    
  }

  async blankSpace(){
    await wait(2000);
    if(this.state.space_lock[this.state.space_counter] == true && (this.state.text != " " && this.state.text != "")){
      this.setState({morse:this.state.morse + " / "});
    }
    this.state.space_lock[this.state.space_counter] = false;
  }

  async showHint(){
    if(this.state.hint_hide == true){
      this.state.hint_hide = false;
      this.Hint();
      await wait(3000);
      this.state.hint_hide = true;
      this.Hint();
    }
  }

  randomizeLevels(){
    var level_data = this.state.game;
    var counter = 0;
    while (counter < level_data.length){
      level_data[counter] = this.shuffle(level_data[counter]);
      counter += 1;
    }
    this.setState({game:level_data})
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  inputText(){
    if (this.state.text == ""){
      return " ";
    } 
    return this.state.text;
  }
  
  hintText(){
    if (this.state.hint == ""){
      return " ";
    } 
    return this.state.hint;
  }

  morseText(){
    if (this.state.morse == ""){
      return " ";
    } 
    return this.state.morse;
  }

  tutorial(){
    if (this.state.level == 0){
      if(this.state.tries > 2){
        return I18n.t('Tutorial0b');
      }
      return I18n.t('Tutorial0a');
    }
    if (this.state.level == 1){
      if(this.state.tries > 2){
        return I18n.t('Tutorial1b');
      }
      return I18n.t('Tutorial1a');
    }
    if (this.state.level == 2){
      if(this.state.tries > 2){
        return I18n.t('Tutorial2b');
      }
      return I18n.t('Tutorial2a');
    }
    if (this.state.level == 3){
      if(this.state.tries > 2){
        return I18n.t('Tutorial3b');
      }
      return I18n.t('Tutorial3a');
    }
    if (this.state.level == 4){
      if(this.state.tries > 2){
        return I18n.t('Tutorial4b');
      }
      return I18n.t('Tutorial4a');
    }
    if (this.state.level == 5){
      if(this.state.tries > 2){
        return I18n.t('Tutorial5b');
      }
      return I18n.t('Tutorial5a');
    }
  }


  render() {
    return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.textSection}>
                  <Text style={styles.learnText}>{I18n.t('LearnTitle')}: {this.state.level + 1}</Text>
                  <Text style={styles.astText}>{I18n.t('Complete')}: {this.state.complete_progress}% </Text>
                  <Text style={styles.learnText}>{I18n.t('Step')}: {this.state.sub_level_completion}/3</Text>
                </View>
                <View style={styles.iconSection}>
                  {/* <Icon name="assessment" size={50} color="#86DF13" /> */}
                </View>
              </View>
              <View style={[{
                    flex: 2,
                    borderRadius: 4, 
                    borderWidth: 2.5, 
                    borderColor: '#77D400',
                    justifyContent:'space-around', 
                    alignItems:'center',
                    marginBottom: 7,
                    backgroundColor:this.state.background, 
                    borderColor:this.state.border,
                    }]}>
                <Text style={styles.letter}>{this.inputText()}</Text>
                <TouchableOpacity onPress={() => {
                  this.showHint();
                  }}>
                  <Icon name="help" size={36} color="#757575" />
                </TouchableOpacity>
                <Text style={styles.letter}>{this.hintText()}</Text>
                <Text style={styles.answer}></Text>
              </View>
              <View style={styles.morseSection}>
                <Text style={styles.userInput}>{this.morseText()}</Text>
                <Text>{this.tutorial()}</Text>
              </View>
              <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.2} style={styles.button} 
                      onPressIn = {
                        () => {
                          this.state.lock[this.state.counter] = true;
                          this.getMorse(this.state.counter);
                        }
                      } 
                      onPressOut = {
                        () => {
                          this.state.lock[this.state.counter] = false;
                          this.getSpace(this.state.counter);
                          this.state.counter += 1;
                        }
                      }>
                    {/* <Icon name="refresh" size={60} color="#fff" /> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
  }
}

export default Learn;