import React, {useContext, useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const ButtonSwitch = (props) => {
  const {theme} = useContext(ColorsContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              toggleSwitch();
              props.onPress
            }}
  >
    <Text style={{...styles.text, color: theme.text}}>{props.title}</Text>
    <Switch
      trackColor={{ false: theme.foreground2, true: "#19B5FE" }}
      thumbColor={isEnabled ? "white" : "white"}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  }
})

export default ButtonSwitch;
