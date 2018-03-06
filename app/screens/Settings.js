import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, CheckBox, 
  Slider, AsyncStorage,ToastAndroid} from 'react-native';

import { colors } from '../config/styles';
import Button from '../components/Button';
import CustomSwitch from '../components/CustomSwitch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CONST from '../config/Constants'
import I18n from 'react-native-i18n';
import en from '../../app/config/en-US';
import tr from '../../app/config/tr';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    directionRow: {
      flexDirection:'row',
      
    },
    innerContainer:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#FFF',
      padding:5,
      margin:20
    },
    languageContainer:{
      flexDirection:'column',
     
    },
    languageText:{
      
    },
    languageOption:{
      
    },
    title:{
      backgroundColor:"#77D400",
      paddingVertical:10,
      paddingLeft:8
    },
    lngInnerContainer:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    languageLeftSide:{
      flexDirection:'row',
      alignSelf:'center'
    },
    languageText:{fontWeight:'600', marginLeft:5, alignSelf:'center'},
    languageOption:{
      
      
    },
    pickerStyle:{
      width: 150
    },
    notificationContainer:{
      flex:1,
      justifyContent:'flex-start',
      flexDirection:'column'
    },
    notifHeader:{
      backgroundColor:"#77D400",
      flexDirection:'row',
      justifyContent:'space-between',
      padding:5
    },
    option:{
      flexDirection: 'row', 
      padding:5,
      justifyContent: 'space-between',
      borderBottomColor:'#ccc',
      borderBottomWidth:1
    },
    slider: {
      width:170
    },
    optionText:{alignSelf:'center', paddingLeft:8, fontWeight:'600'}
});

class Settings extends Component {

  static navigationOptions  = () => ({
    tabBarLabel:  I18n.t('Settings')
  });

  constructor(props){
    super(props);

     this.state = {
      currentLanguage: '1',
      isSms: false,
      isEmail: false,
      speed: 0.8,
      isVibration: false,
      isFlashlight: false,
      isSound: false,

    }

  }

  async componentWillMount(){
    this.setState({currentLanguage: await this.getLanguageData()});

    await this.getAsyncData('_USE_SMS');
    await this.getAsyncData('_USE_VIBRATION');
    await this.getAsyncData('_USE_SOUND');
    await this.getAsyncData('_USE_MAIL');
    await this.getAsyncData('_USE_FLASHLIGHT');

    let isSms = this.state.isSms, 
        isEmail = this.state.isEmail,
        isFlashlight = this.state.isFlashlight,
        isVibration = this.state.isVibration,
        isSound = this.state.isSound;

    //this.setState({isSms: !isSms});
  //  this.setState({isEmail: !isEmail});
    //this.setState({isFlashlight: !isFlashlight});
    //this.setState({isVibration: !isVibration});
   // this.setState({isSound: !isSound});
  }

  async getLanguageData(){

   let a = await this.getData('_LANGUAGE').then((s) => {
    if(s == 'tr') return "1"; else return "0";
   });
   return a;

  }

  async getAsyncData(data){

    let a = await this.getData(data).then((s) => {

      if(data == '_USE_SMS'){
        if(s == 'true'){
          this.setState({isSms: true});
        }else{
          this.setState({isSms: false});
        }
      }

      if(data == '_USE_MAIL'){
        if(s == 'true'){
          this.setState({isEmail: true});
        }else{
          this.setState({isEmail: false});
        }
      }

      if(data == '_USE_VIBRATION'){
        if(s == 'true'){
          this.setState({isVibration: true});
        }else{
          this.setState({isVibration: false});
        }
      }

      if(data == '_USE_FLASHLIGHT'){
        if(s == 'true'){
          this.setState({isFlashlight: true});
        }else{
          this.setState({isFlashlight: false});
        }
      }

      if(data == '_USE_SOUND'){
        if(s == 'true'){
          this.setState({isSound: true});
        }else{
          this.setState({isSound: false});
        }
      }
    });

   }

  LanguageChange(itemValue, itemIndex){
    this.setState({currentLanguage: itemValue});
    if(itemValue == 0){
      this.saveData('_LANGUAGE', 'en')
    }else if(itemValue == 1){
      this.saveData('_LANGUAGE', 'tr')
    }

    ToastAndroid.show(I18n.t('LangChange'), ToastAndroid.LONG);
   
  }

