import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
const Account = (props) => {
  const {theme} = useContext(ColorsContext);
  const {user} = useContext(AuthenticationContext);

  const emails = [
    {
      id: 1,
      email: '456@gmail.com'
    },
    {
      id: 2,
      email: '789@gmail.com'
    }
  ]

  return <ScrollView style={{...styles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Username</Text>
        <Text style={{...styles.text, color: theme.text}}>You can change your username, which impacts how you sign in.
          It also shows up as part of your profile URL (if you choose to share it).</Text>
      </View>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>Username</Text>
        <TextInput placeholder={user.name} style={{...styles.textInput, backgroundColor: theme.foreground1}}/>
        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}>
          <Text style={{...styles.buttonText, color: theme.text}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Email address</Text>
        <Text style={{...styles.text, color: theme.text}}>We send account updates, billing and newsletters to the primary email.
          You can login with any verified email address so you never lose access to your account.</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{...styles.subTitle, color: theme.text}}>Primary email:</Text>
          <Text style={{...styles.text, color: theme.text}}> {user.email}</Text>
        </View>
        {
          user.additionEmail.length ?user.additionEmail.map( item =>
            <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{...styles.subTitle, color: theme.text}}>Additional email:</Text>
              <Text style={{...styles.text, color: theme.text}}> {item.email}</Text>
            </View>
          ) : null
        }
        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}>
          <Text style={{...styles.buttonText, color: theme.text}}>Add email</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Password</Text>
      </View>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>Current password</Text>
        <TextInput style={{...styles.textInput, color: theme.text, backgroundColor: theme.foreground1}}/>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <Text style={{...styles.subTitle, color: theme.text}} >New password</Text>
        <TextInput style={{...styles.textInput, color: theme.text, backgroundColor: theme.foreground1}}/>
        <Text style={{...styles.subTitle, color: theme.text}} >Confirm password</Text>
        <TextInput style={{...styles.textInput, color: theme.text, backgroundColor: theme.foreground1}}/>
        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}>
          <Text style={{...styles.buttonText, color: theme.text}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Multi-Factor Authentication: Disabled</Text>
      </View>
      <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}>
        <Text style={{...styles.buttonText, color: theme.text}}>Enable</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Name</Text>
      </View>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>First name</Text>
        <TextInput style={{...styles.textInput, color: theme.text, backgroundColor: theme.foreground1}}/>
        <Text style={{...styles.subTitle, color: theme.text}}>Last name</Text>
        <TextInput style={{...styles.textInput, color: theme.text, backgroundColor: theme.foreground1}}/>
        <TouchableOpacity style={{...styles.button, backgroundColor: theme.foreground1}}>
          <Text style={{...styles.buttonText, color: theme.text}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: theme.text}}>Manage Account</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={{...styles.linkText}}>I would like to Delete My Personal Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  sectionContainer: {
    marginBottom: 40,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  button: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    padding: 7,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500'
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
  }
})

export default Account;
