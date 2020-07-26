import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DownloadContext} from "../../provider/download-provider";

const DownloadBar = (props) => {
  const {downloadInfo, isDownloading} = useContext(DownloadContext)


  if(isDownloading) {
    return <View style={styles.container}>
      <Text style={{color: 'white'}}>{props.progress + '%'}</Text>
    </View>
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#999999',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1
  }
})
export default DownloadBar;
