import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';


const reservations = [
  { 
    id: 1,
    restaurant: "Foodies' Delight",
    date: "Dec 15, 2024",
    time: "7:30 PM",
    guests: 2,
    status: "Active",
    picture: require('../assets/foodies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Window seat preferred, vegetarian options",
    totalCost: "$120.50" 
  },

  {
    id: 2,
    restaurant: "Foodies' Delight",
    date: "Dec 22, 2024",
    time: "6:45 PM", 
    guests: 4,
    status: "Complted",
    picture: require('../assets/foodies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Birthday celebration, need a cake",
    totalCost: "$240.75"
  },
  {
    id: 3,
    restaurant: "Foodies' Delight",
    date: "Dec 22, 2024",
    time: "6:45 PM", 
    guests: 4,
    status: "Complted",
    picture: require('../assets/foodies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "High chair needed for baby",
    totalCost: "$240.75"
  },
  {
    id: 4,
    restaurant: "Foodies' Delight",
    date: "Dec 22, 2024",
    time: "6:45 PM", 
    guests: 4,
    status: "Complted",
    picture: require('../assets/foodies.jpg'),
    address: "123 Gourmet Street, Culinary City",
    contactNumber: "+1 (555) 123-4567",
    specialRequests: "Allergic to nuts, please be careful",
    totalCost: "$240.75"
  },
];

const PlaceholderImage = 'https://via.placeholder.com/150?text=Restaurant+Photo';

const ReservationScreen = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Render individual reservation item
  const renderReservationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reservationItem}
      onPress={() => setSelectedReservation(item)}
    >
      <Image source={item.picture || { uri: PlaceholderImage }} style={styles.reservationImage} />
      <View style={styles.reservationDetails}>
        <Text style={styles.restaurantText}>{item.restaurant}</Text>
        <Text style={styles.reservationInfo}>{item.date} at {item.time}</Text>
        <Text style={styles.reservationInfo}>Guests: {item.guests}</Text>
        <Text style={[
          styles.statusBadge, 
          item.status === 'Active' ? styles.confirmedBadge : styles.pendingBadge
        ]}>{item.status}</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setSelectedReservation(null)}
            >
              <Text style={styles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            {/* Restaurant Image */}
            <Image 
              source={selectedReservation.picture || { uri: PlaceholderImage }}
              style={styles.modalImage}
            />

            {/* Reservation Details */}
            <Text style={styles.modalRestaurantName}>{selectedReservation.restaurant}</Text>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Date</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.date}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Time</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.time}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Guests</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.guests}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Address</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.address}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Contact</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.contactNumber}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Special Requests</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.specialRequests}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Total Cost</Text>
              <Text style={styles.modalDetailValue}>{selectedReservation.totalCost}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Status</Text>
              <Text style={[
                styles.statusBadge,
                selectedReservation.status === 'Confirmed' ? styles.confirmedBadge : styles.pendingBadge
              ]}>{selectedReservation.status}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reservations</Text>
      </View>

      {/* Reservation List */}
      <FlatList
        data={reservations}
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingVertical: 10,
  },
  reservationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reservationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  reservationDetails: {
    flex: 1,
  },
  restaurantText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reservationInfo: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  confirmedBadge: {
    backgroundColor: '#e6f2e6',
    color: '#2d862d',
  },
  pendingBadge: {
    backgroundColor: '#f2e6e6',
    color: '#862d2d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 20,
    color: '#333',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  modalRestaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalDetailContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  modalDetailLabel: {
    fontSize: 16,
    color: '#666',
  },
  modalDetailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReservationScreen;
