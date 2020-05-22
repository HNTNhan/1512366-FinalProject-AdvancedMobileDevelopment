import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Skills from "../../Main/Browse/Skills/skills";

const Profile = (props) => {
  return <View style={styles.container}>
    <View style={styles.containerAccount}>
      <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
      <Text>{props.userName}</Text>
    </View>
    <Skills title={'Interests'}/>
    <View>
      <Text style={styles.title}>Activity insights (last 30 days)</Text>
      <View>
        <Text style={styles.subTitle}>TOTAL ACTIVE DAYS</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textContent}>10</Text>
          <Text style={{marginLeft: 10,}}>9 day streak</Text>
        </View>
        <Text style={styles.subTitle}>MOST ACTIVE TIME OF DAY</Text>
        <View><Text style={styles.textContent}>12:00 PM</Text></View>

        <Text style={styles.subTitle}>MOST VIEWED SUBJECT</Text>
        <View><Text style={styles.textContent}>Software Development</Text></View>
      </View>
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  textContent: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})
export default Profile;
