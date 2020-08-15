import React from 'react';
import Search from "../../Main/Search/search";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {createStackNavigator} from "@react-navigation/stack";
import {objectsConstant} from "../../../globles/constants";
import Payment from "../../Others/Payment/payment";
import SendFeedback from "../../AccountManagement/SendFeedback/send-feedback";

const SearchStack = createStackNavigator();

const SearchScreen = (props) => {
  return <SearchStack.Navigator screenOptions={objectsConstant.defaultCenterHeaderBar}>
    <SearchStack.Screen name='Search' component={Search} options={{headerShown: false}}/>
    <SearchStack.Screen name='CourseDetail' component={CourseDetail} options={{headerShown: false}}/>
    <SearchStack.Screen name='AuthorDetail' component={AuthorDetail} options={({ route }) => ({ title: route.params.name })}/>
    <SearchStack.Screen name='Payment' component={Payment} />
    <SearchStack.Screen name='SendFeedback' component={SendFeedback} options={{title: 'Feedback'}}/>
  </SearchStack.Navigator>
};

export default SearchScreen;
