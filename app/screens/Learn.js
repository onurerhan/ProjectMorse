import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf:'stretch',
      backgroundColor: colors.backgroundColor
    },
    innerContainer:{
      flex:1,
      alignSelf:'stretch',
      margin: 20, // We can change to 10, Onur?
      padding:5,
      backgroundColor:'#FFF'
    },
    content:{
      flex: 1,
      flexDirection:'column',
      justifyContent:'space-around',
      alignSelf: 'stretch'
    },
    textSection:{
      flex:4,
    },
    characterSection:{
      flex: 2,
      borderRadius: 4, borderWidth: 2.5, borderColor: '#77D400',
      justifyContent:'center', alignItems:'center',
      marginBottom: 7,
      backgroundColor:'#FFF'
    },
    morseSection:{
      flex: 2,
      justifyContent:'center', alignItems:'center',
      borderRadius: 4, borderWidth: 2.5, borderColor: '#77D400',
      marginBottom: 7,
      backgroundColor:'#FFF'
    },
    buttonSection:{
      flex: 2,
      alignSelf:'stretch',
      borderRadius: 6, borderWidth: 2.5, borderColor: '#77D400',
      backgroundColor:'#FFF'
    },
    header:{
      flexDirection:'row',
      marginBottom:7
    },
    iconSection:{
      flex:2,
      justifyContent:'center',
      alignItems:'center'
    },
    learnText:{
      fontWeight:'bold', fontSize:18, color:'#000'
    },
    astText:{
      padding:5, color:'#fff',borderRadius: 6, alignSelf: 'flex-start',backgroundColor:'#A9A9A9'
    },
    letter:{fontSize:50, fontWeight:'500'},
    answer:{fontSize:35, fontWeight:'500'},
    userInput:{fontSize:54, fontWeight:'500'},
    buttonContainer:{flex:1, backgroundColor:'#77D400'},
    button: {flex:1, justifyContent:'center', alignItems:'center'}
});

class Learn extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.content}>
            
              <View style={styles.header}>
                <View style={styles.textSection}>
                  <Text style={styles.learnText}>Learn using Koch Method</Text>
                  <Text style={styles.astText}>Complete the assesment</Text>
                </View>
                <View style={styles.iconSection}>
                  <Icon name="assessment" size={50} color="#86DF13" />
                </View>
              </View>
           
              <View style={styles.characterSection}>
                <Text style={styles.letter}>B</Text>
                <TouchableOpacity>
                  <Icon name="help" size={36} color="#757575" />
                </TouchableOpacity>
                <Text style={styles.answer}></Text>
              </View>
              <View style={styles.morseSection}>
                <Text style={styles.userInput}>-...</Text>
              </View>
              <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.6} style={styles.button} 
                      onPressIn = {
                        () => {
                          console.warn('In')
                        }
                      } 
                      onPressOut = {
                        () => {
                          console.warn('Out')
                        }
                      }>  
                    <Icon name="refresh" size={60} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
  }
}

export default Learn;