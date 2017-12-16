import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView, Picker, CheckBox, Slider} from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import CustomSwitch from '../components/CustomSwitch';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    innerContainer:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#FFF',
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
      backgroundColor:"#bdd7a7",
      padding:10
    },
    lngInnerContainer:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    languageText:{
      paddingLeft:10,
      alignSelf:'center'
    },
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
      backgroundColor:"#bdd7a7",
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
      width:150
    },
    optionText:{alignSelf:'center', paddingLeft:4}
});

class Settings extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
    
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.languageContainer}>
            <View style={styles.title}>
              <Text style={{color:colors.blackColor}}>Language</Text>
            </View>

            <View style={styles.lngInnerContainer}>
              <View style={styles.languageText}>
                  <Text>Language</Text>
              </View>
              <View style={styles.languageOption}>
                <Picker
                    mode="dropdown"
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => {}}>
                      <Picker.Item label="English" value="0" />
                      <Picker.Item label="Türkçe" value="1" />
                      <Picker.Item label="Dutch" value="2" />
                      <Picker.Item label="Polskie" value="3" />
                  </Picker>
              </View>
            </View>
            
          </View>

          <View style={styles.notificationContainer}>
            <View style={styles.notifHeader}>
                <View style={styles.title}>
                  <Text style={{color:colors.blackColor}}>Notification</Text>
                </View>
                <CustomSwitch  />
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Sms Notifications</Text>
                <CheckBox></CheckBox>
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Mail Notifications</Text>
                <CheckBox></CheckBox>
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Speed(WPM)</Text>
                <Slider style={styles.slider} step={1} 
                  onValueChange={val => this.setState({ speed: val })}
                  minimumValue={1}
                  maximumValue={100}  />
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Use Vibration</Text>
                <CheckBox></CheckBox>
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Use Flashlight</Text>
                <CheckBox></CheckBox>
            </View>
            <View style={styles.option}>
                <Text style={styles.optionText}>Use Sound</Text>
                <CheckBox></CheckBox>
            </View>
          </View>
        </View>
      </View>

      );
  }
}

export default Settings;