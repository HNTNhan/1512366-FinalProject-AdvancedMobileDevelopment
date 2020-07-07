import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {getCoursesTopSell} from "../../../core/services/course-services";
const axios = require('axios');


const ListCoursesScrollLoad = (props) => {
  const {theme} = useContext(ColorsContext);
  const [data, setData] = useState({nextPage: 1, courses: []});

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const url = props.route.params.url;
    getCoursesTopSell(data.nextPage)
      .then(res => {
        let temp = {...data}
        temp.nextPage += 1
        temp.courses = temp.courses.concat(res.data.payload)
        setData(temp)
      })
    //axios.post(url, {limit: 20, page: data.nextPage})
  }

  const handleLoadMore = () => {
    getData()
  }

  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data.courses}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)}/>}
      onEndReached={() => handleLoadMore()}
      onEndReachedThreshold={0}
      ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
    />
  </View>
};

export default ListCoursesScrollLoad;
