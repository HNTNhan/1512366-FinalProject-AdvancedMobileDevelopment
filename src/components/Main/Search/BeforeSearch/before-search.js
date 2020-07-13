import React, {useContext} from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ListKeyItems from "../ListKeyItems/list-key-items";
import {globalStyles} from "../../../../globles/styles";
import {ColorsContext} from "../../../../provider/colors-provider";

const BeforeSearch = (props) => {
  const {theme} = useContext(ColorsContext);

  const keys =[
    {
      title: 'Recent searches',
      data: props.recentSearch,
    },
    {
      title: 'Your Favorite Categories',
      data: props.favoriteCategories,
    },
  ]

  const renderSeparator = () => {
    return (
      <View style={globalStyles.separator} />
    );
  };

  return <View style={{paddingBottom: 50}}>
    <SectionList
      showsVerticalScrollIndicator={false}
      sections={keys}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListKeyItems item={item} onPress={() => props.onPress(item)}/>}
      renderSectionHeader={({section: {title}}) => <View style={styles.title}>
          <Text style={{...styles.titleText, color: theme.text}}>{title}</Text>
            {title!== 'Your Favorite Categories' ? <TouchableOpacity style={styles.button}
                              onPress={props.onPressClear}>
            <Text style={styles.buttonText}> Clear </Text>
            </TouchableOpacity> : null}
        </View>
      }
      ItemSeparatorComponent={renderSeparator}
    />
  </View>
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
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
    fontSize: 18,
  },
})

export default BeforeSearch;
