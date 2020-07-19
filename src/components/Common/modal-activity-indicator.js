import React from 'react';
import {Modal, View, StyleSheet, ActivityIndicator} from 'react-native';

const ModalActivityIndicator = (props) => {
  return <Modal animationType="fade"
                transparent={true}
                visible={props.modalVisible}>
    <View style={{...styles.centeredView}}>
      <View style={{opacity: 100}}>
        {console.log('activity')}
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    </View>
  </Modal>
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'black',
    opacity: 0.5,
    justifyContent: 'center',
  },
})

export default ModalActivityIndicator;
