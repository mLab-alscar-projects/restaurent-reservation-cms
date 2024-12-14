
import React, { useState, useContext } from 'react';

import 
{ 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Pressable,
  StatusBar 
} from 'react-native';

import AuthContext from '../AuthContext';

import { ProgressChart } from 'react-native-chart-kit';

const RestaurantPerformance = () => {

  const { loader, darkMode } = useContext(AuthContext);

 
  const [restaurants] = useState([
    { 
      id: 1, 
      name: "Eat'in", 
      weeklyData: [0.65, 0.59, .70, .36],
      totalReservations: 45,
      averageRating: 4.5,
      color: '#3498db',
      darkColor: '#216a9b',
    },
    { 
      id: 2, 
      name: "Foodies's Delight", 
      weeklyData: [0.55, 0.62, .70, .36],
      totalReservations: 38,
      averageRating: 4.2,
      color: '#2ecc71',
      darkColor: '#1e8c50',

    },
    { 
      id: 3, 
      name: "Munchies", 
      weeklyData: [0.70, 0.65, .70, .36],
      averageRating: 4.7,
      color: '#9b59b6',
      totalReservations: 58,
      darkColor: '#6d3f86',

    }
  ]);

 
  const totalReservations = restaurants.reduce((sum, rest) => sum + rest.totalReservations, 0);
  const averagePerformance = (restaurants.reduce((sum, rest) => 
    sum + (rest.weeklyData.reduce((a, b) => a + b, 0) / rest.weeklyData.length), 0) 
    / restaurants.length * 100).toFixed(0);

  
  const chartConfig = (restaurant) => ({
    backgroundGradientFrom: darkMode ? '#444' : '#fff',
    backgroundGradientTo: darkMode ? '#444' : '#fff',
    color: (opacity = 1) => {

      if (restaurant.color.startsWith('#')) {
        // Convert hex to rgba
        const hexToRgba = (hex, opacity) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        };
        return hexToRgba(restaurant.color, opacity);
      }
     
      return restaurant.color;
    },
    strokeWidth: 2,
    barPercentage: 0.5,
  });

  const calculateWeeklyAverage = (weeklyData) => {
    return (weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length * 100).toFixed(0);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}
      contentContainerStyle={styles.contentContainer}

    >
      <StatusBar backgroundColor={'#3498db'}/>
      
      <Text style={[styles.sectionTitle, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Weekly Performance</Text>
      {/* Overall Insights Section */}
      <Pressable style={styles.insightsContainer}>
        <View style={[styles.primaryInsightCard, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
          <View style={styles.chartTitleContainer}>
            <Text style={[styles.chartTitle, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Weekly Productivity</Text>
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
                <Text style={[styles.barLabel, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{totalReservations}</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)', fontWeight: 900}]}>Tables reserved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{restaurants.length}</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)', fontWeight: 900}]}>Restaurants</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{averagePerformance}%</Text>
              <Text style={[styles.statLabel, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)', fontWeight: 900}]}>Avg Performance</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <Text style={[styles.sectionTitle, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>Restaurants Performance</Text>
      
      {restaurants.map((restaurant) => (
        <View 
          key={restaurant.id} 
          style={[styles.restaurantContainer, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}
        >
          <Text style={[styles.restaurantName, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{restaurant.name}</Text>
          
          {/* Progress Chart */}
          <ProgressChart
            data={{
              labels: ['Daily','Weekly', 'Monthly', 'Yearly'],
              data: restaurant.weeklyData
            }}
            width={Dimensions.get('window').width - 40}
            height={150}
            chartConfig={chartConfig(restaurant)}
            hideLegend={false}
            style={[styles.progressChart, {backgroundColor: '#000'}]}
          />
          
          {/* Performance Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, {backgroundColor: restaurant.darkColor}]}>
              <Text style={styles.statValue}>
                {calculateWeeklyAverage(restaurant.weeklyData)}%
              </Text>
              <Text style={styles.statLabel}>Weekly</Text>
            </View>
            
            <View style={[styles.statCard, {backgroundColor: restaurant.darkColor}]}>
              <Text style={styles.statValue}>
                {restaurant.totalReservations}
              </Text>
              <Text style={styles.statLabel}>Reservations</Text>
            </View>
            
            <View style={[styles.statCard, {backgroundColor: restaurant.darkColor}]}>
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

  container: 
  {
    flex: 1,
  },

  contentContainer: 
  {
    paddingVertical: 20,
  },

  insightsContainer: 
  {
    marginBottom: 20
  },

  primaryInsightCard: 
  {
    backgroundColor: 'white',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  chartTitleContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  chartTitle: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  trendIcon: 
  {
    fontSize: 20
  },

  chartContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 10
  },

  barContainer: 
  {
    alignItems: 'center',
    width: '13%'
  },

  chartBar: 
  {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  barLabel: 
  {
    marginTop: 5,
    fontSize: 10,
    color: '#7f8c8d'
  },

  statsContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  statItem: 
  {
    alignItems: 'center',
    width: '30%',
  },

  statValue: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d3ddda'
  },

  statLabel: 
  {
    fontSize: 12,
    color: '#f9f9f9',
    textAlign: 'center',
    marginTop: 5,
    letterSpacing: 1,
  },

  sectionTitle: 
  {
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#444',
    width: '100%',
    marginBottom: 15,
    textAlign: 'center',
  },

  restaurantContainer: 
  {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  restaurantName: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 2,
  },

  progressChart: 
  {
    marginVertical: 8,
    borderRadius: 16,
    
  },

  statsRow: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  statCard: 
  {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    width: '30%'
  }
});

export default RestaurantPerformance;