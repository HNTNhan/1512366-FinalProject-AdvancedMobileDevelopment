import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ColorsContext} from "../../../../provider/colors-provider";

const Skills = (props) => {
  const {theme} = useContext(ColorsContext);

  const onPress = (item) => {
    return props.navigation.navigate('SkillDetail', {name: item.title, skill: item});
  }

  const renderListItems = () => {
    return props.skills.map( (item, index) =>
      <TouchableOpacity key={item.title+index} style={{...styles.button, backgroundColor: theme.foreground1}} onPress={() => onPress(item)}>
        {
          props.interests.find((skill) => skill===item.title) === item.title ?
            <Image source={require('../../../../../assets/ic_check.png')} style={styles.image}/>
            : null
        }
        <Text style={{textAlign: 'center', color: theme.text}}> {item.title}</Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderListItems(props.skills)}
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

export default Skills;
