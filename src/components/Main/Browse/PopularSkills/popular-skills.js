import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const PopularSkills = (props) => {
  const skills = [
      {
        id: 1,
        name: 'Angular',
        checked: false,
      },
      {
        id: 2,
        name: 'JavaScript',
        checked: true,
      },
      {
        id: 3,
        name: 'C#',
        checked: false,
      },
      {
        id: 4,
        name: 'Java',
        checked: false,
      },
      {
        id: 5,
        name: 'Data Analysis',
        checked: false,
      },
      {
        id: 6,
        name: 'Python',
        checked: false,
      },
      {
        id: 7,
        name: 'React',
        checked: true,
      },
  ]

  const renderListItems = (skills) => {
    return skills.map( (item) =>
      <TouchableOpacity key={item.id} style={styles.button}>
        {
          item.checked===true ? <Image source={require('../../../../../assets/ic_check.png')} style={styles.image}/>
             : null
        }
        <Text style={{textAlign: 'center'}}> {item.name}</Text>
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
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 50,
  }
})

export default PopularSkills;
