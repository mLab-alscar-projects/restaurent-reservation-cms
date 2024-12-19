import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../AuthContext';

const RestaurantPerformance = () => {
  const { restaurants, reservations } = useContext(AuthContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurantReservations, setRestaurantReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate overall stats from all reservations
  const calculateOverallStats = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.setDate(today.getDate() - 30));

    const dailyTotal = reservations.filter(r => new Date(r.dateOfPayment) >= startOfDay).length;
    const weeklyTotal = reservations.filter(r => new Date(r.dateOfPayment) >= startOfWeek).length;
    const monthlyTotal = reservations.filter(r => new Date(r.dateOfPayment) >= startOfMonth).length;

    // Calculate overall occupancy rate
    const totalCapacity = restaurants.reduce((sum, restaurant) => sum + (restaurant.tables || 0), 0);
    const occupancyRate = totalCapacity > 0 ? (dailyTotal / totalCapacity) * 100 : 0;

    return {
      daily: dailyTotal,
      weekly: weeklyTotal,
      monthly: monthlyTotal,
      total: reservations.length,
      occupancy: Math.round(occupancyRate)
    };
  };

  // Fetch specific restaurant reservations
  const fetchRestaurantReservations = async (restaurantId) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(
        `https://lumpy-clover-production.up.railway.app/api/restaurant-reservations/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setRestaurantReservations(response.data);
    } catch (error) {
      console.error('Error fetching restaurant reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats for a specific restaurant
  const calculateRestaurantStats = (restaurantReservations, restaurant) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.setDate(today.getDate() - 30));

    const dailyTotal = restaurantReservations.filter(r => new Date(r.dateOfPayment) >= startOfDay).length;
    const weeklyTotal = restaurantReservations.filter(r => new Date(r.dateOfPayment) >= startOfWeek).length;
    const monthlyTotal = restaurantReservations.filter(r => new Date(r.dateOfPayment) >= startOfMonth).length;

    const occupancyRate = restaurant.tables ? (dailyTotal / restaurant.tables) * 100 : 0;

    return {
      daily: dailyTotal,
      weekly: weeklyTotal,
      monthly: monthlyTotal,
      total: restaurantReservations.length,
      occupancy: Math.round(occupancyRate)
    };
  };

  const handleRestaurantPress = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalVisible(true);
    await fetchRestaurantReservations(restaurant._id);
  };

  const overallStats = calculateOverallStats();

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor={'#3498db'}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Overall Performance Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Overall Performance</Text>
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Today's Overall Occupancy</Text>
            <Text style={styles.occupancyText}>{overallStats.occupancy}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${overallStats.occupancy}%` }]} />
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.daily}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.weekly}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.monthly}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{overallStats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Restaurants List */}
        <Text style={styles.sectionTitle}>Restaurants</Text>
        <View style={styles.restaurantsList}>
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant._id}
              style={styles.restaurantCard}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantDetails}>
                Capacity: {restaurant.tables} tables
              </Text>
              <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Restaurant Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {loading ? (
                <ActivityIndicator size="large" color="#0066FF" />
              ) : selectedRestaurant && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>

                  {restaurantReservations.length > 0 ? (
                    <>
                      <View style={styles.modalPerformanceCard}>
                        <Text style={styles.cardTitle}>Today's Occupancy</Text>
                        <Text style={styles.occupancyText}>
                          {calculateRestaurantStats(restaurantReservations, selectedRestaurant).occupancy}%
                        </Text>
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill, 
                              { 
                                width: `${calculateRestaurantStats(restaurantReservations, selectedRestaurant).occupancy}%` 
                              }
                            ]} 
                          />
                        </View>
                      </View>

                      <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                          <Text style={styles.statValue}>
                            {calculateRestaurantStats(restaurantReservations, selectedRestaurant).daily}
                          </Text>
                          <Text style={styles.statLabel}>Today</Text>
                        </View>
                        <View style={styles.statCard}>
                          <Text style={styles.statValue}>
                            {calculateRestaurantStats(restaurantReservations, selectedRestaurant).weekly}
                          </Text>
                          <Text style={styles.statLabel}>This Week</Text>
                        </View>
                        <View style={styles.statCard}>
                          <Text style={styles.statValue}>
                            {calculateRestaurantStats(restaurantReservations, selectedRestaurant).monthly}
                          </Text>
                          <Text style={styles.statLabel}>This Month</Text>
                        </View>
                        <View style={styles.statCard}>
                          <Text style={styles.statValue}>
                            {calculateRestaurantStats(restaurantReservations, selectedRestaurant).total}
                          </Text>
                          <Text style={styles.statLabel}>Total</Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.noDataText}>No reservations found</Text>
                  )}
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  scrollContent: 
  {
    padding: 16,
  },

  headerSection: 
  {
    marginBottom: 24,
  },

  headerTitle: 
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },

  performanceCard: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: 
  {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },

  occupancyText: 
  {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 8,
  },

  progressBar: 
  {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: 
  {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 4,
  },

  statsGrid: 
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },

  statCard: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get('window').width - 64) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statValue: 
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  statLabel: 
  {
    fontSize: 14,
    color: '#666666',
  },

  sectionTitle: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },

  restaurantsList: 
  {
    gap: 16,
  },

  restaurantCard: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  restaurantName: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },

  restaurantDetails: 
  {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },

  restaurantLocation: 
  {
    fontSize: 14,
    color: '#666666',
  },

  // MODAL
  modalContainer: 
  {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: 
  {
    backgroundColor: '#F5F6FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: '80%',
  },

  modalHeader: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: 
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  closeButton: 
  {
    padding: 8,
  },

  closeButtonText: 
  {
    fontSize: 32,
    color: '#666666',
  },

  modalPerformanceCard: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  noDataText: 
  {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RestaurantPerformance;