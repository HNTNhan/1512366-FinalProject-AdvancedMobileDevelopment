import React, {useContext, useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {searchCoursesHasAllParamsV2} from "../../../../core/services/course-services";
import SectionTitleFilter from "../../../Common/section-title-filter";
import CenterActivityIndicator from "../../../Common/center-activity-indicator";
import NoResultPage from "../NoResultPage/no-result-page";
import {AuthenticationContext} from "../../../../provider/authentication-provider";
import { TabView} from 'react-native-tab-view';
import TabBarStyle from "../../../Common/tab-bar-style";
import {ColorsContext} from "../../../../provider/colors-provider";
import AllResult from "./AllResult/all-result";
import CourseResult from "./CourseResult/course-result";
import AuthorResult from "./AuthorResult/author-result";
import {LanguageContext} from "../../../../provider/language-provider";


const initialLayout = { width: Dimensions.get('window').width };

const ResultSearch = (props) => {
  const {state} = useContext(AuthenticationContext)
  const {theme} = useContext(ColorsContext)
  const {language} = useContext(LanguageContext)

  const [data, setData] = useState({nextPage: 0, courses: [], authors: [], coursesTotal: -1, authorsTotal: -1})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [reachEnd, setReachEnd] = useState(false)
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: language.search.all },
    { key: 'second', title: language.search.courses },
    { key: 'third', title: language.search.authors },
  ]);
  const [filter, setFilter] = useState({
    token: state.token,
    keyword: props.searchKey,
    opt: {
      sort: {
        attribute: "updatedAt",
        rule: "ASC"
      },
      category: props.categorySelect,
      time: [],
      price: []
    },
    limit: 10,
    offset: data.nextPage * 10
  });

  useEffect(() => {
    getData(0)
  }, [])

  const getData = (type) => {
    let mounted = true
    searchCoursesHasAllParamsV2({...filter, offset: type * data.nextPage * 10})
      .then(res => {
        if(mounted) {
          if (res.status === 200) {
            let temp = {...data}
            if (type === 0) {
              temp.nextPage = 1
              temp.courses = res.data.payload.courses.data
              temp.authors = res.data.payload.instructors.data
              temp.coursesTotal = res.data.payload.courses.total
              temp.authorsTotal = res.data.payload.instructors.total
              setData(temp)
              setIsLoading(false)
            } else {
              if(res.data.payload.courses.data.length<10 && res.data.payload.instructors.data.length<10) {
                temp.nextPage += 1
                temp.courses = temp.courses.concat(res.data.payload.courses.data)
                temp.authors = temp.authors.concat(res.data.payload.instructors.data)
                setData(temp)
                setReachEnd(true)
              } else {
                temp.nextPage += 1
                temp.courses = temp.courses.concat(res.data.payload.courses.data)
                temp.authors = temp.authors.concat(res.data.payload.instructors.data)
                setData(temp)
              }
              setIsLoadMore(false)
            }
          } else {}
        }
      })
      .catch(err => {
        setIsLoading(false)
        setIsLoadMore(false)
        alert(err.response.data.message)
      })
    return () => mounted=false
  }

  const handleLoadMore = () => {
    setIsLoadMore(true)
    getData(1)
  }

  const onPressOK = () => {
    setIsLoading(true)
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

    props.getCategoriesSelected(tempCategory)
    setFilter({...filter, opt: { ...filter.opt, category: tempCategory, time: tempTime, price: tempPrice}})
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <AllResult courses={data.courses.slice(0, 5)} authors={data.authors.slice(0, 5)} coursesTotal={data.coursesTotal} authorsTotal={data.authorsTotal}
                          navigation={props.navigation} route={props.route} language={language}/>;
      case 'second':
        return <CourseResult courses={data.courses} handleLoadMore={handleLoadMore} reachEnd={reachEnd} isLoadMore={isLoadMore}
                             navigation={props.navigation} route={props.route} language={language}/>;
      case 'third':
        return <AuthorResult authors={data.authors} handleLoadMore={handleLoadMore} reachEnd={reachEnd} isLoadMore={isLoadMore}
                             navigation={props.navigation} route={props.route} language={language}/>;
      default:
        return null;
    }
  };

  if(!isLoading) {
    if(data.courses.length || data.authors.length) {
      return <View style={{flex: 1}}>
        <SectionTitleFilter onSelectSortType={onSelectSortType} categorySelect={props.categorySelect} getFilter={getFilter} onPressOK={() => onPressOK()}/>

        <TabView
          renderTabBar={TabBarStyle}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          sceneContainerStyle={{paddingHorizontal: 5, backgroundColor: theme.background}}
        />
      </View>
    } else {
      return <View style={{flex: 1}}>
        <View style={{position: 'absolute', zIndex: 1, width: '100%', justifyContent: 'space-around'}}>
          <SectionTitleFilter onSelectSortType={onSelectSortType} categorySelect={props.categorySelect} getFilter={getFilter} onPressOK={() => onPressOK()}/>
        </View>
        <NoResultPage searchKey={props.searchKey} language={language}/>
      </View>
    }
  } else {
    return <CenterActivityIndicator />
  }
};

export default ResultSearch;
