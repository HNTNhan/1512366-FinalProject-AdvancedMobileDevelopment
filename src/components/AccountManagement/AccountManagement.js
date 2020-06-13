import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, Switch, ScrollView} from 'react-native';
import ButtonSetting from "./ButtonSetting/button-setting";
import ButtonSwitch from "./ButtonSwitch/button-switch";
import {ColorsContext} from "../../provider/colors-provider";
import {defaultColors} from "../../globles/constants";

const AccountManagement = (props) => {
  const {theme, setTheme} = useContext(ColorsContext);
  return <ScrollView style={{...styles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <ButtonSetting title={'Profile'} onPress={() => props.navigation.navigate("Profile")}/>
    <ButtonSetting title={'Account'} onPress={() => props.navigation.navigate("Setting")}/>
    <ButtonSetting title={'Subscription'} />
    <ButtonSetting title={'Communication Preferences'} />

    <TouchableOpacity style={styles.itemContainer}
                      onPress={() => theme===defaultColors.themes.light ? setTheme(defaultColors.themes.dark) : setTheme(defaultColors.themes.light)}>
      <Text style={styles.text}>Theme</Text>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
          {theme===defaultColors.themes.light ? 'Light' : 'Dark'}
        </Text>
        <Image source={require('../../../assets/ic_next.png')} style={styles.image}/>
      </View>
    </TouchableOpacity>

    <ButtonSwitch title={'Require Wi-Fi for streaming'}/>
    <ButtonSwitch title={'Require Wi-Fi for downloading'}/>

    <ButtonSetting title={'Send feedback'} />
    <ButtonSetting title={'Contact support'} />

    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.text}>App Version</Text>
      <Text style={styles.text}>2.77.2568</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={console.log(1)} style={styles.signOutButton}>
      <Text style={[styles.text, styles.signOutButtonText]}>SignOut</Text>
    </TouchableOpacity>
  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
    paddingVertical: 10,
  },
  image: {
    width: 30,
    height: 30,
    opacity: 0.3,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  signOutButton: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'deepskyblue',
    marginTop: 30,
    paddingVertical: 5,
  },
  signOutButtonText: {
    color: 'deepskyblue',
  }
})
export default AccountManagement;
