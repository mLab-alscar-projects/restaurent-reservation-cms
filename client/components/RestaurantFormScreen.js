import React, { useState, useContext, useEffect } from 'react';
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

// STORAGE AND FIREBASE
import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { storage } from '../firebase/firebaseConfig';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// EXTRA IMPORTS
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
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

  // UPLOAD IMAGE FUNCTION TO FIREBASE STORAGE
  useEffect(() => {
    const uploadImage = async () => {
      // Skip if no image or if image is already a URL
      if (!restaurantData.image || restaurantData.image.startsWith('http')) return;

      setLoading(true);

      const uploadToFirebase = async (blob, retryCount = 0) => {
        try {
          const fileName = `restaurants/${Date.now()}_${retryCount}_restaurant.jpg`;
          const storageRef = ref(storage, fileName);
          const snapshot = await uploadBytes(storageRef, blob);
          const url = await getDownloadURL(snapshot.ref);

          setRestaurantData(prev => ({ ...prev, image: url }));
          setLoading(false);

          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Image uploaded successfully",
            position: "bottom",
          });
        } catch (error) {
          throw error;
        }
      };

      try {
        // First attempt: Direct fetch
        const response = await fetch(restaurantData.image);
        const blob = await response.blob();
        await uploadToFirebase(blob);

      } catch (error) {
        console.error('Primary upload method failed:', {
          error: error.message,
          path: restaurantData.image
        });

        try {
          // Second attempt: FileSystem
          const base64 = await FileSystem.readAsStringAsync(restaurantData.image, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const blob = await fetch(`data:image/jpeg;base64,${base64}`).then(r => r.blob());
          await uploadToFirebase(blob, 1);

        } catch (secondError) {
          console.error('Secondary upload method failed:', secondError);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to upload image",
            position: "bottom",
          });
          setLoading(false);
        }
      }
    };

    uploadImage();
  }, [restaurantData.image]);

  // IMAGE PICKER FUNCTION
  const pickImage = async () => {
    try {
      // REQUEST MEDIA LIBRARY PERMISSIONS
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: "error",
          text1: "Permission denied",
          text2: "Please allow access to your media library",
          position: "bottom",
        });
        return;
      }

      // LAUNCH IMAGE PICKER
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // UPDATE STATE WITH SELECTED IMAGE
      if (!result.canceled) {
        setRestaurantData(prev => ({
          ...prev,
          image: result.assets[0].uri
        }));
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to pick image",
        position: "bottom",
      });
    }
  };


  // HANDLE SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (restaurant) {
        const token = await AsyncStorage.getItem("token");
        await axios.put(
          `https://acrid-street-production.up.railway.app/api/v2/updateRestaurant/${restaurant._id}`,
          {updatedData: restaurantData},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await addRestaurant(
          restaurantData.name,
          restaurantData.tables,
          restaurantData.color,
          restaurantData.location,
          restaurantData.timeslot,
          restaurantData.cuisine,
          restaurantData.description,
          restaurantData.latitude,
          restaurantData.longitude,
          restaurantData.image
        );
      }

      await fetchRestaurants();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: restaurant ? "Restaurant updated successfully" : "Restaurant added successfully",
        position: "bottom",
      });
      navigation.navigate("Home");

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
          {restaurantData.image && (
            <Image 
              source={{ uri: restaurantData.image }} 
              style={styles.imagePreview} 
            />
          )}
        </View>

        <TouchableOpacity 
          style={[styles.submitButton]}
          onPress={handleSubmit}
        >
          {!loading ? 
          <Text style={styles.submitButtonText}>
            {restaurant? 'Update Restaurant' : 'Add Restaurant'}
          </Text> 
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