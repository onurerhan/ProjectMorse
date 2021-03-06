import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput, 
        Picker } from 'react-native';
        
import { colors } from '../config/styles';
import Button from '../components/Button';
import Camera from 'react-native-camera';
import Morse from '../config/Morse';

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
    pickerContainer:{
      flex:1,
      alignItems:'flex-end'
    },
    optionContainer: {
      flex:1
    },
    main: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.headerText,
      fontWeight: '400',
      fontStyle: 'italic',
    },
    decode: {
      flexDirection:"row"
    },
    preview: {
      height:'80%'
    },
    pickerStyle: {
      width:'60%'
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
    liveConvert: {
      fontSize:17, 
      fontWeight:"500"
    },
    morseButton: {

    },
});

class Decode extends Component {

  constructor(props){
    super(props);
    this.state = {
      decodeOption: 0,
      text: ""
    }
    
  }
  
  ConvertMorseToText = () => {
    var userinput = this.state.text.split(" ");
    var textoutput = "";
    for(n=0;n<userinput.length;n++){
      textoutput += Object.keys(Morse).find(key => Morse[key] === userinput[n]);
    }
    return textoutput;
  }

  DetectChange = (itemValue, itemIndex) => {
    this.setState({decodeOption: itemValue});
  }

  AddCharacter(input){
    var hold = this.state.text;
    var output = hold + input; 
    this.setState({text: output});
  }
// not working otherwise need to find better fix
// need to fix css
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor={colors.statusBar}
          barStyle="light-content" />
        <View style={styles.innerContainer}>
          <View style={styles.decode}>
            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                style={styles.pickerStyle}
                selectedValue={this.state.decodeOption}
                onValueChange={(itemValue, itemIndex) => this.DetectChange(itemValue, itemIndex)}>
                  <Picker.Item label="From string" value="0" />
                  <Picker.Item label="With camera" value="1" />
                  <Picker.Item label="With microphone" value="2" />
              </Picker>
            </View>
          </View>
          <View style={styles.optionContainer}>
              {
                this.state.decodeOption == 0 &&
                <View style={{}}>
                  <TextInput value={this.state.text} ref={'textInput1'} multiline={true} onChangeText={(text) => this.setState({text})} placeholder="Please enter some text"></TextInput>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button style={[this.props.style]} width text= "." onPress = {() => {this.AddCharacter('.')}} />
                    <Button text= "-" width onPress = {() => {this.AddCharacter('-')}} />
                    <Button text= "^" width onPress = {() => {this.AddCharacter(' ')}} />
                    <Button text= "Clear" width onPress = {() => this.setState({text: ''})} />
                  </View> 
                </View>
              }
              {
                this.state.decodeOption == 1 &&
                <Camera
                  ref={(cam) => {
                    this.camera = cam;
                  }}
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}>
                </Camera>
              }
              <View style= {styles.titleContainer}>
                <Text style={styles.title}>Morse to Text</Text>
                <Text style={styles.liveConvert}>{this.ConvertMorseToText()}</Text>
              </View>
              
          </View>
        </View>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
}}

export default Decode;