import I18n from 'react-native-i18n';
import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import en from './en-US';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr
};



export default I18n;