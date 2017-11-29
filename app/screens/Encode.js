import React, {Component} from 'react';
import { StyleSheet, Text, View, Switch, Slider, TextInput } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import '../to_morse.js'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: colors.background,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    title: {
      marginBottom:10, 
      fontWeight:"bold",
      fontSize:15
    },
    slider: {
      width:150
    }
});

class Encode extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Please toggle an option</Text>
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Flashlight</Text>
            <Switch value={false} />
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Sound</Text>
            <Switch value={false} />
          </View>
          <View style={styles.optionContainer}>
            <Text>Use Vibration</Text>
            <Switch value={false} />
          </View>
          <View style={styles.optionContainer}>
            <Text>Speed(WPM)</Text>
            <Slider style={styles.slider} step={1} 
                minimumValue={1}
                maximumValue={100}  />
          </View>
          <View>
            <TextInput multiline={true} placeholder="Please enter some text"></TextInput>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
      );
  }
}

export default Encode;