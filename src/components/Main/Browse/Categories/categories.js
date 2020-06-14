import React from 'react';
import {ScrollView, View, FlatList, StyleSheet} from 'react-native';
import ImageButton from "../../../Common/image-button";

const Categories = (props) => {
  const onPressImageButton = (category) => {
    props.navigation.navigate('CategoryDetail', {category: category, name: category.title})
  }

  return <View style={styles.container}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={props.categories}
        keyExtractor={(item) => item.title}
        renderItem={({item}) =>
          <ImageButton title={item.title.replace(' ', '\n').toUpperCase()} onPress={() => onPressImageButton(item)}/>
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
})

export default Categories;
