import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import RNPickerSelect from 'react-native-picker-select';
import countryList from 'react-select-country-list'

const Register = (props) => {
  const [check, setCheck] = useState(false);
  const countries = countryList().getData();
  const [country, setCountry] = useState('');

  return <View style={{flex: 1}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h3 style={styles.title}>Create your account</Text>
      <InputTextSae title={'Email*'}/>
      <InputTextSae title={'First name*'}/>
      <InputTextSae title={'Last name*'}/>
      <InputTextSae title={'Phone'}/>
      <RNPickerSelect
        placeholder={{label: "Select Country", value: null, color: '#03A9F4'}}
        items={countries}
        onValueChange={(value) => setCountry(value)}
        style={{ ...picker}}
        useNativeAndroidPickerStyle={false}
      />

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
        onPress={() => console.log('Create Account')}
        title ='Create Account' />
    </ScrollView>
  </View>
};
const picker = StyleSheet.create({
  inputAndroid: {
    borderRadius: 7,
    marginBottom: 5,
    padding: 10,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  inputIOS: {
    borderRadius: 7,
    marginBottom: 5,
    padding: 10,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  placeholder: {
    color: '#03A9F4',
  },
})
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
  saeContainer: {
    borderRadius: 7,
    marginBottom: 5,
    padding: 10,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
})
export default Register;
