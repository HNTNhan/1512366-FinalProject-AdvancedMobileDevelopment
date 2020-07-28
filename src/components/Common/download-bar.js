import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DownloadContext} from "../../provider/download-provider";
import {ColorsContext} from "../../provider/colors-provider";

const DownloadBar = (props) => {
  const {theme} = useContext(ColorsContext)
  const {downloadInfo, isDownloading} = useContext(DownloadContext)


  if(isDownloading) {
    return <View style={{...styles.container, backgroundColor: theme.foreground1}}>
        <Text style={{color: theme.text, flexShrink: 1}} numberOfLines={1}>{downloadInfo.lessonName}: </Text>
        <Text style={{color: theme.text, width: 60}}>{downloadInfo.progress}%</Text>
    </View>
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#999999',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white'
  }
})
export default DownloadBar;
