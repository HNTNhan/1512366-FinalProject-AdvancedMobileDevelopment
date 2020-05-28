import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";

const InputTextSae = (props) => {
  return <Sae
    label={props.title}
    labelStyle={styles.saeLabel}
    inputStyle={styles.saeInput}
    iconClass={FontAwesomeIcon}
    iconName={'pencil'}
    iconColor={'#03A9F4'}
    inputPadding={3}
    labelHeight={16}
    borderHeight={2}
    autoCapitalize={'none'}
    autoCorrect={false}
    secureTextEntry={props.secureTextEntry || false}
    value={props.value}
    style={styles.saeContainer}
    onChangeText={(text) => props.onChangeText(text)}
  />
};

const styles = StyleSheet.create({
  saeContainer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'gainsboro',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  saeLabel: {
    color: '#03A9F4',
    fontWeight: '600',
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  saeInput: {
    color: 'black',
    marginHorizontal: 10,
    fontSize: 16,
    marginBottom: -5,
  },
})

export default InputTextSae;
