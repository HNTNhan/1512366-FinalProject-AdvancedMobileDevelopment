import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon, Image, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";

const MainScreenRightHeader = (props) => {
  const {theme} = useContext(ColorsContext)
  const {state} = useContext(AuthenticationContext)

  const onSelectProfile = () => {
    console.log(123)
    props.navigation.navigate('AccountManagement', {screen: 'Profile'})
  }

  const onSelectSetting = () => {
    props.navigation.navigate('AccountManagement')
  }

  const onSelectSignOut = () => {
    props.navigation.navigate('Authentication', {signOut: true});
  }

  return <View style={styles.container}>

    <TouchableOpacity style={styles.avatarContainer} onPress={() => onSelectProfile()}>
      {
        state.userInfo.avatar ? <Image source={{uri : state.userInfo.avatar}} style={{...styles.image}} />
          : <Icon name={'user-circle'} type={"font-awesome-5"} size={40} color={theme.text} />
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

      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={() => onSelectSetting()} >
          <Text style={styles.menuOptionText}>Setting</Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log('Send feedback')} >
          <Text style={styles.menuOptionText}>Send feedback</Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log('Contact support')} >
          <Text style={styles.menuOptionText}>Contact support</Text>
        </MenuOption>
        <MenuOption onSelect={() => onSelectSignOut()} >
          <Text style={styles.menuOptionText}>Sign Out</Text>
        </MenuOption>
      </MenuOptions>
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
