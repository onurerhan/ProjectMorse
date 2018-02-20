import React, {Component} from 'react';
import { StyleSheet, Text, View, Slider, TextInput, Vibration } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import CustomSwitch from '../components/CustomSwitch';
import Morse from '../config/Morse';
import Sound from 'react-native-sound';
import Torch from 'react-native-torch';
import tr from '../config/tr';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf:'stretch',
      backgroundColor: colors.background,
    },
    innerContainer:{
      flex:1,
      alignSelf:'stretch',
      margin: 20,
      padding:5,
      backgroundColor:'#FFF'
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    titleContainer: {
      marginBottom:10, 
      justifyContent:"center",
      backgroundColor:"#77D400",
      paddingVertical:10,
      paddingLeft:8
    },
    title: {
      color:colors.activeTintColor, fontWeight:'500', fontSize:17,
    },
    slider: {
      width:150
    },
    morseConvertContainer: {
      flexDirection:'row',
      justifyContent:"space-between"
    },
    morseTextInput: {
      flex:1
    },
    liveConvert: {
      fontSize:17, 
      fontWeight:"500"
    }
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

var whoosh;

class Encode extends Component {
  componentDidMount(){
    whoosh = new Sound('hz.mp3', Sound.MAIN_BUNDLE, (error) => {
     
    });

  }
  
  constructor(props){
    super(props);

    this.state = {
      isFlashlight: false,
      isSound: false,
      isVibration: true,
      stopToggle: false,
      speed: 5,
      text: ""
    }

  }

  ConvertTextToMorse = () => {
    return this.state
                .text.split('')
                .map((character) => this.FindMorseOf(character.toUpperCase()))
                .join('  ');
    
  }

  FindMorseOf = (charInput) => {
    return Morse[charInput];
  }

  Main(){
    if(this.state.isFlashlight === true){
      this.Flash();
    }
    if(this.state.isSound === true){ 
      this.Audio();        
    } 
    if(this.state.isVibration === true){
      this.Vibrate();
    }
  }

  async Flash(){
    var user_input = this.ConvertTextToMorse();
    var unit_time =parseInt(400/this.state.speed);
    for (var counter = 0; counter < user_input.length; counter++) {
      if(this.state.stopToggle==false){
        if(user_input[counter]=="-"){
          Torch.switchState(true);
          await wait(unit_time * 2);
        } else if(user_input[counter]=="."){
          Torch.switchState(true);
          await wait(unit_time);
        } else if(user_input[counter]=="/"){
          await wait(unit_time * 1.6);
        } else if(user_input[counter]==" "){
          await wait(unit_time);
        }
      } else if(this.state.stopToggle==true){
        unit_time = 0;
      }
      Torch.switchState(false);
      await wait(unit_time);
      }  
  }
  async Audio(){
    
    var user_input = this.ConvertTextToMorse();
    var unit_time = parseInt(400/this.state.speed);
    for (var counter = 0; counter < user_input.length; counter++) {
      if(this.state.stopToggle==false){
        if(user_input[counter]=="-"){
          whoosh.play();
          await wait(unit_time * 2);
        } else if(user_input[counter]=="."){
          whoosh.play();
          await wait(unit_time);
        } else if(user_input[counter]=="/"){
          await wait(unit_time * 1.6);
        } else if(user_input[counter]==" "){
          await wait(unit_time);
        }
      } else if(this.state.stopToggle==true){
        unit_time = 0;
      }
      whoosh.stop();
      await wait(unit_time);
    }  
  }
  Vibrate = () => {
    var user_input = this.ConvertTextToMorse();
    var vibration_time = [0];
    var unit_time =parseInt(400/this.state.speed);
    
    for(var counter = 0; counter < user_input.length; counter++){
      if(user_input[counter]=="-"){
        vibration_time.push(parseInt(2 * unit_time));
      } else if(user_input[counter]=="."){
        vibration_time.push(unit_time);
      } else if(user_input[counter]=="/"){
        vibration_time.push(0, 2 * unit_time, 0);
      } else if(user_input[counter]==" "){
        vibration_time.push(0, unit_time, 0);
      }
      vibration_time.push(unit_time);
    }
    Vibration.vibrate(vibration_time);
  }

  async Stop_morse(){
    Vibration.cancel();
    this.state.stopToggle = true;
    await wait(500);
    this.state.stopToggle = false;
  }

  render() {

    return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style= {styles.titleContainer}>
              <Text style={styles.title}>Please toggle an option</Text>
            </View>
            <View style={styles.optionContainer}>
              <Text>Use Flashlight</Text>
              <CustomSwitch value={this.state.isFlashlight} onValueChange = {(value) => {this.setState({isFlashlight:value})}} />
            </View>
            <View style={styles.optionContainer}>
              <Text>Use Sound</Text>
              <CustomSwitch value={this.state.isSound} onValueChange = {(value) => {this.setState({isSound:value})}} />
              </View>
            <View style={styles.optionContainer}>
              <Text>Use Vibration</Text>
              <CustomSwitch value={this.state.isVibration} onValueChange = {(value) => {this.setState({isVibration:value})}} />
              </View>
            <View style={styles.optionContainer}>
              <Text>Speed:{this.state.speed} WPM</Text>
              
              <Slider style={styles.slider} step={1} 
                  value={this.state.speed}
                  onValueChange={val => this.setState({ speed: val })}
                  minimumValue={1}
                  maximumValue={20}  />
            </View>
            <View style = {styles.morseConvertContainer}>
              <View style={styles.morseTextInput}>
                <TextInput multiline={true} onChangeText={(text) => this.setState({text})} placeholder="Please enter some text"></TextInput>
              </View>
              <View style={{}}>
                <Button text= "Convert" onPress = {() => {this.Main();}} />
              </View>
            </View>
            <View style= {styles.titleContainer}>
              <Text style={styles.title}>Live Text to Morse</Text>
              <Text style={styles.liveConvert}>{this.ConvertTextToMorse()}</Text>
              <View style={{}}>
                <Button text= "Stop" onPress = {() => {this.Stop_morse();}} />
              </View>
            </View>

          </View>
        </View>
      );
  }
  
}

export default Encode;