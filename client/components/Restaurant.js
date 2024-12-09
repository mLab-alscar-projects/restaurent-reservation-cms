import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Pressable, 
  Image, 
  Dimensions, 
  Alert 
} from 'react-native';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// SCREEN DIMENSIONS
const { width } = Dimensions.get('window');

const RestaurantScreen = () => {
  // MOCK MENU DATA
  const menuData = [
    { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('../assets/chicken.jpg') },
    { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('../assets/salad.jpg') },
    { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('../assets/pasta.jpg') },
    { id: '4', name: 'Cheeseburger Small', price: 'R99.99', image: require('../assets/burger.jpg') },
    { id: '5', name: 'Cheeseburger Extra', price: 'R99.99', image: require('../assets/burger.jpg') },
    { id: '6', name: 'Cheeseburger Normal', price: 'R99.99', image: require('../assets/burger.jpg') },
    { id: '7', name: 'Cheeseburger Hot', price: 'R99.99', image: require('../assets/burger.jpg') },
  ];

  // Handle Edit Button Press
  const handleEdit = (item) => {
    Alert.alert('Edit Menu', `Edit ${item.name}`);
  };

  // Handle Delete Button Press
  const handleDelete = (item) => {
    Alert.alert('Delete Menu', `Are you sure you want to delete ${item.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log(`${item.name} deleted`) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Foodies' Delight</Text>
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
        <Pressable style={styles.addButton}>
          <MaterialIcons name="add" size={20} color={'#fff'} />
          <Text style={styles.addButtonText}>Add Menu</Text>
        </Pressable>
      </View>
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
});

export default RestaurantScreen;
