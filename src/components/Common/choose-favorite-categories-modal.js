import React, {useContext, useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {ColorsContext} from "../../provider/colors-provider";
import {CheckBox, Icon} from "react-native-elements";

const ChooseFavoriteCategoriesModal = (props) => {
  const {theme} = useContext(ColorsContext);

  const [categories, setCategories] = useState([])

  useEffect(() => {
    let categories = props.categories
    categories.forEach((item) => {
      item.status = false
    })
    setCategories(categories)
  }, [])

  const getCategoriesSelected = () => {
    let categoriesSelected = []
    categories.forEach(category => {
      if(category.status) {
        categoriesSelected.push(category.id)
      }
      else {}
    })
    props.onPressClose(categoriesSelected)
  }

  return <Modal
    animationType="fade"
    transparent={true}
    visible={props.showModal}
    onRequestClose={() => props.onPressClose([])}>
    <TouchableWithoutFeedback onPress={() => props.onPressClose([])}>
      <View style={{...styles.centeredView}}>
        <TouchableWithoutFeedback onPress={null}>
          <View style={styles.modalView}>
            <View style={{...styles.modalTitleContainer}}>
              <Text style={{...styles.modalTitle}}>Select favorite categories</Text>
              <Text style={{fontSize: 16}}>(Please select at least one category)</Text>
            </View>
            <View style={styles.itemContainer}>
              {
                categories.length ? categories.map((item, index) => {
                  return <View key={item.id} style={styles.checkboxContainer}>
                    <CheckBox
                      checked={item.status} size={20}
                      containerStyle={{...styles.checkbox}}
                      textStyle={{fontSize: 16}}
                      title={item.name}
                      onPress={() => {
                        let temp = [...categories]
                        temp[index].status = !temp[index].status
                        setCategories(temp)
                      }}
                    />
                  </View>
                }) : null
              }
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={() => getCategoriesSelected()}>
              <Text style={{fontSize: 18}}>Select</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: "#eeeeee",
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  modalTitleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center'
  },
  itemContainer: {
    alignSelf: 'center'
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  checkbox: {
    backgroundColor: 'transparent',
    padding: 5,
    margin: 0
  },
  selectButton: {
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
})

export default ChooseFavoriteCategoriesModal;
