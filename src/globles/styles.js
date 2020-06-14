import {Dimensions, StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 5,
    width: "100%",
    backgroundColor: "darkgray",
  },
  borderSeparator: {
    borderBottomWidth: 2,
    borderColor: 'darkgray',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
   splashScreen: {
     resizeMode: "cover",
     height: Dimensions.get('screen').height,
     width: Dimensions.get('screen').width
   },
})
