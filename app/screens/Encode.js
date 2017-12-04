import React, {Component} from 'react';
import { StyleSheet, Text, View, Slider, TextInput, Vibration } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import CustomSwitch from '../components/CustomSwitch';
import Morse from '../config/Morse';

const PATTERN = 1000;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: colors.background,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    titleContainer: {
      backgroundColor:"#bdd7a7",
      padding:10,
      marginBottom:10, 
      justifyContent:"center"
    },
    title: {    
      color: "#212f15",
      fontSize:16
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

class Encode extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
=======

  constructor(props){
    super(props);

    this.state = {
      isFlashlight: true,
      isSound: false,
      isVibration: false,
      speed: 12,
      text: ""
    }

  }

  ConvertMorseToText = (charInput) => {
    return Morse[charInput];
  }

  Vibrate = () => {
    Vibration.vibrate(PATTERN);
  }

>>>>>>> erol-dev
  render() {

    return (
        <View style={styles.container}>
          <View style= {styles.titleContainer}>
            <Text style={styles.title}>Please toggle an option</Text>
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Flashlight</Text>
<<<<<<< HEAD
            <Switch value={false} />
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Sound</Text>
            <Switch value={false} />
          </View>
=======
            <CustomSwitch value={this.state.isFlashlight} onValueChange = {(value) => {this.setState({isFlashlight:value})}} />
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Sound</Text>
            <CustomSwitch value={this.state.isSound} onValueChange = {(value) => {this.setState({isSound:value})}} />
            </View>
>>>>>>> erol-dev
          <View style={styles.optionContainer}>
            <Text>Use Vibration</Text>
            <CustomSwitch value={this.state.isVibration} onValueChange = {(value) => {this.setState({isVibration:value})}} />
            </View>
          <View style={styles.optionContainer}>
            <Text>Speed(WPM) # {this.state.speed}</Text>
            
            <Slider style={styles.slider} step={1} 
                value={this.state.speed}
                onValueChange={val => this.setState({ speed: val })}
                minimumValue={1}
                maximumValue={100}  />
          </View>
<<<<<<< HEAD
          <View>
            <TextInput multiline={false} onChangeText={(text) => this.setState({text})} placeholder="Please enter some text" ></TextInput>
          </View>
          <View>
            <Text>
              {this.state.text.split('').map((character) => this.toMorse(character.toUpperCase())).join('  ')}
            </Text>
=======
          <View style = {styles.morseConvertContainer}>
            <View style={styles.morseTextInput}>
              <TextInput multiline={true} onChangeText={(text) => this.setState({text})} placeholder="Please enter some text"></TextInput>
            </View>
            <View style={{}}>
              <Button text= "Convert" onPress = {() => {this.Vibrate()}} />
            </View>
>>>>>>> erol-dev
          </View>

          <View style= {styles.titleContainer}>
            <Text style={styles.title}>Live Morse to Text</Text>
            <Text style={styles.liveConvert}>{this.state.text.split('').map((character) => this.ConvertMorseToText(character.toUpperCase())).join('  ')}</Text>
          </View>

        </View>
      );
  }
<<<<<<< HEAD
  toMorse(char_input){
    var morse = {
      " ":" / ",
      "'":".----.",
      "(":"-.--.-",
      ")":"-.--.-",
      ",":"--..--",
      "-":"-....-",
      ".":".-.-.-",
      "/":"-..-.",
      "0":"-----",
      "1":".----",
      "2":"..---",
      "3":"...--",
      "4":"....-",
      "5":".....",
      "6":"-....",
      "7":"--...",
      "8":"---..",
      "9":"----.",
      ":":"---...",
      ";":"-.-.-.",
      "?":"..--..",
      "A":".-",
      "B":"-...",
      "C":"-.-.",
      "D":"-..",
      "E":".",
      "F":"..-.",
      "G":"--.",
      "H":"....",
      "I":"..",
      "J":".---",
      "K":"-.-",
      "L":".-..",
      "M":"--",
      "N":"-.",
      "O":"---",
      "P":".--.",
      "Q":"--.-",
      "R":".-.",
      "S":"...",
      "T":"-",
      "U":"..-",
      "V":"...-",
      "W":".--",
      "X":"-..-",
      "Y":"-.--",
      "Z":"--..",
      "_":"..--.-"
    }
    return (morse[char_input]);
  }
=======
  
>>>>>>> erol-dev
}

export default Encode;