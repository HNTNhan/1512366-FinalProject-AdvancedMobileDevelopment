import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/components/Main/Home/home";
import ListCourses from "./src/components/Courses/ListCourses/list-courses";
import Download from "./src/components/Main/Download/download";
import Browse from "./src/components/Main/Browse/browse";
import Search from "./src/components/Main/Search/search";
import AccountManagement from "./src/components/AccountManagement/AccountManagement";
import Profile from "./src/components/AccountManagement/Profile/profile";
import Setting from "./src/components/AccountManagement/Setting/setting";
import Authentication from "./src/components/Authentication/Authentication";
import CourseDetail from "./src/components/CourseDetail/course-detail";
import LocationMap from "./src/components/Others/LocationMap/location-map";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Home />*/}
      {/*<ListCourses />*/}
      {/*<Download />*/}
      {/*<Browse />*/}
      {/*<Search />*/}
      {/*<AccountManagement />*/}
      {/*<Profile userName={"Thien Nhan"}/>*/}
      {/*<Setting userName={"Thien Nhan"} email={'123@gmail.com'}/>*/}
      {/*<Authentication />*/}
      {/*<CourseDetail />*/}
      <LocationMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
