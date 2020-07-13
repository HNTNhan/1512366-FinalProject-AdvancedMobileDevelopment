import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {searchCoursesHasAllParams} from "../../../../core/services/course-services";
import ListCourseItems from "../../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../../globles/styles";
import SectionTitleFilter from "../../../Common/section-title-filter";
import CenterActivityIndicator from "../../../Common/center-activity-indicator";

const ResultSearch = (props) => {
  const [data, setData] = useState({nextPage: 0, courses: [], isLoading: true})
  const [filter, setFilter] = useState({
    keyword: props.searchKey,
    opt: {
      sort: {
        attribute: "updatedAt",
        rule: "ASC"
      },
      category: [],
      time: [],
      price: []
    },
    limit: 20,
    offset: data.nextPage * 20
  });

  useEffect(() => {
    getData(0)
  }, [])

  const getData = (type) => {
    searchCoursesHasAllParams({...filter, offset: type * data.nextPage * 20})
      .then(res => {
        if(res.status === 200) {
          console.log('success')
          let temp = {...data}
          if(type === 0) {
            temp.nextPage = 1
            temp.isLoading = false
            temp.courses = res.data.payload.rows
            setData(temp)
          } else {
            temp.nextPage += 1
            temp.isLoading = false
            temp.courses = temp.courses.concat(res.data.payload.rows)
            setData(temp)
          }
        } else {}
      })
      .catch(err => {
        console.log('fail')
        setData({...data, isLoading: false})
        console.log(err.response.data.message)
      })
  }

  const handleLoadMore = () => {
    console.log('handleLoadMore')
    getData(1)
  }

  const onPressItem = (id) => {
    props.navigation.navigate('CourseDetail', {id: id})
  }

  const onPressOK = () => {
    console.log('onPressOK')
    getData(0)
  }

  const onSelectSortType = (sortType) => {
    let tempSort = {
      attribute: "updatedAt",
      rule: "ASC"
    };

    switch (sortType) {
      case 0:
        tempSort.attribute = 'updatedAt';
        tempSort.rule = 'ASC';
        break;
      case 1:
        tempSort.attribute = 'updatedAt';
        tempSort.rule = 'DESC';
        break;
      case 2:
        tempSort.attribute = 'price';
        tempSort.rule = 'ASC';
        break;
      case 3:
        tempSort.attribute = 'price';
        tempSort.rule = 'DESC';
        break;
      default:
        tempSort.attribute = 'soldNumber';
        tempSort.rule = 'DESC';
        break;
    }

    setFilter({...filter, opt: { ...filter.opt, sort: tempSort}})

  }

  const getFilter = (category, time, price) => {
    let tempCategory = [];
    let tempTime = [];
    let tempPrice = [];
    for (let i = 0; i < category.length; i++) {
      if (category[i].status === true) {
        tempCategory.push(category[i].id)
      } else {
      }
    }

    for (let i = 0; i < time.length; i++) {
      if (time[i].status === true) {
        tempTime.push(time[i].value)
      } else {
      }
    }

    for (let i = 0; i < price.length; i++) {
      if (price[i].status === true) {
        tempPrice.push(price[i].value)
      } else {
      }
    }

    setFilter({...filter, opt: { ...filter.opt, category: tempCategory, time: tempTime, price: tempPrice}})
  }

  if(!data.isLoading) {
    return <FlatList
        showsVerticalScrollIndicator={false}
        data={data.courses}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)}/>}
        ItemSeparatorComponent= {() => <View style={globalStyles.separator} />}
        ListHeaderComponent = {
          <SectionTitleFilter onSelectSortType={onSelectSortType} getFilter={getFilter} onPressOK={() => onPressOK()}/>
        }
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0}
      />
  } else {
    return <CenterActivityIndicator />
  }
};

export default ResultSearch;
