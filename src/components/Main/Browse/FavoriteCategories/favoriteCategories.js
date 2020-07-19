import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ColorsContext} from "../../../../provider/colors-provider";

const FavoriteCategories = (props) => {
  const {theme} = useContext(ColorsContext);

  const onPress = (item) => {
    props.navigation.navigate('CategoryDetail', {category: item, name: item.name})
  }

  const renderListItems = () => {
    return props.allCategories.map( (item) =>
    {
      if(props.favoriteCategories.find((id) => id===item.id) === item.id) {
        return <TouchableOpacity key={item.id} style={{...styles.button, backgroundColor: theme.foreground1}} onPress={() => onPress(item)}>
          <Image source={require('../../../../../assets/ic_check.png')} style={styles.image}/>
          <Text style={{...styles.text, color: theme.text}}> {item.name}</Text>
        </TouchableOpacity>
      } else {
        return null
      }
    })
  }

  return <View style={styles.container}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {
        props.favoriteCategories.length ? renderListItems(props.skills) :
          null
      }
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  title: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'gainsboro',
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  }
})

export default FavoriteCategories;
