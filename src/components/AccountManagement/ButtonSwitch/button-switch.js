import React, {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity} from 'react-native';

const ButtonSwitch = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              toggleSwitch();
              props.onPress
            }}
  >
    <Text style={styles.text}>{props.title}</Text>
    <Switch
      trackColor={{ false: "#gainsboro", true: "#81b0ff" }}
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
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  }
})

export default ButtonSwitch;
