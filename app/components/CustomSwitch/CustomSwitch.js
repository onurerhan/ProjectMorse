import React from 'react';
import { Text, View, Switch} from 'react-native';
import styles from './styles';

const CustomSwitch = (props) => {
	const { value, onValueChange } = props;
	
  return (
    <Switch 
        onValueChange = {onValueChange} value= {value}>
    </Switch>

  );
};

export default CustomSwitch;