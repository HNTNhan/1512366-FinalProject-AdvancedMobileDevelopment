import React, {useState} from 'react';
import { Platform, Text, View, StyleSheet, Dimensions  } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const LocationMap = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const useEffect = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        await setLocation(location);
      })();
    }
  }
  useEffect();
  // let text = 'Please Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.container}>
      {console.log(location)}
      <MapView style={styles.mapStyle}
               // initialRegion={{
               //    latitude: 0,
               //    longitude: 0,
               //    latitudeDelta: 0,
               //    longitudeDelta: 0,
               //  }}
      >
        <Marker
          coordinate={location!==null ? location.coords : {latitude: 0, longitude: 0}}
          title={'123'}
          description={'456'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default LocationMap;
