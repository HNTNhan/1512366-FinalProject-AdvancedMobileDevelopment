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
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('')

  const onChangeEmail = (email) => {
    setEmail(email)
  }

  const onChangeFirstName = (firstName) => {
    setFirstName(firstName)
  }
  const onChangeLastName = (lastName) => {
    setLastName(lastName)
  }

  const onChangePhone = (phone) => {
    setPhone(phone)
  }

  return <View style={{flex: 1}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h3 style={styles.title}>Create your account</Text>
      <InputTextSae title={'Email*'} value={email} onChangeText={onChangeEmail}/>
      <InputTextSae title={'First name*'} value={firstName} onChangeText={onChangeFirstName}/>
      <InputTextSae title={'Last name*'} value={lastName} onChangeText={onChangeLastName}/>
      <InputTextSae title={'Phone'} value={phone} onChangeText={onChangePhone}/>
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
        textStyle={{fontSize: 14}}
        containerStyle={styles.checkBox}
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
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: '#E0E0E0',
  },
  inputIOS: {
    borderRadius: 7,
    marginBottom: 5,
    padding: 10,
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  placeholder: {
    color: '#03A9F4',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  title: {
    textAlign:'center',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
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
  checkBox: {
    backgroundColor: 'white',
    marginLeft: 0,
    marginRight: 0,
    padding: 5
  }
})
export default Register;
