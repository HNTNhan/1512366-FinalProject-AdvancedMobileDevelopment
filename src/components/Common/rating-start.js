import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";

const RatingStart = (props) => {

  const RatingIcon = (rating) => {
    if(rating.count>=1) return <Icon name={'star'} solid={true} type={"font-awesome-5"} color={'#FBDC14'} size={props.size || 14}/>
    else if(rating.count>0) return <Icon name={'star-half-alt'} solid={true} type={"font-awesome-5"} color={'#FBDC14'} size={props.size || 14}/>
    else return <Icon name={'star'} solid={false} type={"font-awesome-5"} color={'#FBDC14'} size={props.size || 14}/>
  }

  return <View style={styles.container}>
    <RatingIcon count={props.rating-0}/>
    <RatingIcon count={props.rating-1}/>
    <RatingIcon count={props.rating-2}/>
    <RatingIcon count={props.rating-3}/>
    <RatingIcon count={props.rating-4}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
export default RatingStart;
