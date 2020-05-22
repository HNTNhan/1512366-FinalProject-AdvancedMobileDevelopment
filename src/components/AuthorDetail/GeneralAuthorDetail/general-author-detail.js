import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import DescriptionOpenClose from "../../Common/description-open-close";
import Icon from 'react-native-vector-icons/FontAwesome';

const GeneralAuthorDetail = (props) => {
  return <View>
    <View style={styles.container}>
      <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
      <Text style={styles.name}>{props.detail.name}</Text>
      <Text style={styles.text}>{props.detail.work}</Text>
      <Button title='Follow' onPress={props.onPress} containerStyle={styles.button}/>
      <Text>Follow to bo notified when new courses are published</Text>
      <DescriptionOpenClose description={props.detail.info} noLines={3} textSize={16}/>
    </View>
    <Text style={styles.text} onPress={() => console.log('link')}>{props.detail.other}</Text>
    <View style={styles.linkContainer}>
      <Button icon={
                <Icon
                  name="link"
                  size={15}
                  color="white"
                  type='font-awesome-5'
                />}
              containerStyle={styles.linkButton}
      />
      <Button icon={
                <Icon
                  name="facebook"
                  size={15}
                  color="white"
                  type='font-awesome-5'
                />}
              containerStyle={styles.linkButton}
      />
      <Button icon={
                <Icon
                  name="twitter"
                  size={15}
                  color="white"
                  type='font-awesome-5'
                />}
              containerStyle={styles.linkButton}
      />
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
  linkContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  linkButton: {
    width: 30,
    height: 30,
    marginRight: 10,
  }
})
export default GeneralAuthorDetail;
