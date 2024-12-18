import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  Pressable,
  Dimensions,
  StatusBar
} from 'react-native';

import { 
  Users, 
  Grid, 
  Settings, 
  LogOut, 
  Calendar,
  BarChart2
} from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AuthContext from '../AuthContext';

const { width } = Dimensions.get('window');

const AdminProfileScreen = (
   {navigation}
) => {
  const {darkMode, users, restaurants, reservations} = useContext(AuthContext);
  const countRestaurants = restaurants.filter(restaurant => restaurant.isActive).length;
  const countUsers = users.length;  
  const countReservations = reservations.length;
  const user = AsyncStorage.getItem("userEmail");

  const [admin] = useState({
    name: "Oscar Poco",
    role: "Chief Administrator",
    email: "oscar.poco@admin.com",
    avatar: require('../assets/admin.jpg'),
    accessLevel: "Super Admin",
    lastLogin: "December 9, 2024 at 10:45 AM",
  });

  const adminStats = [
    { 
      icon: <Users color="#3498db" size={24} />, 
      label: "Total Users", 
      value: countUsers,
      onPress: () => navigation.navigate('users'),

    },
    { 
      icon: <Grid color="#2ecc71" size={24} />, 
      label: "Active Restaurants", 
      value: countRestaurants,
      onPress: () => navigation.navigate('Home'),

    },
    { 
      icon: <Calendar color="#e74c3c" size={24} />, 
      label: "Monthly Reservations", 
      value: countReservations ,
      onPress: () => navigation.navigate('ReservationsScreen'),

    }
  ];

  const handleLogout = async () => { 
    try { 
      await AsyncStorage.removeItem('token'); 
      await AsyncStorage.removeItem('userEmail'); 
      navigation.navigate("Login"); 
      Toast.show({
        type: 'success', 
        text1: `Success`,
        text2: 'Successfully logged out',
        position: 'bottom',
      });
    } catch (error) 
    { console.error("Error removing token", error); 

    } };

  const quickActions = [
   
    { 
      icon: <BarChart2 color="#2c3e50" size={24} />, 
      title: "Analytics Dashboard", 
      subtitle: "View platform performance" ,
      onPress: () => navigation.navigate('RestaurantPerformance'),
    },
    { 
      icon: <LogOut color="#e74c3c" size={24} />, 
      title: "Logout", 
      subtitle: "Exit admin panel",
      destructive: true,
      onPress: handleLogout
    }
  ];


  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>

      <StatusBar backgroundColor={'#3498db'}/>
      
      <View style={[styles.headerBackground, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Pressable style={styles.settingsButton} onPress={()=> navigation.navigate('Settings')}>
              <Settings color={darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'} size={30} />
            </Pressable>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={admin.avatar} 
                style={styles.profileImage} 
              />
              <View style={styles.accessBadge}>
                <Text style={styles.accessBadgeText}>
                  {admin.accessLevel}
                </Text>
              </View>
            </View>

            <Text style={[styles.adminName, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{admin.name}</Text>
            <Text style={styles.adminRole}>{admin.role}</Text>
            <Text style={styles.adminEmail}>{user}</Text>
            <Text style={styles.lastLogin}>
              Last Login: {admin.lastLogin}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {adminStats.map((stat, index) => (
          <Pressable key={index} style={[styles.statCard, { backgroundColor: darkMode ? '#444' : '#ffffff' }]} onPress={stat.onPress}>
            <View style={[styles.statIconContainer, { backgroundColor: darkMode ? '#rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}>
              {stat.icon}
            </View>
            <Text style={[styles.statValue, {color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'}]}>{stat.value}</Text>
            <Text style={[styles.statLabel, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{stat.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView 
        style={[styles.actionsContainer]}
        showsVerticalScrollIndicator={false}
      >
        {quickActions.map((action, index) => (
          <Pressable 
            key={index} 
            style={[
              styles.actionItem,
              action.destructive && styles.destructiveAction,
              { backgroundColor: darkMode ? '#444' : '#ffffff' }
            ]}
            onPress={action.onPress} 
          >
            <View style={[styles.actionIconContainer, { backgroundColor: darkMode ? '#rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}>
              {action.icon}
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[
                styles.actionTitle,
                action.destructive && styles.destructiveTitleColor
              ]}>
                {action.title}
              </Text>
              <Text style={styles.actionSubtitle}>
                {action.subtitle}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
  },

  headerBackground: 
  {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 20,
  },

  headerContent: 
  {
    paddingHorizontal: 20,
  },

  headerTop: 
  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  settingsButton: 
  {
    marginTop: 20
  },

  profileSection: 
  {
    alignItems: 'center',
  },

  profileImageContainer: 
  {
    position: 'relative',
    marginBottom: 15,
  },

  profileImage: 
  {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3498db',
  },

  accessBadge: 
  {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  accessBadgeText: 
  {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  adminName: 
  {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },
  adminRole: 
  {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },

  adminEmail: 
  {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },

  lastLogin: 
  {
    fontSize: 12,
    color: '#bdc3c7',
  },

  statsContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statCard: 
  {
    backgroundColor: 'white',
    width: (width - 60) / 3,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statIconContainer: 
  {
    backgroundColor: '#f4f7fa',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  statValue: 
  {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },

  statLabel: 
  {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center'
  },
  actionsContainer: 
  {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  actionItem: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  destructiveAction: 
  {
    backgroundColor: '#ffebee',
  },

  actionIconContainer: 
  {
    backgroundColor: '#f4f7fa',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  actionTextContainer: 
  {
    flex: 1,
  },

  actionTitle: 
  {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#7f8c8d',

  },

  destructiveTitleColor: 
  {
    color: '#e74c3c',
  },

  actionSubtitle: 
  {
    fontSize: 13,
    color: '#7f8c8d',
  },
});

export default AdminProfileScreen;