import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import AuthorIconButton from "../../Common/author-icon-button";
import IconButton from "../../Common/icon-button";
import DescriptionOpenClose from "../../Common/description-open-close";
import {ColorsContext} from "../../../provider/colors-provider";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import AddToChannelDialog from "../../Common/add-to-channel-dialog";
import RatingStart from "../../Common/rating-start";
import {getFavoriteStatus, setFavoriteStatus} from "../../../core/services/user-services";
import {UserContext} from "../../../provider/user-provider";
import {convertDate, convertTime} from "../../Common/convert-data";

const GeneralCourseDetail = (props) => {
  const {theme} = useContext(ColorsContext);
  const {user, setUser, state} = useContext(AuthenticationContext);
  const userContext = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false)

  const courseDetail = props.detail;
  const instructorInfo = props.detail.instructor;
  const keyItem = props.route.params.id;
  const date = new Date(courseDetail.updatedAt);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    let mounted = true;
    getFavoriteStatus(state.token, props.route.params.id)
      .then((res) => {
        if(res.status === 200) {
          if(mounted){
            if(favorite !== res.data.likeStatus) {
              setFavorite(res.data.likeStatus)
            } else {}
          }
        } else {
          //return res.data.message
        }
      })
      .catch((err) => {
        alert(err.response.data.message || err)
      })

    return () => mounted = false
  }, [])

  useEffect(() => {
    if(userContext.state.favoriteCoursesChange === props.route.params.id) {
      setFavorite(!favorite);
    } else {

    }
  }, [userContext.state.favoriteCoursesChange])

  const authorListItems = (instructorInfo) => {
    return <AuthorIconButton key={instructorInfo.id} instructorInfo={instructorInfo} text={theme.text}
                             onPress={() => onPressAuthorItem(instructorInfo.id, instructorInfo.name, instructorInfo)}/>
  }

  const onPressAuthorItem = (key, name, author) => {
    props.navigation.push('AuthorDetail', {key: key, name: name, author: author})
  }


  const onPressFavortie = () => {
    let mounted = true;
    setFavoriteStatus(state.token, props.route.params.id)
      .then((res) => {
        if(res.status === 200) {
          if(mounted) {
            userContext.favoriteCoursesChange(props.route.params.id)
          }
        } else {
          //return res.data.message
        }
      })
      .catch((err) => {
        alert(err.response.data.message || err)
      })
    return () => mounted = false
  }

  const onPressDownload = () => {
    let temp = {...user};
    const pos = user.downloads.indexOf(keyItem);
    if(pos !== -1) {
      temp.downloads.splice(pos, 1);
    } else {
      temp.downloads.push(keyItem);
    }
    setUser(temp);
  }

  const onSelectAddToChannel = () => {
    setModalVisible(true)
  }

  const onPressClose = () => {
    setModalVisible(false)
  }

  return <ScrollView>
    <Text style={{...styles.title, color: theme.text}}>{courseDetail.title}</Text>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.author}>
        {authorListItems(instructorInfo)}
      </View>
    </ScrollView>

    <View style={styles.subInfo}>
      <Text style={{fontSize: 14, color: theme.text}}>
        {convertDate(courseDetail.updatedAt, 1) + ' . ' + convertTime(courseDetail.totalHours)}
      </Text>
      <RatingStart rating={(courseDetail.formalityPoint + courseDetail.contentPoint + courseDetail.presentationPoint)/3.0} size={12}/>
    </View>

    <View style={styles.activeContainer}>
      <IconButton name='bookmark-border' title={favorite ? 'UnFavorite' : 'Favorite'} onPress={() => onPressFavortie()}/>
      <IconButton name='cast-connected' title='Add to channel' onPress={() => onSelectAddToChannel()}/>
      <IconButton name='get-app' title={user.downloads.indexOf(keyItem)!==-1 ? 'Downloaded' : 'Download'} onPress={() => onPressDownload()}/>
    </View>

    <View style={{...styles.descriptionContainer}}>
      <Text style={{...styles.subTitle, color: theme.text}}>Description: </Text>
      <DescriptionOpenClose description={courseDetail.description} noLines={3} text={theme.text} foreground={theme.foreground1}/>
      <Text style={{...styles.subTitle, color: theme.text}}>{'Requirement: '}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.requirement}</Text>
      <Text style={{...styles.subTitle, color: theme.text}}>{'Learn what: '}</Text>
      <Text style={{...styles.text, color: theme.text}}>{courseDetail.learnWhat}</Text>
    </View>


    <Button
      title='Take a learning check'
      type='outline'
      icon={
        <Icon name='tasks' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    <Button
      title='View related paths & course'
      type='outline'
      icon={
        <Icon name='layer-group' type='font-awesome-5' color='#19B5FE' iconStyle={{marginHorizontal: 8}}/>
      }
      containerStyle={{marginVertical: 5}}
    />
    {/*<AddToChannelDialog modalVisible={modalVisible} keyItem={keyItem} closeModel={() => onPressClose()}/>*/}
  </ScrollView>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  author: {
    flexDirection: 'row'
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subInfo: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    marginBottom: 20
  },
  subTitle: {
    fontSize: 16
  },
  text: {
    fontSize: 16,
    paddingLeft: 15
  },
})
export default GeneralCourseDetail;
