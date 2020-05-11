import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const PopularSkills = (props) => {
  const skills = [
      {
        id: 1,
        name: 'Angular',
        check: false,
      },
      {
        id: 2,
        name: 'JavaScript',
        check: true,
      },
      {
        id: 3,
        name: 'C#',
        check: false,
      },
      {
        id: 4,
        name: 'Java',
        check: false,
      },
      {
        id: 5,
        name: 'Data Analysis',
        check: false,
      },
      {
        id: 6,
        name: 'Python',
        check: false,
      },
      {
        id: 7,
        name: 'React',
        check: true,
      },
  ]

  const renderListItems = (skills) => {
    return skills.map( (item) =>
      <TouchableOpacity key={item.id} style={styles.button}>
        <Text style={{textAlign: 'center'}}>  {item.name}  </Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderListItems(skills)}
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  title: {
    marginBottom: 5,
  },
  button: {
    minWidth: 50,
    backgroundColor: 'gainsboro',
    padding: 2,
    borderRadius: 10,
    marginRight: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default PopularSkills;
