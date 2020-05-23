import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import PathItems from "../../Main/Home/PathItems/path-items";

const Setting = (props) => {
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

  return <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Username</Text>
        <Text style={styles.text}>You can change your username, which impacts how you sign in.
          It also shows up as part of your profile URL (if you choose to share it).</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>Username</Text>
        <TextInput placeholder={props.userName} style={styles.textInput}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Email address</Text>
        <Text style={styles.text}>We send account updates, billing and newsletters to the primary email.
          You can login with any verified email address so you never lose access to your account.</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={styles.subTitle}>Primary email:</Text>
          <Text style={styles.text}> {props.email}</Text>
        </View>
        {
          emails.map( item =>
            <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={styles.subTitle}>Additional email:</Text>
              <Text style={styles.text}> {item.email}</Text>
            </View>
          )
        }
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add email</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Password</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>Current password</Text>
        <TextInput style={styles.textInput}/>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <Text style={styles.subTitle} >New password</Text>
        <TextInput style={styles.textInput}/>
        <Text style={styles.subTitle} >Confirm password</Text>
        <TextInput style={styles.textInput}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Multi-Factor Authentication: Disabled</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enable</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>First name</Text>
        <TextInput style={styles.textInput}/>
        <Text style={styles.subTitle}>Last name</Text>
        <TextInput style={styles.textInput}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Manage Account</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.linkText}>I would like to Delete My Personal Data</Text>
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

export default Setting;
