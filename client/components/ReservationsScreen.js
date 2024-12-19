import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
  Pressable
} from 'react-native';

import AuthContext from '../AuthContext';

// ICONS
import { Ionicons } from '@expo/vector-icons';


const ReservationScreen = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { loader, darkMode, reservations } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter reservations based on active status
  const filteredReservations = filter === 'All' 
    ? reservations 
    : reservations.filter(reservation => {
        if (filter === 'Active') return reservation.isActive;
        return !reservation.isActive;
      });

  // Render individual reservation item
  const renderReservationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reservationItem}
      onPress={() => setSelectedReservation(item)}
    >
      <View style={styles.reservationDetails}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.reservationInfo}>{formatDate(item.dateOfPayment)}</Text>
        <Text style={styles.reservationInfo}>Time: {item.timeslot}</Text>
        <Text style={styles.reservationInfo}>Tables: {item.numberOfTables}</Text>
        <View style={[
          styles.statusBadge, 
          item.isActive ? styles.activeBadge : styles.inactiveBadge
        ]}>
          <Text style={[
            styles.statusText,
            item.isActive ? styles.activeText : styles.inactiveText
          ]}>
            {item.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
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
                <Text style={[
                  styles.detailValue,
                  { color: selectedReservation.isActive ? '#4CAF50' : '#FF9800' }
                ]}>
                  {selectedReservation.isActive ? 'Coming up' : 'completed'}
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3498db'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Reservations</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Active', 'Inactive'].map((status) => (
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
        keyExtractor={(item) => item._id}
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
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
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
    padding: 15,
  },
  reservationItem: {
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
  reservationDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  reservationInfo: {
    color: '#666',
    marginBottom: 3,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
  },
  inactiveBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#4CAF50',
  },
  inactiveText: {
    color: '#FF9800',
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

  // MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalBackButton: {
    marginRight: 15,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  modalContent: {
    paddingBottom: 20,
  },
  detailSection: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    flex: 2,
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },

  updateButton:
  {
    width: '92%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#3498db',
  },

  updateButtonText:
  {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#333',
    fontWeight: 900,
    letterSpacing: 1
  }
});

export default ReservationScreen;