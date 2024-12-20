import React, { useEffect, useState,useContext } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from '../styles/styles';

// CONTEXT
import AuthContext from '../AuthContext';

// STORAGE IMPORTS
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';
import RestaurantDetailsScreen from './RestaurantDetailsScreen';

const { width } = Dimensions.get('window');

const RestaurantScreen = ({route, navigation}) => {

  const { darkMode } = useContext(AuthContext);

  // STATE VARIABLES FOR MANAGING SCREEN DATA
  const { restaurant } = route.params;

  const [menuData, setMenuData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInforVisible, setIsinfoVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: null,
  });

  // FETCH MENU DATA ON COMPONENT MOUNT
  useEffect(() => {
    const fetchMenu = async () => {
      // RESET LOADING AND ERROR STATES
      setIsLoading(true);
      setError(null);

      try {
        // RETRIEVE AUTH TOKEN
        const token = await AsyncStorage.getItem('token');
        
        // FETCH MENU ITEMS
        const response = await axios.get(
          `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // UPDATE MENU DATA
        setMenuData(response.data.menuItems);
      } catch (error) {
        // SET ERROR STATE IF FETCHING FAILS
        console.error("ERROR FETCHING MENU:", error);
        setError('Failed to load menu items');
      } finally {
        // STOP LOADING INDICATOR
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [restaurant._id]);

  const fetchMenu = async () => {
    // RESET LOADING AND ERROR STATES
    setIsLoading(true);
    setError(null);

    try {
      // RETRIEVE AUTH TOKEN
      const token = await AsyncStorage.getItem('token');
      
      // FETCH MENU ITEMS
      const response = await axios.get(
        `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // UPDATE MENU DATA
      setMenuData(response.data.menuItems);
    } catch (error) {
      // SET ERROR STATE IF FETCHING FAILS
      console.error("ERROR FETCHING MENU:", error);
      setError('Failed to load menu items');
    } finally {
      // STOP LOADING INDICATOR
      setIsLoading(false);
    }
  };

  // IMAGE PICKER FUNCTION
  const pickImage = async () => {
    // REQUEST MEDIA LIBRARY PERMISSIONS
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('CAMERA ROLL PERMISSIONS DENIED');
      return;
    }

    // LAUNCH IMAGE PICKER
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // UPDATE STATE WITH SELECTED IMAGE
    if (!result.canceled) {
      setNewMenuItem({ 
        ...newMenuItem, 
        image: result.assets[0].uri 
      });
    }
  };

  // ADD MENU ITEM HANDLER
  
  const handleAddMenuItem = async () => {

    setIsLoading(true);                                                                                                                       
    if (!newMenuItem.name.trim() || !newMenuItem.price.trim()) {
      console.log('MISSING MENU ITEM DETAILS');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
  
      // Ensure price follows the required format, e.g., "R99.99"
      const price = newMenuItem.price.trim();
      const priceRegex = /^R\d+(\.\d{2})?$/;
      if (!priceRegex.test(price)) {
        console.log('Price format is invalid. It should start with "R" followed by numbers, e.g., "R99.99".');
        return;
      }
  
      // Generate a unique ID using expo-random
      const id = Date.now().toString();
  
      const newItem = {
        id: id, 
        name: newMenuItem.name.trim(),
        price: price,
        image: newMenuItem.image || null,
      };
  
  
      const payload = {
        menuItems: [newItem],  
      };
  
      const response = await axios.post(
        `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      setMenuData(response.data.menuItems);
  
      setNewMenuItem({ name: '', price: '', image: null });
      setIsModalVisible(false);
  
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'You have successfully added the Menu',
        position: 'bottom',
      });
    } catch (error) {
      console.error('ERROR ADDING MENU ITEM:', error.response?.data || error.message);
    } finally
    {
      setIsLoading(false);
    }
  };
  

  // EDIT MENU ITEM STATUS
  const handleUpdateAvilability = async (item) => {

    setIsLoading(true);
    try {
      // RETRIEVE AUTH TOKEN
      const token = await AsyncStorage.getItem('token');

      const updatedItem =
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || null,
        isActive: !item.isActive,
      }

      await axios.put(
        `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu/${item.id}`,
        {updatedItem},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMenu(item.id);
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'You have successfully updated the Menu status',
        position: 'bottom',
      });
      
      
    } catch (error) {
      console.error("ERROR UPDATING MENU STATUS:", error);
    } finally
    {
      setIsLoading(false);
    }
  };

  // EDIT MENU ITEM
  const  handleUpdateItem= async () => {

    setIsLoading(true);
    try {
      // RETRIEVE AUTH TOKEN
      const token = await AsyncStorage.getItem('token');

      const updatedItem =
      {
        id: selectedItem.id,
        name: newMenuItem.name.trim(),
        price: newMenuItem.price,
        image: newMenuItem.image,
        isActive: selectedItem.isActive,
      }

      await axios.put(
        `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu/${selectedItem.id}`,
        {updatedItem},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMenu(selectedItem.id);
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'You have successfully updated the Menu',
        position: 'bottom',
      });
      
      
    } catch (error) {
      console.error("ERROR UPDATING MENU ITEM:", error.response?.data || error.message);
    } finally
    {
      setIsLoading(false);
    }
  };

  // RENDER LOADING INDICATOR
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
        <ActivityIndicator 
          size="large" 
          color={restaurant.color || '#000'}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>

      
      {/* RESTAURANT HEADER */}
      <View style={[styles.header, { backgroundColor: restaurant.color }]}>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
        <Pressable style={styles.infoButton} onPress={() => navigation.navigate('RestaurantDetailsScreen', {restaurant})}>
          <MaterialIcons name='info' color={'#333'} size={30} />
        </Pressable>
      </View>

      {/* MENU ITEMS LIST OR EMPTY STATE */}
      {menuData.length === 0 ? (
        <View style={styles.emptyMenuContainer}>
          <Text style={styles.emptyMenuText}>NO MENU ITEMS AVAILABLE</Text>
          <Text style={styles.emptyMenuSubtext}>ADD YOUR FIRST MENU ITEM!</Text>
        </View>
      ) : (
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id + 1}
          renderItem={({ item }) => (
            <View style={[styles.menuCard, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.menuImage} 
              />
              <View style={styles.menuDetails}>
                <Text style={[styles.menuName, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{item.name}</Text>
                <Text style={[styles.menuPrice, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{item.price}</Text>
                <Text style={[styles.menuPrice, {color: item.isActive ? '#2ecc71' : '#e74b4b'}]}>{item.isActive ? 'Available' : 'Out of stock'}</Text>
              </View>
              <View style={styles.actionButtons}>

                <Pressable 
                  onPress={() => handleUpdateAvilability(item)} 
                  style={[styles.actionButton, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}
                >
                  <Text style={[styles.actionText, {color: '#3498db'}]}>{item.isActive ? 'Disable' : 'Enable'}</Text>
                </Pressable>

                <Pressable 
                  onPress={() => 
                    {
                      setIsEditing(true);
                      setSelectedItem(item);
                      setIsModalVisible(true);
                      setNewMenuItem(
                        {
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        }
                      )
                    }
                  } 
                  style={[styles.actionButton, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}
                >

                <Text style={[styles.actionText, {color: '#2ecc71'}]}>Update</Text>

                </Pressable>

              </View>
            </View>
          )}
          contentContainerStyle={styles.menuList}
        />
      )}

      {/* ADD MENU BUTTON */}
      <View style={styles.addButtonWrapper}>
        <Pressable
          style={[styles.addButton, { backgroundColor: restaurant.color }]}
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>ADD MENU</Text>
        </Pressable>
      </View>

      {/* ADD MENU MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ADD NEW MENU ITEM</Text>
            <TextInput
              style={styles.input}
              placeholder="ITEM NAME"
              value={newMenuItem.name}
              onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="PRICE (E.G. R99.99)"
              value={newMenuItem.price}
              onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: text })}
              keyboardType="numeric"
            />
            
            {/* IMAGE PICKER */}
            <Pressable 
              style={styles.imagePickerButton} 
              onPress={pickImage}
            >
              {newMenuItem.image ? (
                <Image 
                  source={{ uri: newMenuItem.image}} 
                  style={styles.pickedImage} 
                />
              ) : (
                <Text style={styles.imagePickerText}>PICK AN IMAGE</Text>
              )}
            </Pressable>

            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setNewMenuItem({ name: '', price: '', image: null });
                  setIsEditing(false);
                  setSelectedItem(null);
                }}
              >
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </Pressable>
              

              {isEditing ? 

              <Pressable
                style={[styles.modalButton, styles.addButton, {backgroundColor: '#3498db'}]}
                onPress={handleUpdateItem}
              >
                <Text style={styles.modalButtonText}> {isLoading ? <ActivityIndicator size={"small"}/> : 'UPDATE ITEM'}</Text>
              </Pressable> 
              
              : 
              
              <Pressable
                style={[styles.modalButton, styles.addButton, {backgroundColor: '#2ecc71'}]}
                onPress={handleAddMenuItem}
              >
                <Text style={[styles.modalButtonText, {color: '#333'}]}> {isLoading ? <ActivityIndicator size={"small"}/> : 'ADD ITEM'}</Text>
              </Pressable>
              
              }
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* INFORMATION MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isInforVisible}
        onRequestClose={() => setIsinfoVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.infoParentOverall}
        >
          <RestaurantDetailsScreen restaurant={restaurant} darkMode={darkMode}/>

        </KeyboardAvoidingView>
      </Modal>

      {/* ENDS */}


    </View>
  );
};

export default RestaurantScreen;