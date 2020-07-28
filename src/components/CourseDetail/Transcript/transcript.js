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

  if(props.isAuthenticated) {
    if(props.checkOwn) {
      return props.transcript==='' ? <View style={styles.messageContainer}>
          <Text style={{fontSize: 16, color: theme.text}}>This course don't have transcript</Text>
        </View> :
        <SectionList
          sections={props.transcript}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) =>
            <SubTranScript item={item}/>
          }
          renderSectionHeader={({section: {title}}) => <Text h3 style={{color: theme.text}}>{title}</Text>}
        />;
    } else {
      return <View style={styles.messageContainer}>
        <Text style={{fontSize: 16, color: theme.text}}>Please buy this course to see this context!</Text>
      </View>
    }
  } else {
    return <View style={styles.messageContainer}>
      <Text style={{fontSize: 16, color: theme.text}}>Please sign in to see this context!</Text>
    </View>
  }
};

const styles = StyleSheet.create({
  subtitle: {
    paddingVertical: 5,
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Transcript;
