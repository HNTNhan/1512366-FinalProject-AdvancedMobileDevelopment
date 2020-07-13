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
    return authors.map( item => <TouchableOpacity key={item.id} style={{marginRight: 10}} onPress={() => onPressAuthorItem(item.id, [item['user.name']])}>
      <Image source={{uri: item['user.avatar']}} style={styles.image}/>
      <Text style={{...styles.imageText, color: theme.text}} numberOfLines={2} ellipsizeMode='tail'>{item["user.name"]}</Text>
    </TouchableOpacity>);
  }

  return <View style={styles.container}>
    <View style={styles.titleContainer}>
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
  titleContainer: {
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
