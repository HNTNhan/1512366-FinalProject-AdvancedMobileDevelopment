import {Alert} from "react-native";

export const alertSignIn = () => Alert.alert(
  '',
  'Please sign in to continue this action!',
  [],
  { cancelable: true })

