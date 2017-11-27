import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput  } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      padding: 10,
      backgroundColor: colors.background,
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
    }
});

class Decode extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor={colors.statusBar}
          barStyle="light-content" />

        <View style={styles.decode}>
          <TextInput placeholder="Text here" style={{width:100}}>

          </TextInput>
          <Button text="Decode" />
        </View>


      </View>
    );
  }
}

export default Decode;