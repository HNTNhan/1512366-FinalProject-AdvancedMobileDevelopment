import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/components/Main/Home/home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
