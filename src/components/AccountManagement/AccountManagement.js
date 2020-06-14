import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, Switch, ScrollView} from 'react-native';
import ButtonSetting from "./ButtonSetting/button-setting";
import ButtonSwitch from "./ButtonSwitch/button-switch";
import {ColorsContext} from "../../provider/colors-provider";
import {defaultColors} from "../../globles/constants";
import {Icon} from "react-native-elements";

const AccountManagement = (props) => {
  const {theme, setTheme} = useContext(ColorsContext);

  const onPressSignOut = () => {
    props.navigation.navigate('Authentication', {signOut: true})
  }

  const onPressProfile = () => {
    props.navigation.navigate('Profile',)
  }

  const onPressAccount = () => {
    props.navigation.navigate('Account')
  }

  return <ScrollView style={{...styles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <ButtonSetting title={'Profile'} onPress={() => onPressProfile()}/>
    <ButtonSetting title={'Account'} onPress={() => onPressAccount()}/>
    <ButtonSetting title={'Subscription'} />
    <ButtonSetting title={'Communication Preferences'} />

    <TouchableOpacity style={styles.itemContainer}
                      onPress={() => theme===defaultColors.themes.light ? setTheme(defaultColors.themes.dark) : setTheme(defaultColors.themes.light)}>
      <Text style={{...styles.text, color: theme.text}}>Theme</Text>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{fontSize: 18, color: theme.text}}>
          {theme===defaultColors.themes.light ? 'Light' : 'Dark'}
        </Text>
        <Icon style={styles.icon} name={'chevron-right'} type={"font-awesome-5"} size={16} color={theme.text} />
      </View>
    </TouchableOpacity>

    <ButtonSwitch title={'Require Wi-Fi for streaming'}/>
    <ButtonSwitch title={'Require Wi-Fi for downloading'}/>

    <ButtonSetting title={'Send feedback'} />
    <ButtonSetting title={'Contact support'} />

    <TouchableOpacity style={styles.itemContainer}>
      <Text style={{...styles.text, color: theme.text}}>App Version</Text>
      <Text style={{...styles.text, color: theme.text}}>2.77.2568</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => onPressSignOut()} style={styles.signOutButton}>
      <Text style={{...styles.text, ...styles.signOutButtonText}}>SignOut</Text>
    </TouchableOpacity>
  </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
    paddingVertical: 10,
  },
  icon: {
    paddingTop: 3,
    marginLeft: 5,
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
