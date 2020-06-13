import React, {useContext} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";

const Transcript = (props) => {
  const {theme} = useContext(ColorsContext)

  const SubTranScript = (props) => {
    return <View>
      <Text h4 style={{...styles.subtitle, color: theme.text}}>{props.item.subTitle}</Text>
      <Text style={{...styles.content, color: theme.text}}>{props.item.content}</Text>
    </View>
  }
  return props.transcript==='' ? <Text style={{...styles.message, color: theme.text}}>This course don't have transcript</Text> :
    <SectionList
      sections={props.transcript}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) =>
        <SubTranScript item={item}/>
      }
      renderSectionHeader={({section: {title}}) => <Text h3 style={{color: theme.text}}>{title}</Text>}
    />;
};

const styles = StyleSheet.create({
  subtitle: {
    paddingVertical: 5,
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
  },
  message: {
    marginTop: '40%',
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  }
})
export default Transcript;