  async getData(key){
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

  async saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }  
  }

  OnSmsChanged(){
    let isSms = this.state.isSms;
    if(!isSms == true){
      this.saveData('_USE_SMS', 'true')
    }else{
      this.saveData('_USE_SMS', 'false')
    }
    this.setState({isSms: !isSms});

  }

  OnEmailChanged(){
    let isEmail = this.state.isEmail;
    if(!isEmail == true){
      this.saveData('_USE_MAIL', 'true')
    }else{
      this.saveData('_USE_MAIL', 'false')
    }
    this.setState({isEmail: !isEmail});

  }

  OnSpeedChanged(){
    this.setState({isSpeed: !this.state.isSpeed});
  }

  OnVibrationChanged(){
    let isVibration = this.state.isVibration;
    if(!isVibration == true){
      this.saveData('_USE_VIBRATION', 'true')
    }else{
      this.saveData('_USE_VIBRATION', 'false')
    }
    this.setState({isVibration: !isVibration});
  }

  OnFlashlightChanged(){
    let isFlashlight = this.state.isFlashlight;
    if(!isFlashlight == true){
      this.saveData('_USE_FLASHLIGHT', 'true')
    }else{
      this.saveData('_USE_FLASHLIGHT', 'false')
    }
    this.setState({isFlashlight: !isFlashlight});
  }

  OnSoundChanged(){
    let isSound = this.state.isSound;
    if(!isSound == true){
      this.saveData('_USE_SOUND', 'true')
    }else{
      this.saveData('_USE_SOUND', 'false')
    }
    this.setState({isSound: !isSound});
  }

  render() {
    return (
    
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.languageContainer}>
            <View style={styles.title}>
              <Text style={[{color:colors.activeTintColor, fontWeight:'500', fontSize:17}]}>{I18n.t('Language')}</Text>
            </View>

            <View style={styles.lngInnerContainer}>
              <View style={styles.languageLeftSide}>
                  <Icon name="language" size={30} color="#757575" />
                  <Text style={styles.languageText}>{I18n.t('Language')}</Text>
              </View>
              <View style={styles.languageOption}>
                <Picker
                    mode="dropdown"
                    style={styles.pickerStyle}
                    selectedValue={this.state.currentLanguage}
                    onValueChange={(itemValue, itemIndex) => this.LanguageChange(itemValue, itemIndex)}>
                      <Picker.Item label="English" value="0" />
                      <Picker.Item label="Türkçe"  value="1" />
                  </Picker>
              </View>
            </View>
            
          </View>

          <View style={styles.notificationContainer}>
            <View style={styles.notifHeader}>
                <View style={styles.title}>
                  <Text style={{color:colors.activeTintColor, fontWeight:'500', fontSize:17}}>{I18n.t('Notification')}</Text>
                </View>
                {/* <CustomSwitch value={this.state.isNotification} onValueChange = {(value) => this.Notifications(value)} /> */}
            </View>
            <View style={styles.option}>
                <View style={styles.directionRow}>
                  <Icon name="textsms" size={30} color="#757575" />
                  <Text style={styles.optionText}>{I18n.t('SmsNot')}</Text>
                </View>
                <CheckBox value={this.state.isSms} onChange={() => this.OnSmsChanged()} ></CheckBox>
            </View>
            <View style={styles.option}>
              <View style={styles.directionRow}>
                <Icon name="email" size={30} color="#757575" />
                <Text style={styles.optionText}>{I18n.t('EmailNot')}</Text>
              </View>
              <CheckBox value={this.state.isEmail} onChange={() => this.OnEmailChanged()}></CheckBox>
            </View>
            <View style={styles.option}>
              <View style={styles.directionRow}>
                <Icon name="show-chart" size={30} color="#757575" />
                <Text style={styles.optionText}>{I18n.t('Speed')} {this.state.speed} WPM</Text>
                </View>
                <Slider style={styles.slider} step={1} 
                  value={this.state.speed}
                  onValueChange={val => this.setState({ speed: val })}
                  minimumValue={1}
                  maximumValue={100}  />
            </View>
            <View style={styles.option}>
              <View style={styles.directionRow}>
                <Icon name="vibration" size={30} color="#757575" />
                <Text style={styles.optionText}>{I18n.t('UseVib')}</Text>
              </View>
                <CheckBox value={this.state.isVibration} onChange={() => this.OnVibrationChanged()}></CheckBox>
            </View>
            <View style={styles.option}>
              <View style={styles.directionRow}>
                <Icon name="flash-on" size={30} color="#757575" />
                <Text style={styles.optionText}>{I18n.t('UseFlash')}</Text>
              </View>
                <CheckBox value={this.state.isFlashlight} onChange={() => this.OnFlashlightChanged()}></CheckBox>
            </View>
            <View style={styles.option}>
              <View style={styles.directionRow}>
                <Icon name="surround-sound" size={30} color="#757575" />
                <Text style={styles.optionText}>{I18n.t('UseSound')}</Text>
              </View>
                <CheckBox value={this.state.isSound} onChange={() => this.OnSoundChanged()}></CheckBox>
            </View>
          </View>
        </View>
      </View>

      );
  }
}

export default Settings;