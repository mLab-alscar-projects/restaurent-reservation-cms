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
import SettingsScreen from './components/SettingsScreen';
import RestaurantPerformance from './components/RestaurantPerformance';



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

  const restaurants = [
    { 
      name: "Eat'in", 
      tables: 7, 
      color: '#3498db', 
      description: "Modern Cuisine",
      cuisine: "Contemporary",
      image: require('./assets/burger.jpg'),
      menu: [
        { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('./assets/chicken.jpg') },
        { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('./assets/salad.jpg') },
        { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('./assets/pasta.jpg') },
        { id: '4', name: 'Cheeseburger Small', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '5', name: 'Cheeseburger Extra', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '6', name: 'Cheeseburger Normal', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '7', name: 'Cheeseburger Hot', price: 'R99.99', image: require('./assets/burger.jpg') },
      ]
    },

    { 
      name: "Foodies' Delight", 
      tables: 3, 
      color: '#2ecc71', 
      description: "Gourmet Experience",
      cuisine: "International",
      image: require('./assets/burger.jpg'),
      menu: [
        { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('./assets/chicken.jpg') },
        { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('./assets/salad.jpg') },
        { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('./assets/pasta.jpg') },
        { id: '4', name: 'Cheeseburger Small', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '5', name: 'Cheeseburger Extra', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '6', name: 'Cheeseburger Normal', price: 'R99.99', image: require('./assets/burger.jpg') },
        { id: '7', name: 'Cheeseburger Hot', price: 'R99.99', image: require('./assets/burger.jpg') },
      ],

      reservations : [
        {
          id: 1,
          restaurant: "Foodies' Delight",
          date: "Dec 15, 2024",
          time: "7:30 PM",
          guests: 2,
          status: "Confirmed",
          imageUri: require('./assets/burger.jpg')
        },
        {
          id: 2,
          restaurant: "Foodies' Delight",
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('./assets/burger.jpg')
        },
        {
          id: 3,
          restaurant: "Foodies' Delight",
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('./assets/burger.jpg')
        },
        {
          id: 4,
          restaurant: "Foodies' Delight",
          date: "Dec 22, 2024",
          time: "6:45 PM", 
          guests: 4,
          status: "Pending",
          imageUri: require('./assets/burger.jpg')
        },
      ]
    },
    { 
      name: "Munchies", 
      tables: 3, 
      color: '#ffaf58', 
      description: "Casual Dining",
      cuisine: "Fast Casual",
      image: require('./assets/burger.jpg')
    },
    { 
      name: "Spice Route", 
      tables: 5, 
      color: '#9b59b6', 
      description: "Exotic Flavors",
      cuisine: "Fusion",
      image: require('./assets/burger.jpg')
    }
  ];

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
          initialParams={{ restaurants }}
        />

        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{
            headerShown: true,
            headerTitle: 'Restaurant Menu', 
            headerStyle: {
              backgroundColor: '#d3ddda', 
            },
            headerTitleStyle: {
              color: '#000', 
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            },
            headerTintColor: '#000', 
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

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Settings', 
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
          name="RestaurantPerformance"
          component={RestaurantPerformance}
          options={{
            headerShown: true,
            headerTitle: 'Performance', 
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
