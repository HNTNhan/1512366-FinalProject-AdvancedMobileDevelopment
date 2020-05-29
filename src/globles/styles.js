import {Dimensions, StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  separator: {
    height: 1,
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
    backgroundColor: 'white',
  },
   splashScreen: {
     resizeMode: "cover",
     height: Dimensions.get('screen').height,
     width: Dimensions.get('screen').width
   },
})

// export const defaultColors = StyleSheet.create({
//   defaultBackgroundColor: {
//     dark: {
//       foreground: '#dddddd',
//       background: '#000000',
//     },
//     light: {
//       foreground: '#222222',
//       background: '#ffffff',
//     }
//   }
// })
