import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import {ColorsContext} from "../../provider/colors-provider";
import {Icon} from "react-native-elements";

const InputTextSae = (props) => {
  const {theme} = useContext(ColorsContext)
  const [hide, setHide] = useState(props.secureTextEntry);

  const onPressHide = () => {
    setHide(!hide)
  }

  return <View style={{...styles.container}}>
    <Sae
      label={props.title}
      labelStyle={styles.saeLabel}
      inputStyle={{...styles.saeInput, color: theme.text}}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={'#03A9F4'}
      inputPadding={3}
      labelHeight={16}
      borderHeight={2}
      autoCapitalize={'none'}
      autoCorrect={false}
      secureTextEntry={hide}
      value={props.value}
      style={{...styles.saeContainer, backgroundColor: theme.foreground1}}
      onChangeText={(text) => props.onChangeText(text)}
    />
    {props.secureTextEntry && props.value.length ?
      <Icon name={hide ? 'eye-slash' : 'eye'} type={"font-awesome-5"} size={18} color={theme.text} containerStyle={{...styles.icon}} onPress={() => onPressHide()}/>
      : null}
  </View>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  saeContainer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'gainsboro',
    marginTop: 10,
    width: '100%'
  },
  saeLabel: {
    color: '#19B5FE',
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
  icon: {
    position: 'absolute',
    right: 5,
    bottom: 2,
    height: 47,
    paddingTop: 15,
    paddingHorizontal: 5
  },
})

export default InputTextSae;
