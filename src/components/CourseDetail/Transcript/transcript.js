import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";

const Transcript = (props) => {
  const SubTranScript = (props) => {
    return <View>
      <Text h4 style={styles.subtitle}>{props.item.subTitle}</Text>
      <Text style={styles.content}>{props.item.content}</Text>
    </View>
  }
  return props.transcript==='' ? <Text style={styles.message}>This course don't have transcript</Text> :
    <SectionList
      sections={props.transcript}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) =>
        <SubTranScript item={item}/>
      }
      renderSectionHeader={({section: {title}}) => <Text h3 >{title}</Text>}
    />;
};

const styles = StyleSheet.create({
  subtitle: {
    paddingVertical: 5,
  },
  content: {
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
