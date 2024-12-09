import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Dimensions, 
  ScrollView, 
  Pressable 
} from 'react-native';

// SCREEN DIMENSIONS
const { width } = Dimensions.get('window');

const RestaurantPerformance = () => {
  const restaurants = [
    {
      name: "Eat'in",
      image: require('../assets/burger.jpg'),
      reservations: 45,
      reviews: 120,
      rating: 4.8,
      color: '#3498db',
    },
    {
      name: "Foodies' Delight",
      image: require('../assets/burger.jpg'),
      reservations: 32,
      reviews: 98,
      rating: 4.5,
      color: '#2ecc71',
    },
    {
      name: "Munchies",
      image: require('../assets/burger.jpg'),
      reservations: 28,
      reviews: 75,
      rating: 4.2,
      color: '#e67e22',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurant Performance</Text>
      {restaurants.map((restaurant, index) => (
        <View 
          key={index} 
          style={[styles.card, { backgroundColor: restaurant.color }]}
        >
          <Image 
            source={restaurant.image} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.cardContent}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.performanceMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{restaurant.reservations}</Text>
                <Text style={styles.metricLabel}>Reservations</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{restaurant.reviews}</Text>
                <Text style={styles.metricLabel}>Reviews</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{restaurant.rating}</Text>
                <Text style={styles.metricLabel}>Rating</Text>
              </View>
            </View>
            <Pressable style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
  },
  cardContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  metricLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  detailsButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RestaurantPerformance;
