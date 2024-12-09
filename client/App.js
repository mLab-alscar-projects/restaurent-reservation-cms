import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import SplashScreenChild from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RestaurantScreen from './components/Restaurant';
import NotificationScreen from './components/NotificationScreen';
import ReservationsScreen from './components/ReservationsScreen';
import ProfileScreen from './components/Profile';



// SPLASH SCREEN
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); 
  }, [navigation]);
  // ENDS
  

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


// STACK NAVIGATOR
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView backgroundColor= '#97CBDC'/> */}
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

        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{
            headerShown: true,
            headerTitle: 'Restaurant Menu', 
            headerStyle: {
              backgroundColor: '#3498db', 
            },
            headerTitleStyle: {
              color: '#fff', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            },
            headerTintColor: 'yellow', 
          }}
        />

        <Stack.Screen
          name="ReservationsScreen"
          component={ReservationsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Reservations', 
            headerStyle: {
              backgroundColor: '#3498db', 
            },
            headerTitleStyle: {
              color: '#fff', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            },
            headerTintColor: 'yellow', 
          }}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: true,
            headerTitle: 'Notifications', 
            headerStyle: {
              backgroundColor: '#3498db', 
            },
            headerTitleStyle: {
              color: '#fff', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            },
            headerTintColor: 'yellow', 
          }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerTitle: 'Profile', 
            headerStyle: {
              backgroundColor: '#3498db', 
            },
            headerTitleStyle: {
              color: '#fff', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            },
            headerTintColor: 'yellow', 
          }}
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
      padding: 50
  },

  // ENDS

});
