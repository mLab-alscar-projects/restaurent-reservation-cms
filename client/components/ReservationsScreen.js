import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const reservations = [
  { 
    id: 1,
    restaurant: "Foodies' Delight",
    date: "Dec 15, 2024",
    time: "7:30 PM",
    guests: 2,
    status: "Upcoming",
    picture: require('../assets/foodies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Window seat preferred",
    totalCost: "$120.50" 
  },
  {
    id: 2,
    restaurant: "Foodies' Delight",
    date: "Dec 22, 2024",
    time: "6:45 PM", 
    guests: 4,
    status: "Completed",
    picture: require('../assets/munchies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Birthday celebration",
    totalCost: "$240.75"
  },
  {
    id: 3,
    restaurant: "Foodies' Delight",
    date: "Dec 22, 2024",
    time: "6:45 PM", 
    guests: 4,
    status: "Completed",
    picture: require('../assets/eatin.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Birthday celebration",
    totalCost: "$240.75"
  },
];

const PlaceholderImage = 'https://via.placeholder.com/150?text=Restaurant+Photo';

const ReservationScreen = ({route}) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filter, setFilter] = useState('All');
  const { restaurant } = route.params;


  // Filter reservations based on selected status
  const filteredReservations = filter === 'All' 
    ? reservations 
    : reservations.filter(reservation => {
        if (filter === 'Upcoming') return reservation.status === 'Upcoming';
        if (filter === 'Completed') return reservation.status === 'Completed';
        return true;
      });

  // Render individual reservation item
  const renderReservationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reservationItem}
      onPress={() => setSelectedReservation(item)}
    >
      <Image 
        source={item.picture || { uri: PlaceholderImage }} 
        style={styles.reservationImage} 
      />
      <View style={styles.reservationDetails}>
        <Text style={styles.restaurantText}>{item.restaurant}</Text>
        <Text style={styles.reservationInfo}>{item.date} at {item.time}</Text>
        <Text style={styles.reservationInfo}>Guests: {item.guests}</Text>
      </View>
    </TouchableOpacity>
  );

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
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Reservation Details</Text>
          </View>

          <View 
            style={[styles.modalContent, ]}
            contentContainerStyle={styles.modalContentContainer}
       
          >
            {/* Restaurant Image */}
            <View style={styles.profileImageContainer}>
              <Image 
                source={selectedReservation.picture || { uri: PlaceholderImage }}
                style={styles.profileImage}
              />
            </View>

            {/* Restaurant Name */}
            <Text style={styles.profileName}>{selectedReservation.restaurant}</Text>

            {/* Detail Sections */}
            <View style={styles.profileSection}>
              <View style={styles.profileSectionContent}>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="calendar" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Date</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.date}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="time" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Time</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.time}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="people" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Guests</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.guests}</Text>
                </View>
              </View>
            </View>

            {/* Additional Details Section */}
            <View style={styles.profileSection}>
              <Text style={styles.profileSectionTitle}>Reservation Info</Text>
              <View style={styles.profileSectionContent}>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="location" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Address</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.address}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="call" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Contact</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.contactNumber}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="document-text" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Special Requests</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.specialRequests}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Ionicons name="cash" size={20} color="#007AFF" />
                  <Text style={styles.profileDetailLabel}>Total Cost</Text>
                  <Text style={styles.profileDetailValue}>{selectedReservation.totalCost}</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{restaurant.name} reservations</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Upcoming', 'Completed'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilterButton
            ]}
            onPress={() => setFilter(status)}
          >
            <Text style={[
              styles.filterButtonText,
              filter === status && styles.activeFilterButtonText
            ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reservation List */}
      <FlatList
        data={filteredReservations}
        renderItem={renderReservationItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reservations found</Text>
          </View>
        }
      />

      {/* Reservation Details Modal */}
      <ReservationDetailsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  headerText: 
  {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  reservationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reservationImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  reservationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  reservationInfo: {
    color: '#666',
    marginBottom: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#d3ddda',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#3498db',
  },
  modalBackButton: {
    marginRight: 15,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    paddingBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    height: 300,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profileSection: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1
  },
  profileSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    padding: 15,
    paddingBottom: 0,
  },
  profileSectionContent: {
    padding: 15,
  },
  profileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileDetailLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  profileDetailValue: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
});

export default ReservationScreen;