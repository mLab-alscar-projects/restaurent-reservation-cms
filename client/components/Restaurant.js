import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
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

// STORAGE IMPORTS
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const RestaurantScreen = ({route}) => {
  // STATE VARIABLES FOR MANAGING SCREEN DATA
  const { restaurant } = route.params;
  const [menuData, setMenuData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  
      // Create the new item object
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
  
      console.log('MENU ITEM ADDED SUCCESSFULLY');
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'You have successfully added the Menu',
        position: 'bottom',
      });
    } catch (error) {
      console.error('ERROR ADDING MENU ITEM:', error.response?.data || error.message);
    }
  };
  

  // DELETE MENU ITEM HANDLER
  const handleDelete = async (item) => {
    try {
      // RETRIEVE AUTH TOKEN
      const token = await AsyncStorage.getItem('token');
      
      // SEND DELETE REQUEST
      await axios.delete(
        `https://acrid-street-production.up.railway.app/api/v2/restaurants/${restaurant._id}/menu/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // REMOVE ITEM FROM LOCAL STATE
      setMenuData(menuData.filter(menuItem => menuItem.id !== item.id));
    } catch (error) {
      console.error("ERROR DELETING MENU ITEM:", error);
    }
  };

  // RENDER LOADING INDICATOR
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={restaurant.color || '#000'}
        />
      </View>
    );
  }

  // RENDER ERROR STATE
  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>{error}</Text>
  //       <Pressable 
  //         style={[styles.retryButton, { backgroundColor: restaurant.color }]}
  //         onPress={() => {}} // ADD RETRY LOGIC IF NEEDED
  //       >
  //         <Text style={styles.retryButtonText}>Retry</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* RESTAURANT HEADER */}
      <View style={[styles.header, { backgroundColor: restaurant.color }]}>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
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
            <View style={styles.menuCard}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.menuImage} 
              />
              <View style={styles.menuDetails}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price}</Text>
              </View>
              <View style={styles.actionButtons}>
                <Pressable 
                  onPress={() => handleDelete(item)} 
                  style={styles.deleteButton}
                >
                  <MaterialIcons name="delete" size={20} color="#fff" />
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
                  source={{ uri: newMenuItem.image }} 
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
                }}
              >
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddMenuItem}
              >
                <Text style={styles.modalButtonText}>ADD ITEM</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // LOADING CONTAINER STYLES
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ERROR CONTAINER STYLES
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  // EXISTING STYLES REMAIN THE SAME AS IN PREVIOUS VERSION
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyMenuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMenuText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptyMenuSubtext: {
    fontSize: 14,
    color: '#999',
  },
  menuList: {
    padding: 10,
  },
  menuCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  menuImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  menuDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuPrice: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
  },
  addButtonWrapper: {
    padding: 10,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  imagePickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  pickedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  imagePickerText: {
    color: '#666',
  },
});

export default RestaurantScreen;