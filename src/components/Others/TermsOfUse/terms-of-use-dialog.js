import React, {useContext, useState} from 'react';
import {Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import {termsOfUseData} from "./terms-of-use-data"
import {ColorsContext} from "../../../provider/colors-provider";

const TermsOfUseDialog = (props) => {
  const {theme} = useContext(ColorsContext)
  const data = termsOfUseData;

  const text = (textData) => {
    return textData.map((text, index) => {
      return <Text key={text+index}>
        <Text>{text.title.length>0 ? text.title + '\n' : null}</Text>
        <Text>{text.text + '\n\n'}</Text>
      </Text>
    })
  }

  const term = () => {
    return data.terms.map((term, index) => {
      return <Text style={{...styles.text}} key={term+index}>
        <Text style={{...styles.modalSubTitle}}>{'\n' + term.subTitle + '\n\n'}</Text>
        {text(term.data)}
      </Text>
    })
  }

  return<Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={props.closeModel}>
    <View style={styles.modalView}>
      <ScrollView>
        <Text style={{color: theme.text}}>
          <Text style={styles.modalMainTitle}>{data.mainTitle}</Text>
          <Text>{'\n' + data.effectDate}</Text>
          <Text style={styles.textStyle}>{'\n\n' + data.description + '\n'}</Text>
          {term()}
        </Text>

        <Button
          buttonStyle={[styles.button, {backgroundColor: '#9E9E9E'}]}
          titleStyle={styles.buttonText}
          onPress={props.closeModel}
          title='OK'/>
      </ScrollView>
    </View>
  </Modal>
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
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
    marginTop: 10,
  },
  modalMainTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
  modalSubTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default TermsOfUseDialog;
