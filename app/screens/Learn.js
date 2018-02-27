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
      justifyContent:'center', alignItems:'center',
      borderRadius: 4, borderWidth: 2.5, borderColor: '#77D400',
      marginBottom: 7,
      backgroundColor:'#FFF'
    },
    buttonSection:{
      flex: 2,
      alignSelf:'stretch',
      borderRadius: 6, borderWidth: 2.5, borderColor: '#77D400',
      backgroundColor:'#FFF'
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
    buttonContainer:{flex:1, backgroundColor:'#77D400'},
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
  }


  constructor(props){
    super(props);
    this.state = {
      morse: "",
      text: "",
      hint: "",
      correct_message: "Correct!",
      counter: 0,
      lock: [],
      wpm: 20,
      level: 1,
      level1: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      level2: ["SOS","SMS","HI"],
      level3: ["HELLO WORLD","HELP ME","I AM STUCK","INSIDE THE PHONE"],
      sub_level: 0,
      level_completion: 0,
      sub_level_completion: 0,
      complete_progress: 0,
      try_number: 2,
    }
  }
//level 1: tek harf
//level 2: 2-3 harf
//level 3: kelimeler
//level 3: cümleler
  async ConvertMorseToText(){
    var userinput = this.state.morse.split(" ");
    var textoutput = "";
    for(n=0;n<userinput.length;n++){
      textoutput += Object.keys(Morse).find(key => Morse[key] === userinput[n]);
    }
    this.setState({text: textoutput});
    this.GameFunc();
  }

  async clearWindow(){
    this.setState({text: ""});
    this.setState({morse: ""});
  }

  async GameFunc(){
    if(this.state.level == 1){
      this.Level1();
    } else if(this.state.level == 2){
      this.Level2();
    } else if(this.state.level == 3){
      this.Level3();
    }
    
  }

  async Level1(){

    if (this.state.level1[this.state.sub_level] == this.state.text[0] && this.state.sub_level_completion < this.state.try_number){
      await wait(1000);
      this.clearWindow();
      this.state.sub_level_completion += 1;
      if (this.state.sub_level_completion == this.state.try_number){
        this.state.sub_level_completion = 0;
        this.state.sub_level += 1;
        this.state.complete_progress = this.state.sub_level / this.state.level1.length * 100;
        console.warn("Next Level: " + this.state.level1[this.state.sub_level]);
      }
      if(this.state.sub_level_completion == this.state.level1.length){
        this.state.level += 1;
      }
      return 0;
    }
    console.warn("Wrong");
    await wait(1000);
    this.clearWindow();
  }

  async Level2(){

    console.warn("Wrong");
    await wait(1000);
    this.clearWindow();
  }

  async Level3(){

    console.warn("Wrong");
    await wait(1000);
    this.clearWindow();
  }

  async Hint(){
    if(this.state.level == 1){
      this.Level1();
    } else if(this.state.level == 2){
      this.Level2();
    } else if(this.state.level == 3){
      this.Level3();
    }
  }

  async getMorse(counter){
    var morseofbutton = "";
    await wait(100);
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
    await wait(500);
    if(this.state.lock[counter] == false && this.state.lock[counter + 1] == null){
      morseofbutton += " ";
      this.ConvertMorseToText();
    }
    this.setState({morse:this.state.morse + morseofbutton});
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.textSection}>
                  <Text style={styles.learnText}>{I18n.t('LearnTitle')}: {this.state.level}</Text>
                  <Text style={styles.astText}>{I18n.t('Complete')}: {this.state.complete_progress}%</Text>
                </View>
                <View style={styles.iconSection}>
                  {/* <Icon name="assessment" size={50} color="#86DF13" /> */}
                </View>
              </View>
              <View style={styles.characterSection}>
                <Text style={styles.letter}>{this.state.text}</Text>
                <TouchableOpacity>
                  <Icon name="help" size={36} color="#757575" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.clearWindow()}}>
                  <Icon name="clear" size={30} color="#757575" />
                </TouchableOpacity>
                <Text style={styles.answer}></Text>
              </View>
              <View style={styles.morseSection}>
                <Text style={styles.userInput}>{this.state.morse}</Text>
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