import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

const RestaurantFormScreen = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "Eat'in",
    tables: 7,
    color: '#3498db',
    description: "Modern Cuisine",
    location: "Soweto",
    timeslot: "08:00 - 17:00",
    cuisine: "Contemporary",
    image: null,
    latitude: -26.2041,  
    longitude: 27.9924
  });

  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  const handleSubmit = () => {
    console.log('Restaurant Data:', restaurantData);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: restaurantData.color }]}>
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
          <Text style={styles.label}>Number of Tables</Text>
          <TextInput
            style={styles.input}
            value={restaurantData.tables.toString()}
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
          style={[styles.submitButton, { backgroundColor: restaurantData.color }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Restaurant</Text>
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
    color: 'white',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 8,
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RestaurantFormScreen;