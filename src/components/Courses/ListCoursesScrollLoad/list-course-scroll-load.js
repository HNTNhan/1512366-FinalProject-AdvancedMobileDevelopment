import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import ListCourseItems from "../ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {
  getCoursesNewRelease,
  getCoursesTopRate,
  getCoursesTopSell,
  searchCourses
} from "../../../core/services/course-services";
import CenterActivityIndicator from "../../Common/center-activity-indicator";

const ListCoursesScrollLoad = (props) => {
  const {theme} = useContext(ColorsContext);
  const [data, setData] = useState({nextPage: 0, courses: [], isLoading: true})
  const [footerLoading, setFooterLoading] = useState(false)
  const [reachEndData, setReachEndData] = useState(false)

  const type = props.route.params.type;

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if(type === 'New Releases') {
      getCoursesNewRelease(data.nextPage, 10)
        .then(res => {
          if(res.data.payload.length>0) {
            let temp = {...data}
            temp.nextPage += 1
            temp.courses = temp.courses.concat(res.data.payload)
            temp.isLoading = false
            setData(temp)
          } else {
            setData({...data, isLoading: false})
            setReachEndData(true)
          }
          setFooterLoading(false)
        }).catch(err => {
        alert(err.response.data.message||err)
        setData({...data, isLoading: false})
        setFooterLoading(false)
      })
    } else if(type === "Recommended") {
      getCoursesTopSell(data.nextPage, 10)
        .then(res => {
          if(res.data.payload.length>0) {
            let temp = {...data}
            temp.nextPage += 1
            temp.isLoading = false
            temp.courses = temp.courses.concat(res.data.payload)
            setData(temp)
          } else {
            setData({...data, isLoading: false})
            setReachEndData(true)
          }
          setFooterLoading(false)
        }).catch(err => {
        alert(err.response.data.message||err)
        setData({...data, isLoading: false})
        setFooterLoading(false)
      })
    } else if(type === "Top Rate") {
      getCoursesTopRate(data.nextPage, 10)
        .then(res => {
          if(res.data.payload.length>0) {
            let temp = {...data}
            temp.nextPage += 1
            temp.isLoading = false
            temp.courses = temp.courses.concat(res.data.payload)
            setData(temp)
          } else {
            setData({...data, isLoading: false})
            setReachEndData(true)
          }
          setFooterLoading(false)
        }).catch(err => {
        alert(err.response.data.message||err)
        setData({...data, isLoading: false})
        setFooterLoading(false)
      })
    } else {
      const paramSearch = props.route.params.paramSearch;
      searchCourses("", paramSearch.attribute, paramSearch.rule,paramSearch.category,undefined,undefined,20, data.nextPage*20)
        .then(res => {
          if(res.status === 200) {
            if(res.data.payload.length>0) {
              let temp = {...data}
              temp.nextPage += 1
              temp.isLoading = false
              temp.courses = temp.courses.concat(res.data.payload.rows)
              setData(temp)
            } else {
              setData({...data, isLoading: false})
              setReachEndData(true)
            }
            setFooterLoading(false)
          } else {}
        })
        .catch(err => {
          alert(err.response.data.message||err)
          setData({...data, isLoading: false})
          setFooterLoading(false)
        })
    }
  }

  const handleLoadMore = () => {
    setFooterLoading(true)
    getData()
  }

  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  return <View style={{...globalStyles.container, backgroundColor: theme.background}}>
    {
      data.isLoading ? <CenterActivityIndicator /> :
        <FlatList
          showsVerticalScrollIndicator={true}
          data={data.courses}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id) }/>}
          ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
          onEndReached={() => !reachEndData ? handleLoadMore() : null}
          onEndReachedThreshold={0.00001}
          ListFooterComponent={() => {
            if(!footerLoading) return null
            return <ActivityIndicator size={"large"} color={'blue'}/>
          }}
        />
    }
  </View>
};

export default ListCoursesScrollLoad;
