import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListKeyItems from "../ListKeyItems/list-key-items";
import {skillsData} from "../../../../testdata/skills-data";
import {categoriesData} from "../../../../testdata/categories-data";

const WhileSearch = (props) => {
  const filter = props.keys.filter(v => v.key.toLowerCase().includes(props.searchKey.toLowerCase())).slice(0, 10);

  const renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return <View>
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item+index}
      data={filter}
      renderItem={({item}) => <ListKeyItems item={item.key} onPress={() => props.onPress(item.key)}/>}
      ItemSeparatorComponent= {renderSeparator}
    />
  </View>
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
  },
})
export default WhileSearch;
