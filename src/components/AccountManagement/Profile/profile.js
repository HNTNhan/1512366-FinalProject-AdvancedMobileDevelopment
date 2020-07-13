import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Skills from "../../Main/Browse/Skills/skills";
import {AuthenticationContext} from "../../../provider/authentication-provider";
import {skillsData} from "../../../testdata/skills-data";
import {ColorsContext} from "../../../provider/colors-provider";
import {getAllCategory} from "../../../core/services/category-service";
import {getAllInstructor} from "../../../core/services/instructor-services";

const Profile = (props) => {
  const {theme} = useContext(ColorsContext);
  const {state} = useContext(AuthenticationContext);

  const [categories, setCategories] = useState(null)

  useEffect(() => {
    getAllCategory().then(res => {
      if(res.status === 200) {
        setCategories(res.data.payload)
      } else {}
    }).catch(err => {
      console.log(err.response.data.message || err)
    })
  }, [])

  return <View style={{...styles.container, backgroundColor: theme.background}}>
    <View style={styles.containerAccount}>
      <Image source={require('../../../../assets/ic_person.png')} style={styles.image}/>
      <Text style={{...styles.textContent, color: theme.text}}>{state.userInfo.name}</Text>
    </View>
    <Skills title={'Interests'} skills={skillsData} interests={state.userInfo.favoriteCategories} navigation={props.navigation} route={props.route}/>
    <View>
      <Text style={{...styles.title, color: theme.text}}>Activity insights (last 30 days)</Text>
      <View>
        <Text style={{...styles.subTitle, color: theme.text}}>TOTAL ACTIVE DAYS</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...styles.textContent, color: theme.text}}>10</Text>
          <Text style={{marginLeft: 10, color: theme.text}}>9 day streak</Text>
        </View>
        <Text style={{...styles.subTitle, color: theme.text}}>MOST ACTIVE TIME OF DAY</Text>
        <View><Text style={{...styles.textContent, color: theme.text}}>12:00 PM</Text></View>

        <Text style={{...styles.subTitle, color: theme.text}}>MOST VIEWED SUBJECT</Text>
        <View><Text style={{...styles.textContent, color: theme.text}}>Software Development</Text></View>
      </View>
    </View>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  containerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
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
