import React, {useContext, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, Icon, Text} from "react-native-elements";
import {ColorsContext} from "../../../provider/colors-provider";
import {convertTime} from "../../Common/convert-data";
import {DownloadContext} from "../../../provider/download-provider";
import {alertSignIn} from "../../../globles/alert";

const ListLessonTitle = (props) => {
  const {theme} = useContext(ColorsContext)
  const {startDownload, setDownloadId, downloadId} = useContext(DownloadContext)

  return <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={{...styles.thumbnail, color: theme.text}}>{props.index}</Text>
      <View style={{flex: 0.7, paddingHorizontal: 5}}>
        <Text style={{fontSize: 18, color: theme.text}}>{props.title}</Text>
        {
          props.totalDuration===0 ? null :
            <Text style={{ fontSize: 16, color: theme.text}}>
              {convertTime(props.totalDuration)}
            </Text>
        }
      </View>
    </View>

    {
      props.downloaded ? null : !startDownload || downloadId.sectionId !== props.id ?
        <Button type='clear' containerStyle={{padding: 5}} disabled={startDownload}
                onPress={async () => {
                  if(props.checkOwn) {
                    setDownloadId({...downloadId, sectionId: props.id})
                    await props.onPressDownloadSection()
                  } else {
                    alertSignIn()
                  }
                }}
                icon={<Icon name={'download'} type='font-awesome-5' size={16} color={!startDownload ? theme.text : 'gray'}/>}/> :
      <ActivityIndicator style={{padding: 5}} size={'small'} color={theme.text} />
    }
  </View>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  subContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  thumbnail: {
    flex: 0.3,
    backgroundColor: 'gray',
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
  },
})
export default ListLessonTitle;
