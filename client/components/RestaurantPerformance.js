import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Pressable 
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const RestaurantPerformance = () => {
  // Mock restaurant data - replace with actual data
  const [restaurants] = useState([
    { 
      id: 1, 
      name: 'Pasta Palace', 
      weeklyData: [0.65, 0.59],
      totalReservations: 45,
      averageRating: 4.5,
      color: '#3498db',
    },
    { 
      id: 2, 
      name: 'Burger Bliss', 
      weeklyData: [0.55, 0.62],
      totalReservations: 38,
      averageRating: 4.2,
      color: '#2ecc71',
    },
    { 
      id: 3, 
      name: 'Sushi Sensation', 
      weeklyData: [0.70, 0.65],
      averageRating: 4.7,
       color: '#9b59b6'
    }
  ]);

  // Calculate overall stats
  const totalReservations = restaurants.reduce((sum, rest) => sum + rest.totalReservations, 0);
  const averagePerformance = (restaurants.reduce((sum, rest) => 
    sum + (rest.weeklyData.reduce((a, b) => a + b, 0) / rest.weeklyData.length), 0) 
    / restaurants.length * 100).toFixed(0);

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#333',
    backgroundGradientFrom: '#333',
    backgroundGradientTo: '#333',
    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const calculateWeeklyAverage = (weeklyData) => {
    return (weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length * 100).toFixed(0);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Overall Insights Section */}
      <Pressable style={styles.insightsContainer}>
        <View style={styles.primaryInsightCard}>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>Weekly Productivity</Text>
            <Text style={styles.trendIcon}>📈</Text>
          </View>

          {/* MOCK CHART VISUALIZATION */}
          <View style={styles.chartContainer}>
            {[65, 59, 80, 81, 56, 70, 90].map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.chartBar,
                    { height: value, backgroundColor: `rgba(52, 152, 219, ${value / 100})` }
                  ]}
                />
                <Text style={styles.barLabel}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalReservations}</Text>
              <Text style={styles.statLabel}>Tables reserved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{restaurants.length}</Text>
              <Text style={styles.statLabel}>Restaurants</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{averagePerformance}%</Text>
              <Text style={styles.statLabel}>Avg Performance</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <Text style={styles.sectionTitle}>Individual Restaurant Performance</Text>
      
      {restaurants.map((restaurant) => (
        <View 
          key={restaurant.id} 
          style={styles.restaurantContainer}
        >
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          
          {/* Progress Chart */}
          <ProgressChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              data: restaurant.weeklyData
            }}
            width={Dimensions.get('window').width - 40}
            height={150}
            chartConfig={chartConfig}
            hideLegend={false}
            style={[styles.progressChart, {backgroundColor: '#000'}]}
          />
          
          {/* Performance Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {calculateWeeklyAverage(restaurant.weeklyData)}%
              </Text>
              <Text style={styles.statLabel}>Weekly Performance</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {restaurant.totalReservations}
              </Text>
              <Text style={styles.statLabel}>Reservations</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {restaurant.averageRating}
              </Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Existing styles from previous version
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  // New styles for the insights section
  insightsContainer: {
    marginBottom: 20
  },
  primaryInsightCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  chartTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  trendIcon: {
    fontSize: 20
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 10
  },
  barContainer: {
    alignItems: 'center',
    width: '13%'
  },
  chartBar: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  barLabel: {
    marginTop: 5,
    fontSize: 10,
    color: '#7f8c8d'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  statItem: {
    alignItems: 'center',
    width: '30%'
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9'
  },
  statLabel: {
    fontSize: 12,
    color: '#f9f9f9',
    textAlign: 'center',
    marginTop: 5
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center'
  },
  restaurantContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center'
  },
  progressChart: {
    marginVertical: 8,
    borderRadius: 16,
    
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    width: '30%'
  }
});

export default RestaurantPerformance;