import React, { useState, useMemo, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import AuthContext from '../AuthContext';

const NotificationsScreen = ({navigation}) => {
  // State management
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const { restaurants, loader, darkMode } = useContext(AuthContext);

  const reservations = [
    { id: 1, restaurant: "Eat'in", time: '12:00 PM', isActive: true, details: 'Table for 2' },
    { id: 2, restaurant: "Foodies' Delight", time: '1:30 PM', isActive: false, details: 'Canceled' },
    { id: 3, restaurant: 'Munchies', time: '6:00 PM', isActive: true, details: 'Outdoor seating' },
    { id: 4, restaurant: 'The Grill House', time: '7:00 PM', isActive: true, details: 'Birthday celebration' },
    { id: 5, restaurant: 'Vegan Bites', time: '5:00 PM', isActive: false, details: 'Postponed' },
    { id: 6, restaurant: 'Ocean Breeze', time: '8:30 PM', isActive: true, details: 'Romantic dinner' },
    { id: 7, restaurant: 'Pasta Paradise', time: '1:00 PM', isActive: false, details: 'Lunch meeting' },
    { id: 8, restaurant: 'Sushi World', time: '3:30 PM', isActive: true, details: 'Special chef tasting' },
    { id: 9, restaurant: 'Taco Fiesta', time: '11:00 AM', isActive: true, details: 'Group lunch' },
    { id: 10, restaurant: 'Burger Haven', time: '9:00 PM', isActive: false, details: 'Rescheduled' },
  ];

  // Memoized filtered reservations
  const filteredReservations = useMemo(() => {
    return activeFilter === 'Active'
      ? reservations.filter(reservation => reservation.isActive)
      : reservations;
  }, [activeFilter]);

  // Refresh control handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Swipeable reservation item
  const ReservationItem = ({ reservation }) => {
    const renderRightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <View style={styles.swipeActionContainer}>
          <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </Animated.View>
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View 
          key={reservation.id} 
          style={[
            styles.reservationCard,
            !reservation.isActive && styles.inactiveReservation
          ]}
        >
          <View style={styles.reservationContentContainer}>
            <View style={styles.reservationTextContainer}>
              <Text style={styles.reservationText}>
                {reservation.restaurant} - {reservation.time}
              </Text>
              <Text style={styles.reservationDetailsText}>
                {reservation.details}
              </Text>
            </View>
            {reservation.isActive && (
              <View style={styles.activeStatusBadge}>
                <Text style={styles.activeStatusText}>Active</Text>
              </View>
            )}
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={[styles.parent, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
      <StatusBar 
        backgroundColor={'#3498db'}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      {/* Filter Toggle */}
      <View style={styles.filterContainer}>
        <Pressable 
          onPress={() => setActiveFilter('All')}
          style={[
            styles.filterButton, 
            activeFilter === 'All' && styles.activeFilterButton
          ]}
        >
          <Text style={[
            styles.filterButtonText, 
            activeFilter === 'All' && styles.activeFilterButtonText
          ]}>
            All Reservations
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveFilter('Active')}
          style={[
            styles.filterButton, 
            activeFilter === 'Active' && styles.activeFilterButton
          ]}
        >
          <Text style={[
            styles.filterButtonText, 
            activeFilter === 'Active' && styles.activeFilterButtonText
          ]}>
            Active Only
          </Text>
        </Pressable>
      </View>

      {/* Restaurants Section */}
      <Text style={[styles.sectionTitle, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}]}>Restaurants</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}>
        {restaurants.map((restaurant, index) => (
          <Pressable 
            key={index} 
            style={[styles.restaurantCard, {backgroundColor: restaurant.color}]}
            onPress={()=> navigation.navigate('ReservationsScreen', { restaurant })}
          >
            <View style={[styles.restaurantCardOverlay,{ backgroundColor: darkMode ? 'rgba(0, 0, 0, .9)' : 'rgba(255, 255, 255, .9)' }]}>
              <Text style={[styles.restaurantName, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}]}>{restaurant.name}</Text>
              {restaurant.cuisine && (
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Reservations Section */}
      <Text style={[styles.sectionTitle, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}]}>
        {activeFilter === 'Active' ? 'Active Reservations' : 'All Reservations'}
      </Text>

      <View style={styles.reservationsListParent}>
        <ScrollView 
          contentContainerStyle={styles.reservationsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3498db']}
              tintColor={darkMode ? 'white' : '#3498db'}
            />
          }
        >
          {filteredReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
          {filteredReservations.length === 0 && (
            <Text style={styles.noReservationsText}>No reservations found</Text>
          )}
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  filterContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  filterButton: 
  {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 10,
  },

  activeFilterButton: 
  {
    backgroundColor: '#3498db',
  },

  filterButtonText: 
  {
    color: '#2ecc71',
    fontWeight: '600',
    letterSpacing: 1
  },

  activeFilterButtonText: 
  {
    color: 'white',
  },

  sectionTitle: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginVertical: 10,
    paddingHorizontal: 20,
    letterSpacing: 1
  },

  horizontalScroll: 
  {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    height: 120,
  },

  restaurantCard: 
  {
    width: 150,
    height: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    paddingRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  restaurantCardOverlay: 
  {
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  restaurantName: 
  {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },

  restaurantCuisine: 
  {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },

  reservationsListParent: 
  {
    justifyContent: 'flex-start',
    height: '55%'
  },

  reservationsList: 
  {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },

  reservationCard: 
  {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },

  inactiveReservation: 
  {
    opacity: 0.5,
  },

  reservationContentContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  reservationText: 
  {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },

  activeStatusBadge: 
  {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  activeStatusText: 
  {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  noReservationsText: 
  {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },

  // SWIPE TO DELETE
  swipeActionContainer: 
  {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  deleteButton: 
  {
    backgroundColor: '#e74c3c',
    width: 60,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  
  reservationTextContainer: 
  {
    flex: 1,
  },
  
  reservationDetailsText: 
  {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default NotificationsScreen;