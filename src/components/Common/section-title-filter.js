import React, {useContext, useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, CheckBoxProps} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import SelectFilterModal from "./select-filter-modal";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {Icon} from "react-native-elements";
import {LanguageContext} from "../../provider/language-provider";

const SectionTitleFilter = (props) => {
  const {theme} = useContext(ColorsContext);
  const {language} = useContext(LanguageContext);

  const [sortType, setSortType] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const type = [language.search.titleFilter.newest, language.search.titleFilter.oldest, language.search.titleFilter.priceIncrease1,
    language.search.titleFilter.priceDecrease1, language.search.titleFilter.bestSell];

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
      <Text style={{...styles.titleText, color: theme.text}}>{language.search.titleFilter.selectFilter}</Text>
      <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
    </TouchableOpacity>

    <Menu style={styles.dropdown}>
      <MenuTrigger>
        {
          type[sortType] === language.search.titleFilter.priceIncrease1 ?
            <View style={styles.trigger}>
              <Text style={{...styles.titleText, color: theme.text}}>{language.search.titleFilter.price}</Text>
              <Icon name={'long-arrow-alt-up'} type={"font-awesome-5"} size={16} color={'#777777'}/>
              <Text style={{...styles.titleText, color: theme.text}}>  </Text>
              <Icon name={'caret-down'} type={"font-awesome-5"} size={16} />
            </View> :
            type[sortType] === language.search.titleFilter.priceDecrease1 ?
              <View style={styles.trigger}>
                <Text style={{...styles.titleText, color: theme.text}}>{language.search.titleFilter.price}</Text>
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
        <MenuOption onSelect={() => onTypeChange(0)} text={language.search.titleFilter.newest} />
        <MenuOption onSelect={() => onTypeChange(1)} text={language.search.titleFilter.oldest} />
        <MenuOption onSelect={() => onTypeChange(2)} text={language.search.titleFilter.priceIncrease2} />
        <MenuOption onSelect={() => onTypeChange(3)} text={language.search.titleFilter.priceDecrease2} />
        <MenuOption onSelect={() => onTypeChange(4)} text={language.search.titleFilter.bestSell} />
      </MenuOptions>
    </Menu>

    <TouchableOpacity onPress={props.onPressOK} style={{...styles.okButton}}>
      <Text style={{...styles.titleText, color: theme.text}}>{language.same.buttonOK}</Text>
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
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'space-between',
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
