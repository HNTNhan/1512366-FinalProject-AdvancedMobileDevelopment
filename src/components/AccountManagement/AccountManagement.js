import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import ButtonSetting from "./ButtonSetting/button-setting";import {ColorsContext} from "../../provider/colors-provider";
import {defaultColors} from "../../globles/constants";
import {Icon} from "react-native-elements";
import {AuthenticationContext} from "../../provider/authentication-provider";
import {LanguageContext} from "../../provider/language-provider";
import {defaultLanguage} from "../../globles/languages";

const AccountManagement = (props) => {
  const {theme, setTheme} = useContext(ColorsContext);
  const authContext = useContext(AuthenticationContext);
  const {language, setLanguage} = useContext(LanguageContext)

  const onPressSignOut = () => {
    authContext.logout()
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Authentication'}],
    })
  }

  const onPressProfile = () => {
    props.navigation.navigate('Main', {screen: 'Home', params: {screen: 'Profile'}})
  }

  const onPressAccount = () => {
    props.navigation.navigate('Account')
  }

  const onPressSendFeedback = () => {
    props.navigation.navigate('SendFeedback')
  }

  return <ScrollView style={{...styles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <ButtonSetting title={language.accountManagement.profile} onPress={() => onPressProfile()}/>
    <ButtonSetting title={language.accountManagement.account} onPress={() => onPressAccount()}/>
    {/*<ButtonSetting title={'Subscription'} />*/}

    <TouchableOpacity style={styles.itemContainer}
                      onPress={() => theme===defaultColors.themes.light ? setTheme(defaultColors.themes.dark) : setTheme(defaultColors.themes.light)}>
      <Text style={{...styles.text, color: theme.text}}>{language.accountManagement.theme}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{fontSize: 18, color: theme.text}}>
          {theme===defaultColors.themes.light ? language.accountManagement.light : language.accountManagement.dark}
        </Text>
        <Icon style={styles.icon} name={'chevron-right'} type={"font-awesome-5"} size={16} color={theme.text} />
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.itemContainer}
                      onPress={() => language===defaultLanguage.English ? setLanguage(defaultLanguage.Vietnamese) : setLanguage(defaultLanguage.English)}>
      <Text style={{...styles.text, color: theme.text}}>{language.accountManagement.language}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{fontSize: 18, color: theme.text}}>
          {language.same.language}
        </Text>
        <Icon style={styles.icon} name={'chevron-right'} type={"font-awesome-5"} size={16} color={theme.text} />
      </View>
    </TouchableOpacity>

    {/*<ButtonSwitch title={'Require Wi-Fi for streaming'}/>*/}
    {/*<ButtonSwitch title={'Require Wi-Fi for downloading'}/>*/}

    <ButtonSetting title={language.accountManagement.sendFeedback} onPress={() => onPressSendFeedback()} />
    {/*<ButtonSetting title={'Contact support'} />*/}

    <TouchableOpacity disabled={true} style={styles.itemContainer}>
      <Text style={{...styles.text, color: theme.text}}>{language.accountManagement.appVersion}</Text>
      <Text style={{...styles.text, color: theme.text}}>1.00.0000</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => onPressSignOut()} style={styles.signOutButton}>
      <Text style={{...styles.text, ...styles.signOutButtonText}}>{language.accountManagement.signOut}</Text>
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
