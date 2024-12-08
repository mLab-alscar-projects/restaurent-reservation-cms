import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import SplashScreenChild from './components/SplashScreen';


// SPLASH SCREEN
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); 
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>

      <View style={styles.splashLogo}>
        <SplashScreenChild />
      </View>

      <ActivityIndicator size="large" color="#0000ff" />

    </View>
  );
};
// ENDS

// Login Screen Component
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      {/* Add your login form here */}
      <Text onPress={() => navigation.replace('Home')}>Go to Home</Text>
    </View>
  );
};

// Home Screen Component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  // SPLASH
  splashContainer: 
  {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 40
  },


  splashLogo: 
  {
      width: '100%',
      height: 400,
  },

  // ENDS

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
