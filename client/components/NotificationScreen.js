import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  Dimensions, 
  ScrollView 
} from 'react-native';

const { width } = Dimensions.get('window');

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: 1,
      restaurant: "Eat'in",
      message: "Reservation confirmed for 2 people",
      time: "10 mins ago",
      type: "success"
    },
    {
      id: 2,
      restaurant: "Foodies' Delight",
      message: "Table waitlist update",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 3,
      restaurant: "Munchies",
      message: "Reservation request pending",
      time: "Yesterday",
      type: "pending"
    }
  ];

  const notificationCounts = {
    "Eat'in": 1,
    "Foodies' Delight": 2,
    "Munchies": 3
  };

  return (
    <ScrollView style={styles.parent}>
      {/* TOP NAVIGATION */}
      <View style={styles.topNavigation}>
        <View style={styles.profileContainer}>
          <Pressable style={styles.profileImagePlaceholder} onPress={()=> navigation.navigate('Profile')}>
            <Text style={styles.profileInitials}>OP</Text>
          </Pressable>
          <View>
            <Text style={styles.greetingText}>Notifications</Text>
            <Text style={styles.subGreetingText}>Recent Updates</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={()=> navigation.navigate('Settings')}>
            <Text style={styles.iconText}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      {/* LATEST NOTIFICATION */}
      <View style={styles.insightsContainer}>
        <View style={styles.primaryNotificationCard}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>Latest Notification</Text>
            <Text style={styles.notificationTime}>{notifications[0].time}</Text>
          </View>
          
          <View style={styles.notificationContent}>
            <Text style={styles.restaurantName}>{notifications[0].restaurant}</Text>
            <Text style={styles.notificationMessage}>{notifications[0].message}</Text>
            
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* RESTAURANT NOTIFICATIONS */}
      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>Restaurant Notifications</Text>
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
                <Pressable style={styles.viewNotificationsButton} onPress={()=> navigation.navigate('ReservationsScreen')}>
                  <Text style={styles.viewNotificationsText}>View Notifications</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: 
  {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  
  // TOP NAVIGATION STYLES
  topNavigation: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },

  profileContainer: 
  {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImagePlaceholder: 
  {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  profileInitials: 
  {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  greetingText: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  subGreetingText: 
  {
    fontSize: 14,
    color: '#7f8c8d',
  },

  iconContainer: 
  {
    flexDirection: 'row',
    gap: 15,
  },

  iconButton: 
  {
    padding: 10,
  },

  iconText: 
  {
    fontSize: 20,
  },

  // LATEST NOTIFICATION STYLES
  insightsContainer: 
  {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  primaryNotificationCard: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  notificationHeader: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  notificationTitle: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  notificationTime: 
  {
    fontSize: 14,
    color: '#7f8c8d',
  },

  notificationContent: 
  {
    alignItems: 'center',
  },

  restaurantName: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
    letterSpacing: 1
  },

  notificationMessage: 
  {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },

  actionButton: 
  {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '90%'
  },

  actionButtonText: 
  {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  // RESTAURANT NOTIFICATIONS STYLES
  notificationsSection: 
  {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },

  notificationCarousel: 
  {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },

  notificationCard: 
  {
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

  notificationCardContent: 
  {
    alignItems: 'center',
  },

  notificationCountBadge: 
  {
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },

  notificationCountText: 
  {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  viewNotificationsButton: 
  {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },

  viewNotificationsText: 
  {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default NotificationsScreen;