import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Pressable, 
  Image, 
  Dimensions 
} from 'react-native';

// SCREEN DIMENSIONS
const { width } = Dimensions.get('window');

const RestaurantScreen = () => {
  // MOCK MENU DATA
  const menuData = [
    { id: '1', name: 'Grilled Chicken', price: 'R62.99', image: require('../assets/chicken.jpg') },
    { id: '2', name: 'Vegan Salad', price: 'R58.99', image: require('../assets/salad.jpg') },
    { id: '3', name: 'Pasta Carbonara', price: 'R84.49', image: require('../assets/pasta.jpg') },
    { id: '4', name: 'Cheeseburger', price: 'R99.99', image: require('../assets/burger.jpg') },
  ];

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
          </View>
        )}
        contentContainerStyle={styles.menuList}
      />

      {/* ADD MORE MENU BUTTON */}
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More Menu</Text>
      </Pressable>
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
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
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

  // ADD BUTTON STYLES
  addButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
