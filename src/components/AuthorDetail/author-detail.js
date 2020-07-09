import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import GeneralAuthorDetail from "./GeneralAuthorDetail/general-author-detail";
import {globalStyles} from "../../globles/styles";
import ItemsInAuthor from "./ItemsInAuthor/items-in-author";
import {findByKey} from "../../testdata/find-data";
import {authorsData} from "../../testdata/authors-data";
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

  return <ScrollView style={{...globalStyles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <GeneralAuthorDetail detail={author}/>
    <ItemsInAuthor courses={author.courses} name={author.name} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default AuthorDetail;
