import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from "react-native-elements";

const InfoDialog = (props) => {
  return <Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={props.closeModel}>
    <TouchableWithoutFeedback onPress={props.closeModel}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={null}>
          <View style={styles.modalView}>
            <Text style={styles.text}>This course isn't included with your current subscription.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={props.closeModel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => alert('Unlock')}
              >
                <Text style={styles.buttonText}>Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: "#eeeeee",
    padding: 10,
    width: '95%',
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#03A9F4',
  },
});
export default InfoDialog;
