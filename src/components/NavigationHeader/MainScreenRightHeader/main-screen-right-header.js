import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon, Image, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import SendFeedback from "../../AccountManagement/SendFeedback/send-feedback";
import * as Google from 'expo-google-app-auth';
import {androidClientID} from "../../../core/services/authentication-services";
import {LanguageContext} from "../../../provider/language-provider";

const MainScreenRightHeader = (props) => {
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)
  const authContext = useContext(AuthenticationContext)

  const onSelectProfile = () => {
    props.navigation.navigate('Profile')
  }

  const onSelectSetting = () => {
    props.navigation.navigate('AccountManagement')
  }

  const onSelectSendFeedBack = () => {
    props.navigation.navigate('SendFeedback')
  }

  const onSelectSignOut = async () => {
    // if(authContext.state.isGoogleSignIn !== '') {
    //   console.log('google sign out')
    //   const config = {
    //     androidClientId: androidClientID,
    //   };
    //   const accessToken = authContext.state.isGoogleSignIn
    //   await Google.logOutAsync({accessToken, ...config})
    // }
    await authContext.logout()
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Authentication' }],
    });
  }

  const onSelectSignIn = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Authentication' }],
    });
  }

  return <View style={styles.container}>
    <TouchableOpacity style={styles.avatarContainer} onPress={() => onSelectProfile()}>
      {
        authContext.state.userInfo ? authContext.state.userInfo.avatar ? <Image source={{uri : authContext.state.userInfo.avatar}} style={{...styles.image}} />
          : <Icon name={'user-circle'} type={"font-awesome-5"} size={40} color={theme.text} /> : <Icon name={'user-circle'} type={"font-awesome-5"} size={40} color={theme.text} />
      }
    </TouchableOpacity>

    <Menu style={styles.dropdown}>
      <MenuTrigger>
        <View style={styles.trigger}>
          <Icon name='ellipsis-v'
                size={20}
                type='font-awesome-5'
                color={theme.text}
          />
        </View>
      </MenuTrigger>

      {
        authContext.state.isAuthenticated ?
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => onSelectSetting()}>
              <Text style={styles.menuOptionText}>{language.mainScreenHeader.setting}</Text>
            </MenuOption>
            <MenuOption onSelect={() => onSelectSendFeedBack()}>
              <Text style={styles.menuOptionText}>{language.mainScreenHeader.sendFeedback}</Text>
            </MenuOption>
            <MenuOption onSelect={() => onSelectSignOut()}>
              <Text style={styles.menuOptionText}>{language.mainScreenHeader.signOut}</Text>
            </MenuOption>
          </MenuOptions> :

          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => onSelectSignIn()}>
              <Text style={styles.menuOptionText}>{language.mainScreenHeader.signIn}</Text>
            </MenuOption>
          </MenuOptions>
      }
    </Menu>
  </View>
};

const optionsStyles = {
  optionsContainer: {
    paddingHorizontal: 5,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    width: 180,
    marginTop: 20,
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  trigger: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  menuOptionText: {
    fontSize: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  avatarContainer: {
    marginHorizontal: 5,
  }
})
export default MainScreenRightHeader;
