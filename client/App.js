import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
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
import UsersScreen from './components/UsersScreen';
import RestaurantDetailsScreen from './components/RestaurantDetailsScreen';

// DATA
import { reservationsData } from './components/data';

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
       <StatusBar backgroundColor={'#97CBDC'}/>

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
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [darkMode, setDarkMode]= useState(true);


const reservations = reservationsData;

// FETCH DATA
useEffect(() => {
  const fetchRestauirants = async()=>{

    try {

        setLoading(true);
        const token = await AsyncStorage.getItem('token');

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

      } catch (error) {

        console.error("Error fetching data:", {
          message: error.message,
          response: error.response ? error.response.data : "No response data",
          status: error.response ? error.response.status : "No status",
          request: error.request,

        });
    } finally {
      setLoading(false); 
    }
  }

  fetchRestauirants();

}, []);

// FETCH RESTAURENTS FUNCTION
const fetchRestaurants = async()=>{

  try {

      setLoading(true);
      const token = await AsyncStorage.getItem('token');

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

    } catch (error) {

      console.error("Error fetching data:", {

        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
        request: error.request,

      });
  } finally {
    setLoading(false); 
  }
}


// FETCH USERS FUNCTION
const fetchUsers = async()=>{

  try {

      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error("No token found, cannot fetch users.");
        return;
      }

      const response = await axios.
      get('https://lumpy-clover-production.up.railway.app/api/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        

      );

      setUsers(response.data);
      console.log(users)

    } catch (error) {

      console.error("Error fetching data:", {

        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
        request: error.request,

      });
  } finally {
    setLoading(false); 
  }
}
// ENDS

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
          Toast.show({
            type: 'success', 
            text1: `Welcome back, ${userEmail}!`,
            text2: 'You have successfully logged in.',
            position: 'bottom',
          });

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userEmail', userEmail);

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

// ADD RESTAURANT
const addRestaurant = async (name, tables, color, location, timeslot, cuisine, description, latitude, longitude, image) => {
  try {
    
    const token = await AsyncStorage.getItem('token');

    if(!token){
      console.log("No token is available");
      return
    }

    const restaurantData = {
      name,
      tables,
      color,
      location,
      timeslot,
      cuisine,
      description,
      coordinates: {
        latitude,
        longitude,
      },
      image, 
    };

    const response = await axios.post("https://acrid-street-production.up.railway.app/api/v2/restaurant", restaurantData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',} });
    if (response.status === 201) {
      console.log('Restaurant added successfully:', response.data);
    
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'Restaurant added successfully!',
        position: 'bottom',
      });
    } else {
      console.error('Failed to add restaurant:', response.data);
      Toast.show({
        type: 'error', 
        text1: `Error`,
        text2: 'Failed to add restaurant.',
        position: 'bottom',
      });

    }

  } catch (error) {
      console.error("Error adding restaurant:", {
        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
      });
  }
}



  return (
    <AuthContext.Provider 
    value={{ handleLogin, addRestaurant, fetchRestaurants, restaurants: restaurantsDatas, loader: loading, darkMode, setDarkMode, fetchUsers, users }}>
      <NavigationContainer>
        <SafeAreaView backgroundColor= '#97CBDC'/>
        <StatusBar
            backgroundColor={darkMode ? '#333333' : '#f4f7fa'} 
            barStyle={darkMode ? 'light-content' : 'dark-content'} 
        />
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
                backgroundColor: darkMode ? '#333333' : '#f4f7fa', 
              },
              headerTitleStyle: {
                color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)', 
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              },
              headerTintColor: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)', 
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

          <Stack.Screen
            name="RestaurantDetailsScreen"
            component={RestaurantDetailsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Restaurant details', 
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
            name="users"
            component={UsersScreen}
            options={{
              headerShown: true,
              headerTitle: 'Users', 
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
      backgroundColor: '#97CBDC',
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
