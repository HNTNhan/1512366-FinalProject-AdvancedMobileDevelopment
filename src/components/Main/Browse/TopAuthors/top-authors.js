import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Image} from 'react-native';

const TopAuthors = (props) => {
  const topAuthors = [
    {
      id: 1,
      author: 'Matt Honeycutt',
    },
    {
      id: 2,
      author: 'Jon Flanders',
    },
    {
      id: 3,
      author: 'Steve Michelotti',
    },
    {
      id: 4,
      author: 'Scott Allen',
    },
    {
      id: 5,
      author: 'Jim Wilson',
    },
    {
      id: 6,
      author: 'Deborah Kurata',
    },
  ];


  const renderTopAuthors = (topAuthors) => {
    return topAuthors.map( item => <View key={item.id} style={{marginRight: 10}}>
      <Image source={require('../../../../../assets/ic_person.png')} style={styles.image}/>
      <Text style={styles.imageText} numberOfLines={1} ellipsizeMode='tail'>{item.author}</Text>
    </View>);
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderTopAuthors(topAuthors)}
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
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  imageText: {
    width: 80,
    textAlign: 'center',
  }
})

export default TopAuthors;
