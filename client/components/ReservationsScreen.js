import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Dimensions, 
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const ReservationsScreen = () => {
  const [activeFilter, setActiveFilter] = useState('Upcoming');
  const filters = ['Upcoming', 'Past', 'Canceled'];

  const reservations = [
    {
      id: 1,
      restaurant: "Foodies' Delight",
      date: "Dec 15, 2024",
      time: "7:30 PM",
      guests: 2,
      status: "Confirmed",
      imageUri: require('../assets/burger.jpg')
    },
    {
      id: 2,
      restaurant: "Foodies' Delight",
      date: "Dec 22, 2024",
      time: "6:45 PM", 
      guests: 4,
      status: "Pending",
      imageUri: require('../assets/burger.jpg')
    },
    // ... other reservations
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1e3c72', '#2ecc71']}
        style={styles.headerBackground}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Foodies' Delight Reservations</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((filter) => (
            <Pressable 
              key={filter}
              style={[
                styles.filterButton, 
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterButtonText, 
                activeFilter === filter && styles.activeFilterButtonText
              ]}>
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView 
        style={styles.reservationListContainer}
        showsVerticalScrollIndicator={false}
      >
        {reservations.map((reservation, index) => (
          <View key={index} style={styles.reservationCard}>
            <Image 
              source={reservation.imageUri} 
              style={styles.restaurantImage} 
              blurRadius={2}
            />
            <BlurView intensity={50} style={styles.reservationOverlay}>
              <View style={styles.reservationDetails}>
                <Text style={styles.restaurantName}>{reservation.restaurant}</Text>
                <View style={styles.reservationInfo}>
                  <Text style={styles.reservationText}>
                    {reservation.date} • {reservation.time}
                  </Text>
                  <Text style={styles.reservationText}>
                    {reservation.guests} Guests
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={[
                    styles.statusText, 
                    reservation.status === 'Confirmed' 
                      ? styles.confirmedStatus 
                      : styles.pendingStatus
                  ]}>
                    {reservation.status}
                  </Text>
                </View>
              </View>
              <View style={styles.reservationActions}>
                <Pressable style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </Pressable>
              </View>
            </BlurView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  headerBackground: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },

  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '31%',

  },
  activeFilterButton: {
    backgroundColor: 'white',
  },
  filterButtonText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textAlign: 'center'
  },
  activeFilterButtonText: {
    color: '#1e3c72',
  },
  reservationListContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  reservationCard: {
    height: 250,
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  restaurantImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  reservationOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  reservationDetails: {
    alignItems: 'flex-start',
  },
  restaurantName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  reservationInfo: {
    marginBottom: 15,
  },
  reservationText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statusContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  confirmedStatus: {
    color: '#2ecc71',
  },
  pendingStatus: {
    color: '#f39c12',
  },
  reservationActions: {
    alignItems: 'flex-end',
  },
  detailsButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailsButtonText: {
    color: '#1e3c72',
    fontWeight: '700',
  },
});

export default ReservationsScreen;