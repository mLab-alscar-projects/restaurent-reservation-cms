import React, { useState, useMemo, useContext } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  Animated,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';

// STORAGE
import AuthContext from '../AuthContext';

// ICONS
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ReservationsStyle';

const NotificationsScreen = ({ navigation }) => {

  const { darkMode, reservations, restaurants, markAsRead,fetchReservations } = useContext(AuthContext);

  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // MARK AS READ
  const handleMarkAsRead = async (reservation) => {
    if (!reservation.isRead) {
      try {
        await markAsRead(reservation);
      } catch (error) {
        console.error('Error marking as read:', error.message);
      }
    }
  };

  // FILTERED RESERVATIONS
  const filteredReservations = useMemo(() => {
    return activeFilter === 'Active'
      ? reservations.filter((reservation) => !reservation.isRead)
      : reservations;
  }, [reservations, activeFilter]);

  // REFRESH CONTROL
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchReservations();
    } catch (error) {
      console.error('Error refreshing reservations:', error.message);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const ReservationItem = ({ reservation }) => {
    const renderRightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <Pressable style={styles.swipeActionContainer} onPress={() => handleMarkAsRead(reservation)}>
          <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
            <Ionicons name="mail-unread-outline" size={25} color="#333" />
          </Animated.View>
        </Pressable>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          style={[
            styles.reservationCard,
            reservation.isRead && styles.inactiveReservation,
          ]}
          onPress={() => 
            {
              setSelectedReservation(reservation);
              handleMarkAsRead(reservation);
            }
          }
        >
          <View style={styles.reservationContentContainer}>
            <View style={styles.reservationTextContainer}>
              <Text style={styles.reservationText}>
                {reservation.restaurantName} - {formatDate(reservation.dateOfPayment)}
              </Text>
              <Text style={styles.reservationDetailsText}>
                Tables: {reservation.numberOfTables} | Amount: R{reservation.amount}
              </Text>
              <Text style={styles.reservationDetailsText}>{reservation.message}</Text>
            </View>
            {reservation.isActive && (
              <View style={styles.activeStatusBadge}>
                <Text style={styles.activeStatusText}>Active</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  // Reservation Details Modal
  const ReservationDetailsModal = () => {
    if (!selectedReservation) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedReservation}
        onRequestClose={() => setSelectedReservation(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setSelectedReservation(null)}
              style={styles.modalBackButton}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Reservation Details</Text>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {/* Restaurant Details */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Restaurant Information</Text>
              <View style={styles.detailRow}>
                <Ionicons name="restaurant" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Restaurant</Text>
                <Text style={styles.detailValue}>{selectedReservation.restaurantName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{selectedReservation.location}</Text>
              </View>
            </View>

            {/* Booking Details */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Booking Details</Text>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>
                  {formatDate(selectedReservation.dateOfPayment)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{selectedReservation.timeslot}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="grid" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Tables</Text>
                <Text style={styles.detailValue}>{selectedReservation.numberOfTables}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="cash" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>R{selectedReservation.amount}</Text>
              </View>
            </View>

            {/* Contact Information */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.detailRow}>
                <Ionicons name="person" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{selectedReservation.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="mail" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{selectedReservation.email}</Text>
              </View>
            </View>

            {/* Booking Reference */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Booking Reference</Text>
              <View style={styles.detailRow}>
                <Ionicons name="document-text" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Ref ID</Text>
                <Text style={styles.detailValue}>{selectedReservation._id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="information-circle" size={20} color="#007AFF" />
                <Text style={styles.detailLabel}>Status</Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: selectedReservation.isActive ? '#4CAF50' : '#FF9800' },
                  ]}
                >
                  {selectedReservation.isActive ? 'Coming up' : 'Completed'}
                </Text>
              </View>
            </View>
            <Pressable style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update stats</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.parent, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
      <StatusBar
        backgroundColor={'#3498db'}
      />

      {/* Filter Toggle */}
      <View style={styles.filterContainer}>
        <Pressable
          onPress={() => setActiveFilter('All')}
          style={[
            styles.filterButton,
            activeFilter === 'All' && styles.activeFilterButton,
          ]}
        >
          <Text
            style={[
              styles.filterButtonText,
              activeFilter === 'All' && styles.activeFilterButtonText,
            ]}
          >
            All Reservations
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveFilter('Active')}
          style={[
            styles.filterButton,
            activeFilter === 'Active' && styles.activeFilterButton,
          ]}
        >
          <Text
            style={[
              styles.filterButtonText,
              activeFilter === 'Active' && styles.activeFilterButtonText,
            ]}
          >
            Unread 
          </Text>
        </Pressable>
      </View>

      {/* Restaurants Section */}
      <Text
        style={[
          styles.sectionTitleText,
          { color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)' },
        ]}
      >
        Restaurants Reservations
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {restaurants.map((restaurant, index) => (
          <Pressable
            key={index}
            style={[styles.restaurantCard, { backgroundColor: restaurant.color }]}
            onPress={() => navigation.navigate('RestaurantReservations', { restaurant })}
          >
            <View
              style={[
                styles.restaurantCardOverlay,
                { backgroundColor: darkMode ? 'rgba(0, 0, 0, .9)' : 'rgba(255, 255, 255, .9)' },
              ]}
            >
              <Text
                style={[
                  styles.restaurantName,
                  { color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)' },
                ]}
              >
                {restaurant.name}
              </Text>
              {restaurant.cuisine && <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Reservations Section */}
      <Text
        style={[
          styles.sectionTitleText,
          { color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)' },
        ]}
      >
        Reservations Notifications
      </Text>
      <View style={[styles.reservationsListParent]}>
      <ScrollView
        contentContainerStyle={styles.reservationsList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredReservations.map((reservation, index) => (
          <ReservationItem key={index} reservation={reservation} />
        ))}
      </ScrollView>
      </View>

      {/* Reservation Details Modal */}
      <ReservationDetailsModal />
    </SafeAreaView>
  );
};



export default NotificationsScreen;