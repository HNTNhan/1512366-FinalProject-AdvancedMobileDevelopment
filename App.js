import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./src/components/Others/SplashScreen/splash-screen";
import AuthenticationScreen from "./src/components/Navigation/AuthenticationScreen/authentication-screen";
import MainScreen from "./src/components/Navigation/MainScreen/main-screen";
import AccountManagementScreen from "./src/components/Navigation/AccountManagementScreen/account-management-screen";
import {AuthenticationProvider} from "./src/provider/authentication-provider";
import {ColorsProvider} from "./src/provider/colors-provider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <AuthenticationProvider>
        <ColorsProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Authentication' component={AuthenticationScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
              <Stack.Screen name='AccountManagement' component={AccountManagementScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ColorsProvider>
      </AuthenticationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
