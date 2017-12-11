import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput, 
        Picker  } from 'react-native';

import { colors } from '../config/styles';
import Button from '../components/Button';
import Camera from 'react-native-camera';

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
    optionContainer: {
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
    preview: {
      height:'80%'
    },
    pickerStyle: {
      width:'60%'
    },
    titleContainer: {
      backgroundColor:"#bdd7a7",
      padding:10,
      marginBottom:10, 
      justifyContent:"center"
    },
    title: {    
      color: "#212f15",
      fontSize:16
    }
});

class Decode extends Component {

  constructor(props){
    super(props);
    this.state = {
      decodeOption: "java"
    }
  }

  DetectChange = (itemValue, itemIndex) => {
    this.setState({decodeOption: itemValue});
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
              onValueChange={(itemValue, itemIndex) => this.DetectChange(itemValue, itemIndex)}>
                <Picker.Item label="From string" value="0" />
                <Picker.Item label="With camera" value="1" />
                <Picker.Item label="With microphone" value="2" />
            </Picker>
          </View>
        </View>
        <View style={styles.optionContainer}>
              {this.state.decodeOption == 1 &&
                  <Camera
                    ref={(cam) => {
                      this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                </Camera>
              }
          <View style= {styles.titleContainer}>
            <Text style={styles.title}>Morse to Text</Text>
            <Text style={styles.liveConvert}></Text>
          </View>
       </View>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
}}

export default Decode;