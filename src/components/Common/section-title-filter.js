import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {ColorsContext} from "../../provider/colors-provider";


const SectionTitleFilter = (props) => {
  const {theme} = useContext(ColorsContext);

  const [type, setType] = useState('All');
  const onLevelChange = (itemValue) => {
    props.onPressFilterLevel(itemValue);
    setType(itemValue);
  }
  const onTypeChange = (itemValue) => {
    props.onPressFilterTime(itemValue);
    setType(itemValue);
  }
  return <View style={styles.title}>
    <Text style={{...styles.titleText, color: theme.text}}>{props.title}</Text>
    <Picker
      mode={'dropdown'}
      selectedValue={type}
      style={{ height: 20, width: 100, padding: 5, color: theme.text }}
      onValueChange={(itemValue, itemIndex) => type!==itemValue ? onLevelChange(itemValue) : null}>
      <Picker.Item label="All" value="All"/>
      <Picker.Item label="Beginner" value="Beginner" />
      <Picker.Item label="Intermediate" value="Intermediate" />
      <Picker.Item label="Advanced" value="Advanced" />
    </Picker>

    <Picker
      mode={'dropdown'}
      selectedValue={type}
      style={{ height: 20, width: 100, padding: 5, color: theme.text }}
      onValueChange={(itemValue, itemIndex) => type!==itemValue ? onTypeChange(itemValue) : null}
    >
      <Picker.Item label="Newest" value="Newest" />
      <Picker.Item label="Oldest" value="Oldest" />
    </Picker>
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
    marginRight: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
  },
})
export default SectionTitleFilter;
