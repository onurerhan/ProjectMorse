import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TextInput,AppRegistry,
  Dimensions,
  TouchableHighlight  } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import Camera from 'react-native-camera';

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
    },
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
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>

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