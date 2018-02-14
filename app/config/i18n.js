import I18n from 'react-native-i18n';
import en from './en-US';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  tr,
  en
};

I18n.locale = "tr";

export default I18n;