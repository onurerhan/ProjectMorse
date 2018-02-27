import { AppRegistry, AsyncStorage } from 'react-native';

import React, {Component} from 'react';
import { Image, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import DecodeScreen from './app/screens/Decode';
import EncodeScreen from './app/screens/Encode';
import LearnScreen from './app/screens/Learn';
import SettingsScreen from './app/screens/Settings';
import { colors } from './app/config/styles';
import en from './app/config/en-US';
import tr from './app/config/tr';

import I18n from 'react-native-i18n';

const Tabs = TabNavigator({
    EncodeScreen: {
      screen: EncodeScreen,
    },
    DecodeScreen: {
      screen: DecodeScreen,
    },
    LearnScreen: {
        screen: LearnScreen,
    },
    SettingsScreen: {
        screen: SettingsScreen,
    }
},{
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: colors.activeTintColor,
        labelStyle: {
          fontSize: 12,
          fontWeight: "bold"
        },
        style: {
          backgroundColor: colors.header
        },
      }
    
});


class App1 extends Component {

  constructor(props){
    super(props);

    this.state = {
      lang:""
    }



  }

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


  async componentWillMount(){
    let a = await this.GetLanguageData();
    this.setState({lang:a});
    if(a == "1"){
      I18n.locale = "tr";
    }else{
      I18n.locale = "en";
    }
  }

  render(){

    return (
      <Tabs />
    )
  }

}


AppRegistry.registerComponent('MorseProject', () => App1);
