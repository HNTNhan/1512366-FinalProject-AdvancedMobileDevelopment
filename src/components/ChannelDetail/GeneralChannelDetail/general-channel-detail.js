import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ColorsContext} from "../../../provider/colors-provider";

const GeneralChannelDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  return <View style={{flex: 1}}>
    <Text style={{...styles.title, color: theme.text}}>{props.detail.title}</Text>
    {/*<Text style={{...styles.text, color: theme.text}}>{props.detail.user} . {props.detail.type} . {props.detail.member} member</Text>*/}
  </View>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  text: {
    fontSize: 16,
  }
})
export default GeneralChannelDetail;
