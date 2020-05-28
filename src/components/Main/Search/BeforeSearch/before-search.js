import React from 'react';
import {SectionList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import ListKeyItems from "../ListKeyItems/list-key-items";
import {globalStyles} from "../../../../globles/styles";

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
          key: '123',
        },
        {
          id: 5,
          key: 'java',
        },
        {
          id: 6,
          key: 'c',
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
      <View style={globalStyles.separator} />
    );
  };

  return <View style={styles.container}>
    <SectionList
      sections={keys}
      renderItem={({item}) => <ListKeyItems item={item} onPress={() => props.onPress(item)}/>}
      renderSectionHeader={({section: {title}}) => <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
            {title!== 'Your interests' ? <TouchableOpacity style={styles.button}
                              onPress={props.onPress}>
            <Text style={styles.buttonText}> Clear </Text>
            </TouchableOpacity> : null}
        </View>
      }
      ItemSeparatorComponent={renderSeparator}
    />
  </View>
};

const styles = StyleSheet.create({
  container:{
    flex: 1
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
})

export default BeforeSearch;
