import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AuthorDetail from "../../../AuthorDetail/author-detail";
import {ColorsContext} from "../../../../provider/colors-provider";

const TopAuthors = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressAuthorItem = (key, name) => {
    props.navigation.navigate('AuthorDetail', {key: key, name: name})
  }

  const renderTopAuthors = (authors) => {
    return authors.map( item => <TouchableOpacity key={item.key} style={{marginRight: 10}} onPress={() => onPressAuthorItem(item.key, item.detail.name)}>
      <Image source={require('../../../../../assets/ic_person.png')} style={styles.image}/>
      <Text style={{...styles.imageText, color: theme.text}} numberOfLines={2} ellipsizeMode='tail'>{item.detail.name}</Text>
    </TouchableOpacity>);
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={{...styles.titleText, color: theme.text}}>{props.title}</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderTopAuthors(props.authors)}
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  imageText: {
    width: 80,
    textAlign: 'center',
  }
})

export default TopAuthors;
