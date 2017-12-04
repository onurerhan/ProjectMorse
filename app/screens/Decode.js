import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput, 
        Picker  } from 'react-native';

import { colors } from '../config/styles';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
    pickerContainer:{
      flex:1,
      alignItems:'flex-end'
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
    pickerStyle: {
      width:'60%'
    }
});

class Decode extends Component {

  constructor(props){
    super(props);
    this.state = {
      decodeOption: "java"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor={colors.statusBar}
          barStyle="light-content" />

        <View style={styles.decode}>
          <View style={styles.pickerContainer}>
            <Picker
              mode="dropdown"
              style={styles.pickerStyle}
              selectedValue={this.state.decodeOption}
              onValueChange={(itemValue, itemIndex) => this.setState({decodeOption: itemValue})}>
                <Picker.Item label="Please select an option" value="0" />
                <Picker.Item label="With camera" value="1" />
                <Picker.Item label="With microphone" value="2" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

export default Decode;