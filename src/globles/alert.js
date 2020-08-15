import {Alert} from "react-native";

export const alertSignIn = () => Alert.alert(
  '',
  'Please sign in to continue this action!',
  [],
  { cancelable: true })

export const alertPayment = () => Alert.alert(
  '',
  'Please payment courses to continue this action!',
  [],
  { cancelable: true })


