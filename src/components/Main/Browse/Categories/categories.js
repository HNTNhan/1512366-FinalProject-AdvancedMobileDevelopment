import React, {useContext} from 'react';
import {ScrollView, View, FlatList, StyleSheet, Text} from 'react-native';
import ImageButton from "../../../Common/image-button";
import {ColorsContext} from "../../../../provider/colors-provider";

const Categories = (props) => {
  const {theme} = useContext(ColorsContext)

  const onPressImageButton = (category) => {
    props.navigation.navigate('CategoryDetail', {category: category, name: category.name})
  }

  return <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={{...styles.titleText, color: theme.text}}>Category</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={props.categories}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>
          <View style={{...styles.imageButtonContainer}}>
            <ImageButton title={item.name.toUpperCase()} onPress={() => onPressImageButton(item)}/>
          </View>
        }
        numColumns={props.categories.length/2}
      />
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginRight: 5
  },
  imageButtonContainer: {
    width: 150,
    marginRight: 10,
  },
  titleContainer: {
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Categories;
