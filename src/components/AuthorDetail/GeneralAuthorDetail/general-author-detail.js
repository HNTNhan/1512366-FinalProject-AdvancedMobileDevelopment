import React, {useContext} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import DescriptionOpenClose from "../../Common/description-open-close";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ColorsContext} from "../../../provider/colors-provider";

const GeneralAuthorDetail = (props) => {
  const {theme} = useContext(ColorsContext)

  return <View>
    <View style={styles.container}>
      <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
      <Text style={{...styles.name, color: theme.text}}>{props.detail.name}</Text>
      <Text style={{...styles.text, color: theme.text}}>{props.detail.work}</Text>
      <Button titleStyle={{fontSize: 20}} title='Follow' onPress={props.onPress} containerStyle={styles.button}/>
      <Text style={{color: theme.text}}>Follow to bo notified when new courses are published</Text>
      <DescriptionOpenClose description={props.detail.info} noLines={3} textSize={16} text={theme.text}/>
    </View>
    <Text style={{...styles.text, color: theme.text}} onPress={() => console.log('link')}>{props.detail.other}</Text>
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
                  name="twitter"
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
                  name="linkedin"
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
    paddingTop: 5,
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
