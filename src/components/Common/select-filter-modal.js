import React, {useContext, useEffect, useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import {getAllCategory} from "../../core/services/category-service";
import {ColorsContext} from "../../provider/colors-provider";

const SelectFilterModal = (props) => {
  const {theme} = useContext(ColorsContext);
  const [categories, setCategories] = useState(null)
  const [showFilter, setShowFilter] = useState({category: false, time: false, price: false})
  const [time, setTime] = useState([
      {label: '0h-3h', status: false, value: {min:0, max:3}},
      {label: '3h-6h', status: false, value: {min:3, max:6}},
      {label: '6h-10h', status: false, value: {min:6, max:10}},
      {label: '10h-20h', status: false, value: {min:10, max:20}},
      {label: '>20h', status: false, value: {min:20}}
    ]);
  const [price, setPrice] = useState([
      {label: 'Free', status: false, value: {max: 0}},
      {label: '0đ-200.000đ', status: false, value: {min: 1, max: 200000}},
      {label: '200.000đ-500.000đ', status: false, value: {min: 200001, max: 500000}},
      {label: '500.000đ-1.000.000đ', status: false, value: {min: 500001, max: 1000000}},
      {label: '1.000.000đ-2.000.000đ', status: false, value: {min: 1000001, max: 2000000}},
      {label: '>2.000.000đ', status: false, value: {min: 2000001}}
    ]);

  useEffect(() => {
    getAllCategory().then(res => {
      if(res.status === 200) {
        let categories = res.data.payload
        categories.forEach((item) => {
          item.status = false;
        })
        setCategories(categories)
      } else {}
    }).catch(err => {
      console.log(err.response.data.message || err)
    })
  }, [])

  return <Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={props.onPressClose}>
    <View style={{...styles.centeredView}}>
      <View style={styles.modalView}>
        <View style={{...styles.modalTitleContainer}}>
          <Text style={{...styles.modalTitle, color: theme.text}}>Select Filter</Text>
          <TouchableOpacity style={{position: 'absolute', right: 5, top: 0}} onPress={() => {
            props.onPressClose(categories, time, price)
          }}>
            <Text style={{fontSize: 20, paddingHorizontal: 10}}>OK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={{...styles.modalTitleButton}} onPress={() => setShowFilter({...showFilter, category: !showFilter.category})}>
            <Text style={styles.modalSubTitle}>Category</Text>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            {categories && showFilter.category ? categories.map((item, index) => {
              return <View key={item.id} style={styles.checkboxContainer}>
                <CheckBox
                  disabled={false}
                  value={item.status}
                  onValueChange={() => {
                    let temp = [...categories]
                    temp[index].status = !temp[index].status
                    setCategories(temp)
                  }}
                />
                <Text style={styles.label}>{item.name}</Text>
              </View>
            }) : null}
          </View>

          <TouchableOpacity style={{...styles.modalTitleButton}} onPress={() => setShowFilter({...showFilter, time: !showFilter.time})}>
            <Text style={styles.modalSubTitle}>Time</Text>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            {
              showFilter.time ? time.map((item, index) => {
                return <View key={item+index} style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    value={item.status}
                    onValueChange={() => {
                      let temp = [...time]
                      temp[index].status = !temp[index].status
                      setTime(temp)
                    }}
                  />
                  <Text style={styles.label}>{item.label}</Text>
                </View>
              }) : null
            }
          </View>


          <TouchableOpacity style={{...styles.modalTitleButton}} onPress={() => setShowFilter({...showFilter, price: !showFilter.price})}>
            <Text style={styles.modalSubTitle}>Price</Text>
          </TouchableOpacity>
           <View style={styles.itemContainer}>
             {
               showFilter.price ? price.map((item, index) => {
                 return <View key={item+index} style={styles.checkboxContainer}>
                   <CheckBox
                     disabled={false}
                     value={item.status}
                     onValueChange={() => {
                       let temp = [...price]
                       temp[index].status = !temp[index].status
                       setPrice(temp)
                     }}
                   />
                   <Text style={styles.label}>{item.label}</Text>
                 </View>
               }) : null
             }
          </View>

        </ScrollView>
      </View>
    </View>
  </Modal>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 0.8,
    marginTop: '15%',
    marginBottom: '-15%',
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: "#eeeeee",
    padding: 10,
    width: '70%',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center'
  },
  modalTitleButton: {
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalSubTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 2,
  },
  itemContainer: {
    marginLeft: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
  }
})
export default SelectFilterModal;
