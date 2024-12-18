import React, { useState, useMemo, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  Animated,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AuthContext from '../AuthContext';

// ICONS
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = ({navigation}) => {

  const { loader, darkMode, reservations, restaurants } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Memoized filtered reservations
  const filteredReservations = useMemo(() => {
    return activeFilter === 'Active'
      ? reservations.filter(reservation => reservation.isActive)
      : reservations;
  }, [activeFilter]);

  // Refresh control handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
        <View style={[
          styles.reservationCard,
          !reservation.isActive && styles.inactiveReservation
        ]}>
          <View style={styles.reservationContentContainer}>
            <View style={styles.reservationTextContainer}>
              <Text style={styles.reservationText}>
                {reservation.restaurantName} - {formatDate(reservation.dateOfPayment)}
              </Text>
              <Text style={styles.reservationDetailsText}>
                Tables: {reservation.numberOfTables} | Amount: R{reservation.amount}
              </Text>
              <Text style={styles.reservationDetailsText}>
                {reservation.message}
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
    <SafeAreaView style={[styles.parent, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
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
      <Text style={[styles.sectionTitle, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}]}>
        Restaurants
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {restaurants.map((restaurant, index) => (
          <Pressable 
            key={index} 
            style={[styles.restaurantCard, {backgroundColor: restaurant.color}]}
            onPress={() => navigation.navigate('RestaurantReservations', { restaurant })}
          >
            <View style={[
              styles.restaurantCardOverlay,
              { backgroundColor: darkMode ? 'rgba(0, 0, 0, .9)' : 'rgba(255, 255, 255, .9)' }
            ]}>
              <Text style={[
                styles.restaurantName,
                {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}
              ]}>
                {restaurant.name}
              </Text>
              {restaurant.cuisine && (
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Reservations Section */}
      <Text style={[
        styles.sectionTitle,
        {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}
      ]}>
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
            <ReservationItem key={reservation._id} reservation={reservation} />
          ))}
          {filteredReservations.length === 0 && (
            <Text style={styles.noReservationsText}>No reservations found</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f4f7fa',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 10,
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: '#2ecc71',
    fontWeight: '600',
    letterSpacing: 1
  },
  activeFilterButtonText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginVertical: 10,
    paddingHorizontal: 20,
    letterSpacing: 1
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    height: 120,
  },
  restaurantCard: {
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
  restaurantCardOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  reservationsListParent: {
    justifyContent: 'flex-start',
    height: '55%'
  },
  reservationsList: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },
  reservationCard: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },
  inactiveReservation: {
    opacity: 0.5,
  },
  reservationContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  reservationTextContainer: {
    flex: 1,
  },
  reservationText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  reservationDetailsText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
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
  swipeActionContainer: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: 60,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default NotificationsScreen;