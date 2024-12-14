import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable, 
  Switch,
  Dimensions
} from 'react-native';
import { 
  Users, 
  FileText, 
  Server, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react-native';

import AuthContext from '../AuthContext';

const { width } = Dimensions.get('window');

const AdminSettingsScreen = ({navigation}) => {
  const {setDarkMode, darkMode} = useContext(AuthContext);

  const settingsSections = [
    {
      title: 'User Management',
      icon: <Users color="#3498db" size={24} />,
      items: [
        {
          title: 'Manage Users',
          subtitle: 'View user profiles',
          icon: <Users color="#2c3e50" size={24} />,
          type: 'nav',
          onPress: () => navigation.navigate('users'),
        },
      ],
    },
    {
      title: 'Content Moderation',
      icon: <FileText color="#e67e22" size={24} />,
      items: [
        {
          title: 'Review Reservation',
          subtitle: 'View user reservations',
          icon: <FileText color="#2c3e50" size={24} />,
          type: 'nav',
          onPress: ()=> navigation.navigate('ReservationsScreen'),
        },
      ],
    },
    {
      title: 'System Settings',
      icon: <Server color="#1abc9c" size={24} />,
      items: [

        {
            title: 'Dark Mode',
            subtitle: 'Switch between light and dark ',
            icon: darkMode ? <Moon color="#2c3e50" size={24} /> : <Sun color="#2c3e50" size={24} />,
            type: 'toggle',
            value: darkMode,
            onToggle: () => setDarkMode(!darkMode)
          },
      ],
    },

  ];

  return (
    <View style={styles.container}>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionIconContainer}>
                {section.icon}
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            <View style={styles.settingsList}>
              {section.items.map((item, itemIndex) => (
                <Pressable 
                  key={itemIndex} 
                  style={styles.settingItem}
                  onPress={item.type === 'nav' ? item.onPress : undefined}
                >
                  <View style={styles.settingItemLeft}>
                    <View style={styles.settingItemIconContainer}>
                      {item.icon}
                    </View>
                    <View style={styles.settingItemTextContainer}>
                      <Text style={styles.settingItemTitle}>{item.title}</Text>
                      <Text style={styles.settingItemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  
                  {item.type === 'toggle' && (
                    <Switch 
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: "#e0e0e0", true: "#3498db" }}
                      thumbColor={item.value ? "white" : "#f4f3f4"}
                    />
                  )}
                  
                  {item.type === 'nav' && (
                    <ChevronRight color="#bdc3c7" size={24} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
 
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  settingsSection: {
    marginBottom: 25,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIconContainer: {
    backgroundColor: '#f4f7fa',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  settingsList: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f7fa',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemIconContainer: {
    backgroundColor: '#f4f7fa',
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingItemTextContainer: {
    justifyContent: 'center',
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  settingItemSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});

export default AdminSettingsScreen;
