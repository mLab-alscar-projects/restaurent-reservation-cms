import React, { useState, useMemo, useContext } from 'react';
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

import AuthContext from '../AuthContext';
import { DarkTheme } from '@react-navigation/native';

// Mock user data with more details
const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe',
    email: 'john.doe@example.com', 
    status: 'active',
    phone: '+1 (555) 123-4567',
    picture: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  { 
    id: 2, 
    name: 'Jane Smith',
    email: 'jane.smith@example.com', 
    status: 'burned',
    phone: '+1 (555) 987-6543',
    picture: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  { 
    id: 3, 
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com', 
    status: 'active',
    picture: null
  },
  { 
    id: 4, 
    email: 'sarah.williams@example.com', 
    status: 'burned'
  },
  { 
    id: 5, 
    name: 'Alex Taylor',
    email: 'alex.taylor@example.com', 
    status: 'active',
    phone: '+1 (555) 246-8135',
    picture: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  { 
    id: 6, 
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com', 
    status: 'burned'
  }
];

const PlaceholderImage = 'https://via.placeholder.com/150?text=User+Photo';

const UsersScreen = () => {

  const { darkMode } = useContext(AuthContext);

  const [users] = useState(initialUsers);
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Filtered users based on selected filter
  const filteredUsers = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter(user => user.status === filter);
  }, [users, filter]);

  // User count statistics
  const userStats = useMemo(() => ({
    all: users.length,
    active: users.filter(user => user.status === 'active').length,
    burned: users.filter(user => user.status === 'burned').length
  }), [users]);

  // Render individual user item
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
              onPress={() => setSelectedUser(null)}
            >
              <Text style={styles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            {/* User Image */}
            <Image 
              source={{ uri: selectedUser.picture || PlaceholderImage }}
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

            {selectedUser.phone && (
              <View style={styles.modalDetailContainer}>
                <Text style={styles.modalDetailLabel}>Phone</Text>
                <Text style={styles.modalDetailValue}>{selectedUser.phone}</Text>
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
    borderRadius: 20,
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
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCloseButtonText: 
  {
    fontSize: 20,
    color: '#333',
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