import React from 'react';
import {ScrollView, View, FlatList, StyleSheet} from 'react-native';
import ImageButton from "../../../Common/image-button";

const Categories = (props) => {
  const categories = [
    {
      id: 1,
      title: 'Conferences',
    },
    {
      id: 2,
      title: 'Data Professional',
    },
    {
      id: 3,
      title: 'Creative Professional',
    },
    {
      id: 4,
      title: 'Software Development',
    },
    {
      id: 5,
      title: 'Business Professional',
    },
    {
      id: 6,
      title: 'Certifications',
    },
  ]

  const onPressImageButton = () => {
    props.navigation.navigate('CategoryDetail')
  }

  return <View style={styles.container}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={categories}
        renderItem={({item}) =>
          <ImageButton title={item.title.replace(' ', '\n').toUpperCase()} onPress={() => onPressImageButton()}/>
        }
        numColumns={categories.length/2}
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
