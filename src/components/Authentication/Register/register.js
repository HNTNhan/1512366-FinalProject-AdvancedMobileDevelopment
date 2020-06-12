import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import countryList from 'react-select-country-list'
import {ColorsContext} from "../../../provider/colors-provider";
import Select from 'react-select';
import {Picker} from "@react-native-community/picker";

const Register = (props) => {
  const {theme} = useContext(ColorsContext)
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

  return <View style={{flex: 1, backgroundColor: theme.background}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h3 style={styles.title}>Create your account</Text>
      <InputTextSae title={'Email*'} value={email} onChangeText={onChangeEmail}/>
      <InputTextSae title={'First name*'} value={firstName} onChangeText={onChangeFirstName}/>
      <InputTextSae title={'Last name*'} value={lastName} onChangeText={onChangeLastName}/>
      <InputTextSae title={'Phone'} value={phone} onChangeText={onChangePhone}/>

      <Picker
        mode={'dropdown'}
        selectedValue={country}
        style={{ height: 20, width: '100%', marginBottom: 10}}
        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
        { countries.map((country) => <Picker.Item key={country.value} label={country.label} value={country.value} />) }
      </Picker>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
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
