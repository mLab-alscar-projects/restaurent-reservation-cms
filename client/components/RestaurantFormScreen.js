import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator,
  StatusBar
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const RestaurantFormScreen = ({navigation, route}) => {

  const {addRestaurant} = useContext(AuthContext);
  const {fetchRestaurants} = useContext(AuthContext);
  const {restaurant} = route.params || {};

  const [loading, setLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: restaurant?.name || "",
    tables: restaurant?.tables || 7,
    color: restaurant?.color || "",
    description: restaurant?.description || "",
    location: restaurant?.location || "",
    timeslot: restaurant?.timeslot || "",
    cuisine: restaurant?.cuisine || "",
    image: restaurant?.image || null,
    latitude: restaurant?.latitude || -26.2041,  
    longitude: restaurant?.longitude || 27.9924
  });

  const [imageUri, setImageUri] = useState(restaurant?.image || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setRestaurantData(prev => ({
        ...prev,
        image: result.assets[0].uri
      }));
    }
  };

  const handleSubmit = async () => {

    // EXTRACT DATA FROM RESTAURANT DATA
    const {
      name,
      tables,
      color,
      location,
      timeslot,
      cuisine,
      description,
      latitude,
      longitude,
      image,
    } = restaurantData;
  
    setLoading(true);
  
    try {
      if (restaurant) {
        // UPDATE RESTAURANT
        const updatedData = {
          name,
          tables,
          color,
          location,
          timeslot,
          cuisine,
          description,
          latitude,
          longitude,
          image,
        };
  
        const token = await AsyncStorage.getItem("token");
        const response = await axios.put(
          `https://acrid-street-production.up.railway.app/api/v2/updateRestaurant/${restaurant._id}`,
          {updatedData},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Restaurant updated successfully",
            position: "bottom",
          });

          // NAVIGATE TO HOME
          navigation.navigate("Home");
        }

        // FETCH RESTAURANTS
        await fetchRestaurants();

      } else {

        // ADD RESTAURANT
        await addRestaurant(
          name,
          tables,
          color,
          location,
          timeslot,
          cuisine,
          description,
          latitude,
          longitude,
          image
        );

        // FETCH RESTAURANTS AFTER UPDATING
        await fetchRestaurants();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Restaurant added successfully",
          position: "bottom",
        });

        // NAVIGATE TO HOME
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save restaurant data",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  // ENDS
  
  
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#d3ddda' }]}>
      <StatusBar backgroundColor="#3498db"/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Restaurant</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Restaurant Name</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.name}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, name: text}))}
            placeholder="Enter restaurant name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.description}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, description: text}))}
            placeholder="Restaurant description"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Restaurant color</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.color}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, color: text}))}
            placeholder="Restaurant color"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Tables</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.tables}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, tables: parseInt(text)}))}
            keyboardType="numeric"
            placeholder="Number of tables"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.location}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, location: text}))}
            placeholder="Restaurant location"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Operating Hours</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.timeslot}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, timeslot: text}))}
            placeholder="Operating hours"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cuisine Type</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.cuisine}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, cuisine: text}))}
            placeholder="Cuisine type"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Restaurant Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: restaurantData.latitude,
              longitude: restaurantData.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: restaurantData.latitude,
                longitude: restaurantData.longitude
              }}
              title={restaurantData.name}
              description={restaurantData.location}
            />
          </MapView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.latitude.toString()}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, latitude: parseFloat(text)}))}
            keyboardType="numeric"
            placeholder="Latitude"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.longitude.toString()}
            onChangeText={(text) => setRestaurantData(prev => ({...prev, longitude: parseFloat(text)}))}
            keyboardType="numeric"
            placeholder="Longitude"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Restaurant Image</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Pick an image</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.imagePreview} 
            />
          )}
        </View>

        <TouchableOpacity 
          style={[styles.submitButton]}
          onPress={handleSubmit}
        >
          {!loading ? 
          <Text style={styles.submitButtonText}>Add Restaurant</Text>
          :

          <ActivityIndicator size="small" color="#0000ff"/>
        }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#444',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 15,

  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  map: {
    height: 200,
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  imagePicker: {
    backgroundColor: '#2ecc71',
    padding: 15,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#f9f9f9',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    letterSpacing: 2,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    marginTop: 15,
    borderRadius: 8,
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#3498db',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default RestaurantFormScreen;