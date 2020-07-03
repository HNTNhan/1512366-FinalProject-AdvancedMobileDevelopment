import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import InputTextSae from "../../Common/input-text-sae";
import {ColorsContext} from "../../../provider/colors-provider";
import {checkEmail, checkName, checkPhone, register} from "../../../core/services/authentication-services";

const Register = (props) => {
  const {theme} = useContext(ColorsContext)
  const [checkBox, setCheckBox] = useState(false);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [checkInput, setCheckInput] = useState({email: false, firstName: false, lastName: false, phone: false, password: false})
  const [message, setMessage] = useState('');

  const onChangeEmail = (email) => {
    if(email.length) {
      let temp = {...checkInput}
      temp.email = checkEmail(email)
      setCheckInput(temp)
      setEmail(email)
    } else {
      setEmail(email)
    }
  }

  const onChangeFirstName = (firstName) => {
    if(firstName.length) {
      let temp = {...checkInput}
      temp.firstName = checkName(firstName)
      setCheckInput(temp)
      setFirstName(firstName)
    } else {
      setFirstName(firstName)
    }
  }

  const onChangeLastName = (lastName) => {
    if(lastName.length) {
      let temp = {...checkInput}
      temp.lastName = checkName(lastName)
      setCheckInput(temp)
      setLastName(lastName)
    } else {
      setLastName(lastName)
    }
  }

  const onChangePassword = (password) => {
    if(password.length) {
      let temp = {...checkInput}
      temp.password = !(password.length<8 || password.length>20)
      setCheckInput(temp)
      setPassword(password)
    } else {
      setPassword(password)
    }
  }

  const onChangePhone = (phone) => {
    if(phone.length) {
      let temp = {...checkInput}
      temp.phone = phone.length===10 || checkPhone(phone)
      setCheckInput(temp)
      setPhone(phone)
    } else {
      setPhone(phone)
    }
  }

  const onPressCreateAccount = () => {
    const username = firstName + ' ' + lastName
    register(username, email, phone, password)
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return <View style={{flex: 1, backgroundColor: theme.background}}>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
      <Text h3 style={{...styles.title, color: theme.text}}>Create your account</Text>

      <InputTextSae title={'Email*'} value={email} onChangeText={onChangeEmail}/>
      {
        email ? !checkInput.email ? <Text style={{...styles.checkText}}>Invalid email!</Text> : null : null
      }

      <InputTextSae title={'First name*'} value={firstName} onChangeText={onChangeFirstName}/>
      {
        firstName ? !checkInput.firstName ? <Text style={{...styles.checkText}}>Name cannot contain numbers or special characters like #,%, $, ...!</Text> : null : null
      }

      <InputTextSae title={'Last name*'} value={lastName} onChangeText={onChangeLastName}/>
      {
        lastName ? !checkInput.lastName ? <Text style={{...styles.checkText}}>Name cannot contain numbers or special characters like #,%, $, ...!</Text> : null : null
      }

      <InputTextSae title='Password*' value={password} onChangeText={onChangePassword} secureTextEntry={true}/>
      {
        password ? !checkInput.password ? <Text style={{...styles.checkText}}>Password must be between 8 and 20 characters!</Text>: null : null
      }

      <InputTextSae title={'Phone*'} value={phone} onChangeText={onChangePhone}/>
      {
        phone ? !checkInput.phone ? <Text style={{...styles.checkText}}>Please enter a valid phone number!</Text>: null : null
      }

      <Text style={{...styles.text, color: theme.text}}>* Required field</Text>
      <TouchableOpacity onPress={() => setCheckBox(!checkBox)}>
        <View style={{...styles.checkBoxContainer}}>
          <Icon name={!checkBox ? 'square' : 'check-square'} type={"font-awesome-5"} size={18} color={!checkBox ? theme.color : '#03A9F4'}/>
          <Text style={{...styles.checkBoxText, color: theme.text}}>
            By checking here and continuing, I agree to the
            <Text style={{fontWeight: 'bold'}} onPress={() => alert('Terms of Use')}> Terms of Use.</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <Button
        disabled={!(checkInput.email && checkInput.phone && checkInput.password && checkInput.lastName && checkInput.firstName && checkBox)}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => onPressCreateAccount()}
        title ='Create Account' />

      <Button
        buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
        titleStyle={styles.buttonText}
        onPress={() => props.navigation.goBack()}
        title ='Cancel' />
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
    marginVertical: 5,
  },
  checkText: {
    color: 'red',
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  checkBoxText: {
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1
  },
})
export default Register;
