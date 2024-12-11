import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import RestaurantFormScreen from './components/RestaurantFormScreen';

// DATA
import { reservationsData } from './components/data';
import { restaurantsData } from './components/data';

// AXIOS
import axios from 'axios';
import AuthContext from './AuthContext';



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

  // DATA


const [restaurantsDatas, setRestaurantsData] = useState([]);

const reservations = reservationsData;

// FETCH DATA
useEffect(() => {
  const fetchRestauirants = async()=>{

    try {
      
        const token = await AsyncStorage.getItem('token');
        console.log('The token is: ', token);

        if (!token) {
          console.error("No token found, cannot fetch restaurants.");
          return;
        }

        const response = await axios.
        get('https://acrid-street-production.up.railway.app/api/v2/fetchRestaurants',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );

        setRestaurantsData(response.data.restaurants);

        console.log("Data fetched successfully:", JSON.stringify(response.data, null, 2));
      } catch (error) {

        console.error("Error fetching data:", {

          message: error.message,
          response: error.response ? error.response.data : "No response data",
          status: error.response ? error.response.status : "No status",
          request: error.request,

        });
    }
  }

  fetchRestauirants();

}, []);

// HANDLE LOGIN
const handleLogin = async (email, password, setMessage) => {
  try {
      const response = await axios.post(
          'https://acrid-street-production.up.railway.app/api/v2/login',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } } 
      );
      
      const { token, email: userEmail } = response.data;

      if (token) {
          setMessage(`Welcome back, ${userEmail}!`);
          Toast.show({
            type: 'success', 
            text1: `Welcome back, ${userEmail}!`,
            text2: 'You have successfully logged in.',
            position: 'bottom',
          });

          await AsyncStorage.setItem('token', token);
          console.log("Login successful. Token stored:", token);

          console.log("Login successful. User:", response.data);
          return true;
      } else {
          setMessage("Login failed. Please try again.");
          return false;
      }
  } catch (error) {
      console.error("Login error:", {
        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
        request: error.request,
      });

      setMessage(
          error?.response?.data?.error || "An error occurred. Please try again."
      );
      return false;
  }
};

  
  


  return (
    <AuthContext.Provider value={{ handleLogin }}>
      <NavigationContainer>
        <SafeAreaView backgroundColor= '#97CBDC'/>
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
            initialParams={{ restaurants: restaurantsDatas }}
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
              headerTintColor: '#000', 
            }}
          />

          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            initialParams={{reservations}}
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
              headerTintColor: '#000', 
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
              headerTintColor: '#000', 
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
              headerTintColor: '#000', 
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
              headerTintColor: '#000', 
            }}
          />

          <Stack.Screen
            name="RestaurantFormScreen"
            component={RestaurantFormScreen}
            options={{
              headerShown: true,
              headerTitle: 'Add restaurant', 
              headerStyle: {
                backgroundColor: '#3498db', 
              },
              headerTitleStyle: {
                color: '#fff', 
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              },
              headerTintColor: '#000', 
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={styles.toastParent}>
        <Toast /> 
      </View>
    </AuthContext.Provider>
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

  // TOAST
  toastParent:
  {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    zIndex: 1
  }

});
