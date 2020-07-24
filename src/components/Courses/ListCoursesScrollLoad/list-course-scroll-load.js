import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {getCoursesNewRelease, getCoursesTopSell, searchCourses} from "../../../core/services/course-services";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {alertSignIn} from "../../../globles/alert";

const ListCoursesScrollLoad = (props) => {
  const {theme} = useContext(ColorsContext);
  const {state} = useContext(AuthenticationContext);

  const [data, setData] = useState({nextPage: 0, courses: [], isLoading: true})

  const type = props.route.params.type;

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if(type === 'New Releases') {
      getCoursesNewRelease(data.nextPage)
        .then(res => {
          let temp = {...data}
          temp.nextPage += 1
          temp.isLoading = false
          temp.courses = temp.courses.concat(res.data.payload)
          setData(temp)
        })
    } else if(type === "Recommended") {
      getCoursesTopSell(data.nextPage)
        .then(res => {
          let temp = {...data}
          temp.nextPage += 1
          temp.isLoading = false
          temp.courses = temp.courses.concat(res.data.payload)
          setData(temp)
        })
    } else {
      const paramSearch = props.route.params.paramSearch;
      searchCourses("", paramSearch.attribute, paramSearch.rule,paramSearch.category,undefined,undefined,20, data.nextPage*20)
        .then(res => {
          if(res.status === 200) {
            let temp = {...data}
            temp.nextPage += 1
            temp.isLoading = false
            temp.courses = temp.courses.concat(res.data.payload.rows)
            setData(temp)
          } else {}
        })
        .catch(err => {
          console.log(err.response.data.message||err)
        })
    }
  }

  const handleLoadMore = () => {
    getData()
  }

  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    {
      data.isLoading ? <ActivityIndicator size={'large'} color={'blue'}/> :
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.courses}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <ListCourseItems item={item} onPress={() =>  onPressItem(item.id) }/>}
          ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0}
        />
    }
  </View>
};

export default ListCoursesScrollLoad;
