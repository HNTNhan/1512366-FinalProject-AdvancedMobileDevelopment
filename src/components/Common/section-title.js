import React, {useContext} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";

const SectionTitle = (props) => {
  const {theme} = useContext(ColorsContext);

  return <View style={styles.title}>
    <Text style={{...styles.titleText, color: theme.text}}>{props.title}</Text>
    <TouchableOpacity style={styles.button}
                      onPress={props.onPress}>
      <Text style={{...styles.buttonText, color: theme.text}}> {props.buttonText} </Text>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 0,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
})
export default SectionTitle;
