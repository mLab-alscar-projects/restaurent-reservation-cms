import React, { useState, useMemo, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';

import AuthContext from '../AuthContext';


const NotificationsScreen = () => {
  // State management
  const [activeFilter, setActiveFilter] = useState('All');
  const { restaurants, loader, darkMode } = useContext(AuthContext);



  const reservations = [
    { id: 1, restaurant: "Eat'in", time: '12:00 PM', isActive: true },
    { id: 2, restaurant: "Foodies' Delight", time: '1:30 PM', isActive: false },
    { id: 3, restaurant: 'Munchies', time: '6:00 PM', isActive: true },
  ];

  // Memoized filtered reservations
  const filteredReservations = useMemo(() => {
    return activeFilter === 'Active'
      ? reservations.filter(reservation => reservation.isActive)
      : reservations;
  }, [activeFilter]);

  return (
    <View style={styles.parent}>
      <StatusBar 
        backgroundColor={'#3498db'}
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
      <Text style={styles.sectionTitle}>Restaurants</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}>
        {restaurants.map((restaurant) => (
          <Pressable 
            key={restaurant.id} 
            style={[styles.restaurantCard, {backgroundColor: restaurant.color}]}
          >
            <View style={[styles.restaurantCardOverlay,{backgroundColor: 'rgba(255, 255, 255, .9)'}]}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              {restaurant.cuisine && (
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Reservations Section */}
      <Text style={styles.sectionTitle}>
        {activeFilter === 'Active' ? 'Active Reservations' : 'All Reservations'}
      </Text>
      <ScrollView contentContainerStyle={styles.reservationsList}>
        {filteredReservations.map((reservation) => (
          <View 
            key={reservation.id} 
            style={[
              styles.reservationCard,
              !reservation.isActive && styles.inactiveReservation
            ]}
          >
            <View style={styles.reservationContentContainer}>
              <Text style={styles.reservationText}>
                {reservation.restaurant} - {reservation.time}
              </Text>
              {reservation.isActive && (
                <View style={styles.activeStatusBadge}>
                  <Text style={styles.activeStatusText}>Active</Text>
                </View>
              )}
            </View>
          </View>
        ))}
        {filteredReservations.length === 0 && (
          <Text style={styles.noReservationsText}>No reservations found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: 
  {
    // flex: 1,
    backgroundColor: '#f4f7fa',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20
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
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },

  activeFilterButton: 
  {
    backgroundColor: '#3498db',
  },

  filterButtonText: 
  {
    color: '#2c3e50',
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

  reservationsList: 
  {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingVertical: 25
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
    elevation: 5,
  },

  inactiveReservation: 
  {
    opacity: 0.6,
  },

  reservationContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  reservationText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  activeStatusBadge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activeStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  noReservationsText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NotificationsScreen;