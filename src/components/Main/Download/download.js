import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ListCourseItems from "../../Courses/ListCourseItems/list-course-items";
import {globalStyles} from "../../../globles/styles";
import {ColorsContext} from "../../../provider/colors-provider";
import {getCoursesDownload, storeCoursesDownload} from "../../../core/local_storage/courses-download-storage";
import CenterActivityIndicator from "../../Common/center-activity-indicator";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {DownloadContext} from "../../../provider/download-provider";
import * as FileSystem from "expo-file-system";

const Download = (props) => {
  const {theme} = useContext(ColorsContext)
  const {startDownload} = useContext(DownloadContext)
  const {state} = useContext(AuthenticationContext)
  const [coursesDownload, setCoursesDownload] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getCoursesDownload().then(res => {
      //console.log(res)
      if(res.status===200) {
        if(res.data && res.data.length) {
          for(let i=0; i<res.data.length; i++) {
            if(res.data[i].id===state.userInfo.id) {
              setCoursesDownload(res.data[i].courses)
              break;
            } else if(i===res.data.length-1) {
              setCoursesDownload([])
            }
          }
        } else {
          setCoursesDownload([])
        }
        setIsLoading(false)
      } else {
        setCoursesDownload([])
        //setIsLoading(false)
        alert(res.error)
      }
    })
  }

  const onPressRemoveAll = async () => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + '/itedu/'+ state.userInfo.id, {idempotent: true})
    await storeCoursesDownload([])
    fetchData()
  }

  const renderHeader = () => {
    return <View style={styles.header}>
      <Text style={{...styles.headerText, color: theme.text}}>Download</Text>
      <TouchableOpacity style={styles.button}
                        onPress={!startDownload ? () => fetchData() : null}>
        <Text style={styles.buttonText}> Refresh </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => onPressRemoveAll()}>
        <Text style={styles.buttonText}> Remove all </Text>
      </TouchableOpacity>
    </View>
  }

  const onPressItem = (id) => {
    props.navigation.push('CourseDetail', {id: id});
  }

  if(isLoading) {
    return <CenterActivityIndicator />
  } else {
    if(coursesDownload.length===0) {
      return <View style={{...styles.containerEmpty, backgroundColor: theme.background}}>
        <Text style={{fontSize: 20, color: theme.text}}>No Download</Text>
        <TouchableOpacity style={styles.button}
                          onPress={!startDownload ? () => fetchData() : null}>
          <Text style={{...styles.buttonText, fontSize: 20}}> Refresh </Text>
        </TouchableOpacity>
      </View>
    } else {
      return <View style={[globalStyles.container, {backgroundColor: theme.background}]}>
        <FlatList
          data={coursesDownload}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <ListCourseItems item={item} onPress={() => onPressItem(item.id)} type={'download'}/>}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          ListHeaderComponent = {renderHeader}
        />
      </View>
    }
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  containerEmpty: {
    flex: 1,
    padding: 5,
    justifyContent:'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    padding: 3,
    borderRadius: 10,
    marginRight: 20,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#19B5FE',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginLeft: 105,
  },
})
export default Download;
