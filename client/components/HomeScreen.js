import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

// SCREEN DIMENSIONS
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
  const { restaurants } = route.params;

  // HANDLE PRESS
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Restaurant', { restaurant });
  };


  return (
    <View style={styles.parent}>
      {/* TOP NAVIGATION SECTION */}
      <View style={styles.topNavigation}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.profileInitials}>OP</Text>
            </Pressable>
          </View>
          <View>
            <Text style={styles.greetingText}>Hello, Oscar</Text>
            <Text style={styles.subGreetingText}>Productivity Dashboard</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Notification')}>
            <Text style={styles.iconText}>🔔</Text>
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.iconText}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      {/* PRODUCTIVITY INSIGHTS */}
      <Pressable style={styles.insightsContainer}>
        <View style={styles.primaryInsightCard}>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>Weekly Productivity</Text>
            <Text style={styles.trendIcon}>📈</Text>
          </View>

          {/* MOCK CHART VISUALIZATION */}
          <View style={styles.chartContainer}>
            {[65, 59, 80, 81, 56].map((value, index) => (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  { height: value, backgroundColor: `rgba(52, 152, 219, ${value / 100})` }
                ]}
              />
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Tables reserved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>26h</Text>
              <Text style={styles.statLabel}>Worked</Text>
            </View>
          </View>
        </View>
      </Pressable>

      {/* SCROLLABLE RESTAURANT BOOKING SECTION */}
      <View style={styles.bookingSection}>

        {/* Fixed container for adding restaurants */}
        <View style={styles.addRestaurantContainer}>
          <Text style={styles.addRestaurantText}>Add a Restaurant</Text>
          {/* Add your logic for the "Add Restaurant" button here */}
        </View>

        {/* Scrollable restaurant list with 2 columns */}
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.restaurantScrollContainer}
        >
          <View style={styles.restaurantGrid}>
            {restaurants.map((restaurant, index) => (
              <Pressable
                key={index}
                style={[
                  styles.restaurantCard,
                  { backgroundColor: restaurant.color }, 
                ]}

                onPress={() => navigation.navigate('Restaurant', { restaurant })}
              >
                <View style={styles.restaurantImageContainer}>
                  <Image
                    source={restaurant.image}
                    style={styles.restaurantImage}
                    resizeMode="cover"
                  />
                  <View style={styles.restaurantImageOverlay} />
                </View>

                <View style={styles.restaurantDetailsOverlay}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantDescription}>
                    {restaurant.description}
                  </Text>
                  <Text style={styles.restaurantCuisine}>
                    {restaurant.cuisine} Cuisine
                  </Text>
                  <View style={styles.restaurantStats}>
                    <Text style={styles.availabilityText}>
                      {restaurant.tables} Tables Available
                    </Text>
                    
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent:
  {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },

  // TOP NAVIGATION STYLES
  topNavigation:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },

  profileContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImagePlaceholder:
  {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  profileInitials:
  {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  greetingText:
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  subGreetingText:
  {
    fontSize: 14,
    color: '#7f8c8d',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
  },

  iconButton:
  {
    padding: 10,
  },

  iconText:
  {
    fontSize: 20,
  },

  // PRODUCTIVITY INSIGHTS
  insightsContainer:
  {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  primaryInsightCard:
  {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  chartTitleContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  chartTitle:
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  trendIcon:
  {
    fontSize: 24,
  },

  chartContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 15,
  },

  chartBar:
  {
    width: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  statsContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  statItem:
  {
    alignItems: 'center',
  },

  statValue:
  {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  statLabel:
  {
    fontSize: 12,
    color: '#7f8c8d',
  },

  // RESTAURANT CARD STYLES
  bookingSection: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  addRestaurantContainer: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addRestaurantText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  restaurantScrollContainer: {
    paddingBottom: 20,
  },
  restaurantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstRestaurantCard: {
    marginTop: 10,
  },
  restaurantImageContainer: {
    width: '100%',
    height: 160,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  restaurantImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  restaurantDetailsOverlay: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 5,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  restaurantStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: '#555',
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HomeScreen;