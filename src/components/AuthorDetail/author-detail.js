import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import GeneralAuthorDetail from "./GeneralAuthorDetail/general-author-detail";
import {globalStyles} from "../../globles/styles";
import ItemsInAuthor from "./ItemsInAuthor/items-in-author";
import {ColorsContext} from "../../provider/colors-provider";
import {getInstructorInfo} from "../../core/services/instructor-services";

const AuthorDetail = (props) => {
  const {theme} = useContext(ColorsContext)
  const [author, setAuthor] = useState(props.route.params.author)

  useEffect(() => {
    if(!author) {
      let mounted = true
      getInstructorInfo(props.route.params.key)
        .then(res => {
          if (mounted) {
            if (res.status === 200) {
              console.log(res.data.payload)
              setAuthor(res.data.payload)
            } else {
              alert(res.data.message)
            }
          }
        })
        .catch(err => {
          alert(err.response.data.message || err)
        })
      return () => mounted = false
    } else {}
  }, [])

  if(author) {
    return <ScrollView style={{...globalStyles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
      <GeneralAuthorDetail detail={author}/>
      <ItemsInAuthor courses={author.courses} name={author.name} navigation={props.navigation} route={props.route}/>
    </ScrollView>
  } else {
    return <ActivityIndicator size={'large'} color={'blue'}/>
  }

};

export default AuthorDetail;
