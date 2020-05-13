import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";

const Register = (props) => {
  const [check, setCheck] = useState(false);

  return <View style={{flex: 1}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h3 style={styles.title}>Create your account</Text>
      <InputTextSae title={'Email*'}/>
      <InputTextSae title={'First name*'}/>
      <InputTextSae title={'Last name*'}/>
      <InputTextSae title={'Phone'}/>
      <InputTextSae title={'Country'}/>
      <Text style={styles.text}>* Required field</Text>
      <CheckBox
        checked={check}
        title='By checking here and continuing, I agree to the Terms of Use.'
        textStyle={{color: 'white'}}
        containerStyle={{backgroundColor: null, marginLeft: 0, marginRight: 0, padding: 5}}
        onPress={() => setCheck(!check)}
      />
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => console.log('Send email')}
        title ='Create Account' />
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  title: {
    color: 'white',
    textAlign:'center',
    marginBottom: 20
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  saeContainer: {
    borderRadius: 7,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  saeLabel: {
    color: '#03A9F4',
    fontWeight: '600',
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  saeInput: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
    marginBottom: -5,
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
})
export default Register;
