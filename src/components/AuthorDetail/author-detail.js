import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import GeneralAuthorDetail from "./GeneralAuthorDetail/general-author-detail";
import {globalStyles} from "../../globles/styles";
import ItemsInAuthor from "./ItemsInAuthor/items-in-author";
import {findByKey} from "../../testdata/find-data";
import {authorsData} from "../../testdata/authors-data";
import {ColorsContext} from "../../provider/colors-provider";

const AuthorDetail = (props) => {
  const author = findByKey(authorsData, [props.route.params.key])[0]
  const {theme} = useContext(ColorsContext)

  return <ScrollView style={{...globalStyles.container, backgroundColor: theme.background}} showsVerticalScrollIndicator={false}>
    <GeneralAuthorDetail detail={author.detail}/>
    <ItemsInAuthor courses={author.courses} navigation={props.navigation} route={props.route}/>
  </ScrollView>
};

export default AuthorDetail;
