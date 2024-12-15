import React, { useEffect, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// SCREEN DIMENSIONS
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { restaurants, loader, darkMode } = useContext(AuthContext);
  const count = restaurants.length; 
  const [userEmail, setUserEmail] = useState('');
  

  // GET THE USERNAME
  useEffect(() => {
    const fetchUserDeails = async()=>
      {
        const user = await AsyncStorage.getItem('userEmail');
        if (user) 
          {
          setUserEmail(user);
          }
      }

    fetchUserDeails();
  }, []);


  // GETTING THE INITIAL OF THE USER
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';


  return (
    <View style={[styles.parent, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>

      <StatusBar backgroundColor={darkMode ? '#333333' : '#f4f7fa'} />
      {/* TOP NAVIGATION SECTION */}
      <View style={styles.topNavigation}>
        <View style={styles.profileContainer}>
          <View style={[styles.profileImagePlaceholder, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Text style={[styles.profileInitials, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{firstLetter}</Text>
            </Pressable>
          </View>
          <View>
            <Text style={[styles.greetingText, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Hello, Oscar</Text>
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
      <Pressable style={styles.insightsContainer} onPress={() => navigation.navigate('RestaurantPerformance')}>
        <View style={[styles.primaryInsightCard, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
          <View style={styles.chartTitleContainer}>
            <Text style={[styles.chartTitle, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Weekly Productivity</Text>
            <Text style={styles.trendIcon}>📈</Text>
          </View>

          {/* MOCK CHART VISUALIZATION */}
          <View style={styles.chartContainer}>
            {[65, 59, 80, 81, 56, 70, 90].map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.chartBar,
                    { height: value, backgroundColor: `rgba(52, 152, 219, ${value / 100})` }
                  ]}
                />
                <Text style={[styles.barLabel, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>45</Text>
              <Text style={styles.statLabel}>Tables reserved</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{count || 0}</Text>
              <Text style={styles.statLabel}>Restaurants</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{count || 0}%</Text>
              <Text style={styles.statLabel}>Avg Performance</Text>
            </View>

          </View>
        </View>
      </Pressable>

      {/* SCROLLABLE RESTAURANT BOOKING SECTION */}
      <View style={styles.bookingSection}>

        <Pressable style={[styles.addRestaurantContainer, { backgroundColor: darkMode ? '#444' : '#ffffff' }]} onPress={() => navigation.navigate('RestaurantFormScreen')}>
          <Text style={[styles.addRestaurantText, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Add a Restaurant</Text>
        </Pressable>

        {loader ? 
        <View style={styles.restaurantLoaderContainer}>
          <ActivityIndicator size={'large'} color={'#333'} />
          <Text style={styles.LoaderText}>Loading restaurants</Text>
        </View>
        
        :
            
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.restaurantScrollContainer}
        >
          <View style={styles.restaurantGrid}>
            {Array.isArray(restaurants) && restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
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
                      source={{ uri: restaurant.image }}
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

                    <View style={[styles.bottomColor, {backgroundColor: restaurant.color}]}/>
                    
                  </View>
                </Pressable>
              ))
            ) : (
              <View style={styles.emptyTextCont}>
                <Text style={styles.emptyText}>No restaurants available.</Text>
              </View>
            )}
          </View>


        </ScrollView>

        }

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
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },

  profileContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImagePlaceholder:
  {
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#f5f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  profileInitials:
  {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 28,
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
    marginBottom: 20,
  },

  primaryInsightCard:
  {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%'
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

  barContainer: {
    alignItems: 'center',
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
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
  bookingSection: 
  {
    flex: 1,
    padding: 10,
  },

  addRestaurantContainer: 
  {
    marginBottom: 20,
    padding: 15,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    gap: 4
  },

  addRestaurantText: 
  {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
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

  firstRestaurantCard: 
  {
    marginTop: 10,
  },

  restaurantImageContainer: 
  {
    width: '100%',
    height: 160,
  },

  restaurantImage: 
  {
    width: '100%',
    height: '100%',
  },

  restaurantImageOverlay: 
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  restaurantDetailsOverlay: 
  {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position :'relative'
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

  emptyTextCont:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250
  },

  emptyText:
  {
    fontSize: 24,
    letterSpacing: 2
  },

  bottomColor:
  {
     position :'absolute',
     bottom: 0,
     width: 300,
     height: 6,
     borderBottomRightRadius: 12,
     borderBottomLeftRadius: 12,
  },

  restaurantLoaderContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    gap: 20
  },

  LoaderText:
  {
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2
  }
});

export default HomeScreen;