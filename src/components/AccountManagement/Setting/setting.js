import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';

const Setting = (props) => {
  return <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View>
      <View>
        <Text>Username</Text>
        <Text>You can change your username, which impacts how you sign in.
          It also shows up as part of your profile URL (if you choose to share it).</Text>
      </View>
      <View>
        <Text>Username</Text>
        <TextInput value={props.userName}/>
        <TouchableOpacity>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <View>
        <Text>Email address</Text>
        <Text>We send account updates, billing and newsletters to the primary email.
          You can login with any verified email address so you never lose access to your account.</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Primary email</Text>
          <Text> {props.email}</Text>
        </View>
        <TouchableOpacity>
          <Text>Add email</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <View>
        <Text>Password</Text>
      </View>
      <View>
        <Text>Current password</Text>
        <TextInput/>
        <TouchableOpacity>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
        <Text>New password</Text>
        <TextInput />
        <Text>Confirm password</Text>
        <TextInput />
        <TouchableOpacity>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <View>
        <Text>Multi-Factor Authentication: Disabled</Text>
      </View>
      <TouchableOpacity>
        <Text>Enable</Text>
      </TouchableOpacity>
    </View>

    <View>
      <View>
        <Text>Name</Text>
      </View>
      <View>
        <Text>First name</Text>
        <TextInput/>
        <Text>Last name</Text>
        <TextInput />
        <TouchableOpacity>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <View>
        <Text>Manage Account</Text>
      </View>
      <View>
        <TouchableOpacity><Text>I would like to Delete My Personal Data</Text></TouchableOpacity>
      </View>
    </View>
  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  textContent: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default Setting;
