import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";

const CenterActivityIndicator = (props) => {
  const {theme} = useContext(ColorsContext)

  return <View style={{...styles.container, backgroundColor: props.backgroundColor || theme.background}}>
    <ActivityIndicator size={'large'} color={'blue'}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default CenterActivityIndicator;
