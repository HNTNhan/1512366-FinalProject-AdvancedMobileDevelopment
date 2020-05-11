import React from 'react';
import {SectionList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

const BeforeSearch = (props) => {
  const keys =[
    {
      title: 'Recent searches',
      data: [
        {
          id: 1,
          key: 'react',
        },
        {
          id: 2,
          key: 'customer',
        },
        {
          id: 3,
          key: 'python',
        },
        {
          id: 4,
          key: 'wqd',
        },
        {
          id: 5,
          key: 'wqsd',
        },
        {
          id: 6,
          key: 'cv',
        },
        {
          id: 7,
          key: 'rre',
        },
        {
          id: 8,
          key: 'hy',
        },
        {
          id: 9,
          key: 'zxca',
        },
        {
          id: 10,
          key: 'qwe',
        },
        {
          id: 11,
          key: 'xcvxc',
        },
        {
          id: 12,
          key: 'nyhtn',
        },
      ]
    },
    {
      title: 'Your interests',
      data: [
        {
          id: 1,
          key: 'React',
        },
        {
          id: 2,
          key: 'JavaScript',
        },
        {
          id: 3,
          key: 'Python',
        },
      ]
    },
  ]

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  const ListKeyItems = (props) => {
    return (
      <TouchableOpacity style={styles.keyContainer}>
        <Image source={require('../../../../../assets/ic_search.png')} style={styles.image}/>
        <Text style={styles.keyText}>{props.item.key}</Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>
    <SectionList
      sections={keys}
      renderItem={({item}) => <ListKeyItems item={item}/>}
      renderSectionHeader={({section: {title}}) => <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
          {title!== 'Your interests' ? <TouchableOpacity style={styles.button}
                            onPress={props.onPress}>
          <Text style={styles.buttonText}> Clear </Text>
          </TouchableOpacity> : null}
      </View>}
      ItemSeparatorComponent={renderSeparator}
    />
  </View>
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginRight: 20,
  },
  buttonText: {
    color: 'blue',
  },
  image: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
  keyContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 18,
  }
})

export default BeforeSearch;
