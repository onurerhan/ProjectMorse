import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import CustomSwitch from '../components/CustomSwitch';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: colors.background,
    },
    main: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.headerText,
      fontWeight: '400',
      fontStyle: 'italic',
    },
});

class Settings extends Component {
  render() {
    return (
    
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection:'column', flex:1}}>
              <Text style={{fontSize:20, color:'#63686E', marginBottom:6}}>LANGUAGE</Text>
              <View style={{ flex:1, borderRadius: 6, borderWidth: 0.5, backgroundColor:'#FFF', borderColor: '#d6d7da'}}>
                <View style={{ flexDirection: 'row',padding:5,justifyContent: 'space-between',flex:1, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>English</Text>
                  <CustomSwitch  />
                </View>
                <View style={{ flexDirection: 'row',padding:5,justifyContent: 'space-between',flex:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Türkçe</Text>
                  <CustomSwitch  />
                </View>
              </View>
            </View>

            <View style={{flexDirection:'column', flex:1}}>
              <Text style={{fontSize:20, color:'#63686E', marginBottom:6,marginTop:10}}>NOTIFICATION</Text>
              <View style={{ flex:1, borderRadius: 6, borderWidth: 0.5, backgroundColor:'#FFF', borderColor: '#d6d7da'}}>
                <View style={{ flexDirection: 'row',padding:5, justifyContent: 'space-between',flex:1, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Encode SMS Data</Text>
                  <CustomSwitch  />
                </View>
                <View style={{ flexDirection: 'row',padding:5,justifyContent: 'space-between',flex:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Encode Call Data</Text>
                  <CustomSwitch  />
                </View>
              </View>
            </View>

            <View style={{flexDirection:'column', flex:1}}>
              <Text style={{fontSize:20, color:'#63686E', marginBottom:6, marginTop:10}}>SETTINGS</Text>
              <View style={{ flex:1, borderRadius: 6, borderWidth: 0.5, backgroundColor:'#FFF', borderColor: '#d6d7da'}}>
                <View style={{ flexDirection: 'row', padding:5,justifyContent: 'space-between',flex:1, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Use Vibration</Text>
                  <CustomSwitch  />
                </View>
                <View style={{ flexDirection: 'row', padding:5,justifyContent: 'space-between',flex:1, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Use Flashlight</Text>
                  <CustomSwitch  />
                </View>
                <View style={{ flexDirection: 'row',padding:5,justifyContent: 'space-between',flex:1}}>
                  <Text style={{alignSelf:'center', paddingLeft:4}}>Use Sound</Text>
                  <CustomSwitch  />
                </View>
              </View>
            </View>
        </ScrollView>
      </View>

      );
  }
}

export default Settings;