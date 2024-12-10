import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NotificationsScreen = ({ route, navigation }) => {
  // Safely retrieve route parameters with fallback values
  const { reservations = {} } = route.params || {};
  const notifications = reservations.notifications || [];

  const [activeFilter, setActiveFilter] = useState('All');

  // Sample data for restaurant notification counts
  const notificationCounts = {
    "Eat'in": 1,
    "Foodies' Delight": 2,
    "Munchies": 3,
  };

  const filterOptions = ['All', 'Confirmed', 'Pending', 'Updates'];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return '#2ecc71';
      case 'info': return '#3498db';
      case 'pending': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  // Fallback values for latest notifications
  const latestNotification = notifications[0] || {};
  const secondNotification = notifications[1] || {};

  return (
    <View style={styles.parent}>
      {/* TOP NAVIGATION */}
      <View style={styles.topNavigation}>
        <View style={styles.profileContainer}>
          <Pressable 
            style={styles.profileImagePlaceholder} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileInitials}>OP</Text>
          </Pressable>
          <View>
            <Text style={styles.greetingText}>Notifications</Text>
            <Text style={styles.subGreetingText}>Stay Updated</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Pressable 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#2c3e50" />
          </Pressable>
        </View>
      </View>

      {/* NOTIFICATION FILTERS */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filterOptions.map((filter) => (
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
            <MaterialIcons name="ads-click" size={20} color="#2c3e50" />
          </Pressable>
        ))}
      </ScrollView>

      {/* LATEST NOTIFICATION */}
      <View style={styles.insightsContainer}>
        <View style={styles.primaryNotificationCard}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>Latest Notification</Text>
            <Text style={styles.notificationTime}>
              {secondNotification.time || 'N/A'}
            </Text>
          </View>
          <View style={styles.notificationContent}>
            <Text 
              style={[
                styles.restaurantName, 
                { color: getNotificationColor(latestNotification.type) }
              ]}
            >
              {latestNotification.restaurant || 'No restaurant available'}
            </Text>
            <Text style={styles.notificationMessage}>
              {latestNotification.message || 'No message available'}
            </Text>
            <Pressable 
              style={[
                styles.actionButton, 
                { backgroundColor: getNotificationColor(latestNotification.type) }
              ]}
            >
              <Text style={styles.actionButtonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* RESTAURANT NOTIFICATIONS */}
      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>Restaurant Reservations</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.notificationCarousel}
        >
          {Object.entries(notificationCounts).map(([restaurant, count], index) => (
            <View key={index} style={styles.notificationCard}>
              <View style={styles.notificationCardContent}>
                <Text style={styles.restaurantName} numberOfLines={1}>{restaurant}</Text>
                <View style={styles.notificationCountBadge}>
                  <Text style={styles.notificationCountText}>{count}</Text>
                </View>
                <Pressable 
                  style={styles.viewNotificationsButton} 
                  onPress={() => navigation.navigate('ReservationsScreen')}
                >
                  <Text style={styles.viewNotificationsText}>View Reservations</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  
  // TOP NAVIGATION STYLES
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  profileInitials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },

  subGreetingText: {
    fontSize: 14,
    color: '#7f8c8d',
  },

  iconContainer: {
    flexDirection: 'row',
  },

  iconButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },

  // FILTER STYLES
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7
  },

  activeFilterButton: {
    backgroundColor: '#3498db',
  },

  filterButtonText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },

  activeFilterButtonText: {
    color: 'white',
  },

  // LATEST NOTIFICATION STYLES
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  primaryNotificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  notificationTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },

  notificationContent: {
    alignItems: 'center',
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
  },

  notificationMessage: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },

  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '90%',
  },

  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  // RESTAURANT NOTIFICATIONS STYLES
  notificationsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },

  notificationCarousel: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },

  notificationCard: {
    width: width * 0.5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 15,
    marginRight: 15,
  },

  notificationCardContent: {
    alignItems: 'center',
  },

  notificationCountBadge: {
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  notificationCountText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  viewNotificationsButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  viewNotificationsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default NotificationsScreen;