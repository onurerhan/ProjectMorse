import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
          <Text style={styles.main}>
          Settings
          </Text>
        </View>
      );
  }
}

export default Settings;