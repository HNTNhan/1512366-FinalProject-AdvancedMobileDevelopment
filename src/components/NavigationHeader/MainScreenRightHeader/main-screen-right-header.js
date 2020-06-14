import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";

const MainScreenRightHeader = (props) => {
  const {theme} = useContext(ColorsContext)

  const onSelectProfile = () => {
    props.navigation.navigate('AccountManagement', {screen: 'Profile'})
  }

  const onSelectSetting = () => {
    props.navigation.navigate('AccountManagement')
  }

  const onSelectSignOut = () => {
    props.navigation.navigate('Authentication', {signOut: true});
  }

  return <View style={styles.container}>
    <Menu style={styles.dropdown}>
      <MenuTrigger triggerWrapper={styles.trigger}>
        <View style={styles.trigger} />
      </MenuTrigger>

      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={() => onSelectProfile()} >
          <Text style={styles.menuOptionText}>Profile</Text>
        </MenuOption>
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
    <Icon name='ellipsis-v'
          size={20}
          type='font-awesome-5'
          color={theme.text}
    />

  </View>
};

const optionsStyles = {
  optionsContainer: {
    paddingHorizontal: 5,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    width: 180,
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: 30,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  trigger: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  menuOptionText: {
    fontSize: 18,
  },
})
export default MainScreenRightHeader;
