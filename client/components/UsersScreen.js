import React, { useState, useMemo, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native';

import AuthContext from '../AuthContext';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require('../assets/admin.jpg');

const UsersScreen = () => {

  const { darkMode } = useContext(AuthContext);

  const {users, fetchUsers} = useContext(AuthContext);

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userReservation, setUserReservation] = useState([]);
  const numberOfReservations = userReservation.length || 0;


  // FETCH RESERVATIONS BASED ON RESTAURANT ID
  useEffect(() => {
    const fetchRestaurantReservations = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        
        if (selectedUser){
            const response = await axios.get(
              `https://lumpy-clover-production.up.railway.app/api/user-reservations/${selectedUser.id}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
  
            setUserReservation(response.data);
            return response
        }
        
  
      } catch (error) {
        console.error('Error fetching restaurant reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantReservations();
  }, [selectedUser]);

  // FILTER BASED ON THE STATUS
  const filteredUsers = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter(user => user.status === filter);
  }, [users, filter]);

  // USER COUNT STATS
  const userStats = useMemo(() => ({
    all: users.length,
    active: users.filter(user => user.status === 'active').length,
    burned: users.filter(user => user.status !== 'active').length
  }), [users]);

  // RENDER USER
  const renderUserItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.userItem, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}
      onPress={() => setSelectedUser(item)}
    >
      <Text style={[styles.emailText, {color: darkMode ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)'}]}>{item.email}</Text>
      <View 
        style={[
          styles.statusBadge, 
          item.status === 'active' ? styles.activeBadge : styles.burnedBadge, 
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render filter button
  const FilterButton = ({ status, label }) => (
    <TouchableOpacity 
      style={[
        styles.filterButton, 
        filter === status && styles.activeFilterButton,
        { backgroundColor: darkMode ? 'rgba(255, 255, 255, .3)' : 'rgba(0, 0, 0, .3)' }
      ]}
      onPress={() => setFilter(status)}
    >
      <Text 
        style={[
          styles.filterButtonText, 
          filter === status && styles.activeFilterButtonText
        ]}
      >
        {label} ({userStats[status]})
      </Text>
    </TouchableOpacity>
  );

  // User Details Modal
  const UserDetailsModal = () => {
    if (!selectedUser) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedUser}
        onRequestClose={() => setSelectedUser(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => 
                {
                  setSelectedUser(null);
                  setUserReservation([])
                }
              }
            >
              <Text style={styles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            {/* User Image */}
            <Image 
              source={ selectedUser.picture || PlaceholderImage }
              style={styles.userImage}
            />

            {/* User Details */}
            <Text style={styles.modalUserName}>
              {selectedUser.name || selectedUser.email.split('@')[0]}
            </Text>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Email</Text>
              <Text style={styles.modalDetailValue}>{selectedUser.email}</Text>
            </View>

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Number of reserves</Text>
              <Text style={styles.modalDetailValue}>{loading? <ActivityIndicator/> : numberOfReservations}</Text>
            </View>

            {selectedUser.phone && (
              <View style={styles.modalDetailContainer}>
                <Text style={styles.modalDetailLabel}>Phone</Text>
                <Text style={styles.modalDetailValue}>{selectedUser.phone || null}</Text>
              </View>
            )}

            <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailLabel}>Status</Text>
              <View 
                style={[
                  styles.statusBadge, 
                  selectedUser.status === 'active' ? styles.activeBadge : styles.burnedBadge,
                  { width: 80 }
                ]}
              >
                <Text style={styles.statusText}>{selectedUser.status}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: darkMode ? '#333333' : '#f4f7fa', borderBottomColor: darkMode ? '#444' : '#e0e0e0' }]}>
        <Text style={[styles.headerText, {color: darkMode ? 'white' : 'black'}]}>Users Management</Text>
      </View>

      {/* Filter Buttons */}
      <View style={[styles.filterContainer, {borderBottomColor: darkMode ? '#444' : '#e0e0e0'}]}>
        <FilterButton status="all" label="All" />
        <FilterButton status="active" label="Active" />
        <FilterButton status="burned" label="Burned" />
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />

      {/* User Details Modal */}
      <UserDetailsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: 
  {
    padding: 15,
    borderBottomWidth: 1,
  },

  headerText: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },

  filterContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
  },

  filterButton: 
  {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },

  activeFilterButton: 
  {
    backgroundColor: '#007bff',
  },

  filterButtonText: 
  {
    color: '#333',
    fontWeight: '600',
  },

  activeFilterButtonText: 
  {
    color: 'white',
  },

  listContainer: 
  {
    paddingVertical: 10,
  },

  userItem: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  emailText: 
  {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },

  statusBadge: 
  {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 70
  },

  activeBadge: 
  {
    backgroundColor: '#e6f2e6',
  },

  burnedBadge: 
  {
    backgroundColor: '#f2e6e6',
  },

  statusText: 
  {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
    textAlign: "center",
  },

  emptyContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  emptyText: 
  {
    fontSize: 18,
    color: '#888',
  },

  modalOverlay: 
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: 
  {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalCloseButton: 
  {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCloseButtonText: 
  {
    fontSize: 20,
    color: '#333',
    textAlign: 'center'
  },

  userImage: 
  {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },

  modalUserName: 
  {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  modalDetailContainer: 
  {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  modalDetailLabel: 
  {
    fontSize: 16,
    color: '#666',
  },

  modalDetailValue: 
  {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UsersScreen;