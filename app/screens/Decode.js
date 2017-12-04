import React, {Component} from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, StatusBar,TextInput,AppRegistry,
  Dimensions,
  TouchableHighlight  } from 'react-native';
=======
import { StyleSheet, Text, View, StatusBar,TextInput, 
        Picker  } from 'react-native';

>>>>>>> erol-dev
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
<<<<<<< HEAD
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
=======
    pickerStyle: {
      width:'60%'
>>>>>>> erol-dev
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
<<<<<<< HEAD
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>

=======
>>>>>>> erol-dev
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