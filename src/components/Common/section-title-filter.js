import React, {useContext, useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, CheckBoxProps} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import SelectFilterModal from "./select-filter-modal";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon} from "react-native-elements";

const SectionTitleFilter = (props) => {
  const {theme} = useContext(ColorsContext);

  const [sortType, setSortType] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const type = ['Newest', 'Oldest', 'Price increase', 'Price decrease', 'Best Seller'];

  const onTypeChange = (itemValue) => {
    setSortType(itemValue);
    props.onSelectSortType(itemValue)
  }

  const onPressClose = (category, time, price) => {
    setModalVisible(false)
    props.getFilter(category, time, price, sortType)
  }

  return <View style={styles.titleContainer}>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={{...styles.selectFilterButton}}>
      <Text style={{...styles.titleText, color: theme.text}}>Select Filter   </Text>
      <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
    </TouchableOpacity>

    <Menu style={styles.dropdown}>
      <MenuTrigger>
        {
          type[sortType] === 'Price increase' ?
            <View style={styles.trigger}>
              <Text style={{...styles.titleText, color: theme.text}}>Price</Text>
              <Icon name={'long-arrow-alt-up'} type={"font-awesome-5"} size={16} color={'#777777'}/>
              <Text style={{...styles.titleText, color: theme.text}}>  </Text>
              <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
            </View> :
            type[sortType] === 'Price decrease' ?
              <View style={styles.trigger}>
                <Text style={{...styles.titleText, color: theme.text}}>Price</Text>
                <Icon name={'long-arrow-alt-down'} type={"font-awesome-5"} size={16} color={'#777777'}/>
                <Text style={{...styles.titleText, color: theme.text}}>  </Text>
                <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
              </View> :
              <View style={styles.trigger}>
                <Text style={{...styles.titleText, color: theme.text}}>{type[sortType]}  </Text>
                <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
              </View>
        }
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={() => onTypeChange(0)} text={'Newest'} />
        <MenuOption onSelect={() => onTypeChange(1)} text={'Oldest'} />
        <MenuOption onSelect={() => onTypeChange(2)} text={'Price (Low-High)'} />
        <MenuOption onSelect={() => onTypeChange(3)} text={'Price (High-Low)'} />
        <MenuOption onSelect={() => onTypeChange(4)} text={'Best Seller'} />
      </MenuOptions>
    </Menu>

    <TouchableOpacity onPress={props.onPressOK} style={{...styles.okButton}}>
      <Text style={{...styles.titleText, color: theme.text}}>OK</Text>
    </TouchableOpacity>

    <SelectFilterModal modalVisible={modalVisible} categorySelect={props.categorySelect} onPressClose={onPressClose}/>

  </View>
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#eeeeee',
    padding: 5,
    alignItems: 'center',
  },
  optionsWrapper: {
    alignItems: 'center'
  },
  optionWrapper: {
    margin: 5,
    textAlign: 'center'
  },
  optionText: {
    fontSize: 18
  },
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 18,
    textAlign: 'left',
    paddingVertical: 5,
  },
  selectFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  okButton: {
    marginRight: 5,
    paddingHorizontal: 20,
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trigger: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center'
  }
})
export default SectionTitleFilter;
