import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
      flex: 1,
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

class Learn extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={{backgroundColor:'#F5F2F9', flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:55}}>A</Text>
              <TouchableOpacity>
                <Text style={{fontSize:25}}>?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor:'#e3eddb', flex:1, justifyContent:'center', alignItems:'center'}}>
          
          <Text style={{fontSize:50}}>-.--</Text>
          </View>
          <View style={{backgroundColor:'#91ba6f', flex:1}}>
            <TouchableOpacity style={{backgroundColor:'#6a9844', borderRadius:3, alignItems:'center', justifyContent:'center', flex:1, margin:25}} activeOpacity={0.4}>
              <Text style={{color:'#fff', fontSize:26, fontWeight:'500'}}>Press</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

export default Learn;