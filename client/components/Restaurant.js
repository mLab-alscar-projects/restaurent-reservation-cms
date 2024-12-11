
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Pressable, 
  Image, 
  Dimensions, 
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// SCREEN DIMENSIONS
const { width } = Dimensions.get('window');

const RestaurantScreen = ({route}) => {

  const { restaurant } = route.params;
  const [menuData, setMenuData] = useState(restaurant.menu);

  // STATE FOR MODAL AND FORM
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: require('../assets/burger.jpg') 
  });

  // Handle Edit Button Press
  const handleEdit = (item) => {
    Alert.alert('Edit Menu', `Edit ${item.name}`);
  };

  // Handle Delete Button Press
  const handleDelete = (item) => {
    Alert.alert('Delete Menu', `Are you sure you want to delete ${item.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: () => {
          setMenuData(menuData.filter(menuItem => menuItem.id !== item.id));
        } 
      },
    ]);
  };

  // Handle Add Menu Item
  const handleAddMenuItem = () => {
    // Validate inputs
    if (!newMenuItem.name.trim() || !newMenuItem.price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Create new menu item with a unique ID
    const newItem = {
      id: (menuData.length + 1).toString(),
      ...newMenuItem
    };

    // Add to menu data
    setMenuData([...menuData, newItem]);

    // Reset form and close modal
    setNewMenuItem({ name: '', price: '', image: require('../assets/burger.jpg') });
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, {backgroundColor: restaurant.color}]}>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>
      <View style={[{backgroundColor: '#000', height: 5, width: '150', alignSelf: 'center', marginTop: 20, borderRadius: 6}]}>
    
      </View>

      {/* MENU LIST */}
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuCard}>
            <Image source={item.image} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{item.price}</Text>
            </View>
            <View style={styles.actionButtons}>
              <Pressable onPress={() => handleEdit(item)} style={styles.editButton}>
                <MaterialIcons name="edit" size={20} color="#fff" />
              </Pressable>
              <Pressable onPress={() => handleDelete(item)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        )}
        contentContainerStyle={styles.menuList}
        
      />

      {/* ADD MORE MENU BUTTON */}
      <View style={styles.addButtonWrapper}>
        <Pressable 
          style={[styles.addButton, {backgroundColor: restaurant.color}]} 
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialIcons name="add" size={20} color={'#fff'} />
          <Text style={styles.addButtonText}>Add Menu</Text>
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
            <Text style={styles.modalTitle}>Add New Menu Item</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newMenuItem.name}
              onChangeText={(text) => setNewMenuItem({...newMenuItem, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price (e.g. R99.99)"
              value={newMenuItem.price}
              onChangeText={(text) => setNewMenuItem({...newMenuItem, price: text})}
              keyboardType="numeric"
            />
            
            <View style={styles.modalButtonContainer}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.modalButton, styles.addButton]} 
                onPress={handleAddMenuItem}
              >
                <Text style={styles.modalButtonText}>Add Item</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },

  // HEADER STYLES
  header: {
    backgroundColor: '#2ecc71',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  // MENU LIST STYLES
  menuList: {
    padding: 20,
  },

  menuCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },

  menuImage: {
    width: 80,
    height: 80,
  },

  menuDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  menuPrice: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },

  actionButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    gap: 5,
  },

  editButton: 
  {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: 
  {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ADD BUTTON STYLES
  addButtonWrapper: 
  {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  addButton: 
  {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    gap: 5,
    width: '100%',
  },

  addButtonText: 
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

   // MODAL STYLES
   modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  cancelButton: {
    backgroundColor: '#e74c3c',
  },


  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
