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

// SCREEN DIMENSIONS
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.parent}>
      {/* TOP NAVIGATION SECTION */}
      <View style={styles.topNavigation}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>OP</Text>
          </View>
          <View>
            <Text style={styles.greetingText}>Hello, Oscar</Text>
            <Text style={styles.subGreetingText}>Productivity Dashboard</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      {/* PRODUCTIVITY INSIGHTS */}
      <View style={styles.insightsContainer}>
        <View style={styles.primaryInsightCard}>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>Weekly Productivity</Text>
            <Text style={styles.trendIcon}>📈</Text>
          </View>
          
          {/* MOCK CHART VISUALIZATION */}
          <View style={styles.chartContainer}>
            {[65, 59, 80, 81, 56].map((value, index) => (
              <View 
                key={index} 
                style={[
                  styles.chartBar, 
                  { height: value, backgroundColor: `rgba(52, 152, 219, ${value/100})` }
                ]} 
              />
            ))}
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Tables reserved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>26h</Text>
              <Text style={styles.statLabel}>Worked</Text>
            </View>
          </View>
        </View>
      </View>

      {/* RESTAURANT BOOKING SECTION */}
      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>Restaurant Bookings</Text>
        <View style={styles.bookingCarousel}>
          {[
            { name: "Eat'in", tables: 7, color: '#3498db' },
            { name: "Foodies' Delight", tables: 3, color: '#2ecc71' }
          ].map((restaurant, index) => (
            <View key={index} style={[styles.bookingCard, { backgroundColor: restaurant.color }]}>
              <View style={styles.bookingOverlay}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.availabilityText}>{restaurant.tables} Tables Available</Text>
                <Pressable style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
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
  iconContainer: {
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

  // PRODUCTIVITY INSIGHTS
  insightsContainer: 
  {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  primaryInsightCard: 
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

  chartTitleContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  chartTitle: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },

  trendIcon: 
  {
    fontSize: 24,
  },

  chartContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 15,
  },

  chartBar: 
  {
    width: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  statsContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  statItem: 
  {
    alignItems: 'center',
  },

  statValue: 
  {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  statLabel: 
  {
    fontSize: 12,
    color: '#7f8c8d',
  },

  // RESTAURANT BOOKING SECTION
  bookingSection: 
  {
    paddingHorizontal: 20,
  },

  sectionTitle: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },

  bookingCarousel: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bookingCard: 
  {
    width: width * 0.42,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  bookingOverlay: 
  {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    alignItems: 'center',
  },

  restaurantName: 
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },

  availabilityText: 
  {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },

  bookButton: 
  {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },

  bookButtonText: 
  {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  
});

export default HomeScreen;