import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {globalStyles} from "../../../Globles/styles";

const SplashScreen = (props) => {
  const [loading, setLoading] = useState(0)
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    !(counter < 100 && setTimeout(() => setCounter(counter + 1), 1)) ? props.navigation.navigate('Authentication') : null;
  }, [counter])

  return <View style={styles.container}>
    <Image source={require('../../../../assets/splash_screen.png')}
           style={globalStyles.splashScreen}/>
    <Text style={{position: 'absolute'}}>Loading...{counter}</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SplashScreen;
