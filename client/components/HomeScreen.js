import React, { useEffect, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import AuthContext from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ICONS
import { Ionicons, Octicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { restaurants, loader, darkMode, reservations } = useContext(AuthContext);
  const [user, setUser] = useState('');


  // CALCULATIONS
  const count = restaurants.length; 
  const countReservations = reservations.length;
  const percentage = countReservations > 0 ? (count / countReservations) * 100: 0;
  const formattedPercentage = percentage.toFixed(1);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const unreadCount = reservations.filter(reservation => !reservation.isRead).length;
    setNotificationCount(unreadCount);
  }, [reservations]);
  

  // GET THE USER
  useEffect(() => {
    const fetchUserDeails = async()=>
      {
        const user = await AsyncStorage.getItem('userData');
        if (user) 
          {
            const userData = JSON.parse(user);
            setUser(userData);
          }
      }

    fetchUserDeails();
  }, []);


  // GETTING THE INITIAL OF THE USER
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '';
  const userFirstName = user?.name || ""; 
  const firstName = userFirstName.split(' ')[0];


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
            <Text style={[styles.greetingText, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Hello, {firstName}</Text>
            <Text style={[styles.subGreetingText, {color: darkMode ? '#rgba(255, 255, 255, .7)' : '#7f8c8d'}]}>Productivity Dashboard</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Notification')}>
            <Octicons name="bell-fill" size={27} color={'rgba(255, 175, 3, 0.97)'} />
            <Text style={[styles.notificationNUmber, {color: darkMode ? '#rgba(255, 255, 255, .7)' : '#7f8c8d'}]}>{notificationCount}</Text>
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={28} color={darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'} />
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
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{countReservations || 0}</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#rgba(255, 255, 255, .7)' : '#7f8c8d'}]}>Tables reserved</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{count || 0}</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#rgba(255, 255, 255, .7)' : '#7f8c8d'}]}>Restaurants</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{formattedPercentage || 0}%</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#rgba(255, 255, 255, .7)' : '#7f8c8d'}]}>Avg Performance</Text>
            </View>

          </View>
        </View>
      </Pressable>

      {/* SCROLLABLE RESTAURANT BOOKING SECTION */}
      <View style={styles.bookingSection}>

        <Pressable style={[styles.addRestaurantContainer, { backgroundColor: darkMode ? '#444' : '#ffffff' }]} onPress={() => navigation.navigate('RestaurantFormScreen')}>
          <Text style={[styles.addRestaurantText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>Add a Restaurant</Text>
        </Pressable>

        {loader ? 
        <View style={styles.restaurantLoaderContainer}>
          <ActivityIndicator size={'large'} color={darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'} />
          <Text style={[styles.LoaderText, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Loading ...</Text>
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
                    {
                      backgroundColor: restaurant.isActive
                        ? restaurant.color 
                        : 'black', 
                    },
                  ]}
                  onPress={() => navigation.navigate('Restaurant', { restaurant })}
                >
                  <View style={styles.restaurantImageContainer}>
                    <Image
                      source={{ uri: restaurant.image }}
                      style={styles.restaurantImage}
                      resizeMode="cover"
                    />

                    {!restaurant.isActive && (
                      <Text style={styles.inactiveRestaurantOverlay}>NOT ACTIVE</Text>
                    )}
                    <View style={[styles.restaurantImageOverlay, { backgroundColor: restaurant.isActive ? 'rgba(0, 0, 0, 0.3)' : 'black' }]} />
                  </View>

                  <View style={[styles.restaurantDetailsOverlay, { backgroundColor: restaurant.isActive ? 'rgba(255, 255, 255, 0.8)' : 'black' }]}>
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
    paddingRight: 10,
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
    width: 50,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f5f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
    letterSpacing: 1
  },

  subGreetingText:
  {
    fontSize: 14,
  },

  iconContainer: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  iconButton:
  {
    padding: 10,
  },

  notificationNUmber:
  {
    top: -7,
    right: 5,
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 12,
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
  },

  statLabel:
  {
    fontSize: 12,
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
    letterSpacing: 1
  },

  inactiveRestaurantOverlay:
  {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    letterSpacing: 1,
    color: 'red',
    zIndex: 1,
    alignSelf: 'center'
  }
});

export default HomeScreen;
