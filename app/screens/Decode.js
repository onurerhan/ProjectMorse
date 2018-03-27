import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput, AsyncStorage,
        Picker } from 'react-native';
        
import { colors } from '../config/styles';
import Button from '../components/Button';
import Camera from 'react-native-camera';
import Morse from '../config/Morse';
import I18n from 'react-native-i18n';
import en from '../../app/config/en-US';
import tr from '../../app/config/tr';

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

  static navigationOptions  = () => ({
    tabBarLabel:  I18n.t('Decode')
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
      decodeOption: 0,
      text: "",
      lang:""
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
// need to fix css
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor={colors.statusBar}
          barStyle="light-content" />
        <View style={styles.innerContainer}>
        <View style= {styles.titleContainer}>
            <Text style={styles.title}>{I18n.t('DecodeHeader')}</Text>
          </View>
          <View style={styles.decode}>
            {/*<View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                style={styles.pickerStyle}
                selectedValue={this.state.decodeOption}
                onValueChange={(itemValue, itemIndex) => this.DetectChange(itemValue, itemIndex)}>
                  <Picker.Item label= {I18n.t('FromString')} value="0" />
                  <Picker.Item label= {I18n.t('WithCamera')}  value="1" />
                  <Picker.Item label= {I18n.t('WithMic')} value="2" />
              </Picker>
    </View>*/}
          </View>
          <View style={styles.optionContainer}>
              {
                this.state.decodeOption == 0 &&
                <View style={{}}>
                  <TextInput style={{fontSize:24}} value={this.state.text} ref={'textInput1'} multiline={true} onChangeText={(text) => this.setState({text})} placeholder={I18n.t('DecodePlaceholder')}></TextInput>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button style={[this.props.style]} width text= "." onPress = {() => {this.AddCharacter('.')}} />
                    <Button text= "-" width onPress = {() => {this.AddCharacter('-')}} />
                    <Button text= "^" width onPress = {() => {this.AddCharacter(' ')}} />
                    <Button text= {I18n.t('Clear')}  width onPress = {() => this.setState({text: ''})} />
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
                <Text style={styles.title}>{I18n.t('MorseToText')} </Text>
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