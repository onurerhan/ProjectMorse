import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = (props) => {
	const { text, onPress } = props;
	
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;