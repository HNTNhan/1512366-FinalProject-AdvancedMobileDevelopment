import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/components/Main/Home/home";
import ListCourses from "./src/components/Courses/ListCourses/list-courses";
import Download from "./src/components/Main/Download/download";
import Browse from "./src/components/Main/Browse/browse";
import Search from "./src/components/Main/Search/search";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Home />*/}
      {/*<ListCourses />*/}
      {/*<Download />*/}
      {/*<Browse />*/}
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: 10,
  },
});
