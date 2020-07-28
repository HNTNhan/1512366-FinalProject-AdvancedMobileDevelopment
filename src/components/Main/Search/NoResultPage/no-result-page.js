import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ColorsContext} from "../../../../provider/colors-provider";
import {Icon} from "react-native-elements";

const NoResultPage = (props) => {
  const {theme} = useContext(ColorsContext);

  return <View style={styles.container}>
    <Icon name={'search'} size={80} color={'gainsboro'}/>
    <Text style={{...styles.text}}>Sorry, we couldn't find any matches for "{props.searchKey}"</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: 'transparent'
  },
  text: {
    color: 'gainsboro',
    fontSize: 16,
    textAlign: 'center',
  }
})
export default NoResultPage;
