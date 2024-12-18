import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { StarIcon, MapPinIcon, ClockIcon, Edit, Radiation } from 'lucide-react-native';

const RestaurantDetailsScreen = ({restaurant, darkMode}) => {

  const restaurantData = {
    name: 'Gourmet Haven',
    image: require('../assets/munchies.jpg'), 
    rating: 4.7,
    workingHours: '11:00 AM - 10:00 PM',
    location: '123 Culinary Street, Foodville',
    reviews: [
      {
        id: '1',
        username: 'Food Lover',
        rating: 5,
        comment: 'Absolutely amazing cuisine and wonderful ambiance!'
      },
      {
        id: '2', 
        username: 'Culinary Critic',
        rating: 4.5,
        comment: 'Exceptional dishes with fresh ingredients.'
      },
      {
        id: '3',
        username: 'Casual Diner',
        rating: 4,
        comment: 'Great experience, friendly staff and delicious food.'
      }
    ]
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon 
        key={index} 
        color={index < Math.floor(rating) ? '#FFD700' : '#E0E0E0'} 
        fill={index < Math.floor(rating) ? '#FFD700' : 'transparent'}
        size={20}
      />
    ));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
      <ScrollView>
        {/* Restaurant Image */}
        <Image 
          source={{uri: restaurant.image }} 
          style={[styles.restaurantImage, { backgroundColor: darkMode ? '#333333' : '#ffffff' }]} 
        />

        {/* Restaurant Details Card */}
        <View style={[styles.detailsCard, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
          <Text style={[styles.restaurantName, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{restaurant.name}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <StarIcon color="#FFD700" size={20} />
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{restaurantData.rating} / 5</Text>
            </View>
            
            <View style={styles.infoItem}>
              <ClockIcon color="#4A90E2" size={20} />
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{restaurant.timeslot}</Text> 
            </View>
            
            <View style={styles.infoItem}>
              <MapPinIcon color="#E74C3C" size={20} />
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{restaurant.location}</Text>
            </View>

            <View style={styles.infoItem}>
              <Radiation color="#2ecc71" size={20} />
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{restaurant.isActive ? 'Active' : 'Not Active'}</Text>
            </View>
          </View>

          {/* Overall Rating Visualization */}
          <View style={styles.ratingContainer}>
            {renderStars(restaurantData.rating)}
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={[styles.actionEdit, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}>
              <Text style={[styles.actionText, {color: '#2ecc71'}]}>Update</Text>
            </Pressable>

            <Pressable style={[styles.actionHide, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]}>
              <Text style={[styles.actionText, {color: '#3498db'}]}>{restaurantData.isActive ? 'Disable' : 'Enable'}</Text>
            </Pressable>
          </View>

        </View>

        {/* Reviews Section */}
        <View style={[styles.reviewsSection, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
          <Text style={[styles.reviewsTitle, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>Customer Reviews</Text>
          {restaurantData.reviews.map(review => (
            <View key={review.id} style={[styles.reviewCard, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
              <View style={styles.reviewHeader}>
                <Text style={[styles.reviewUsername, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{review.username}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={[styles.reviewComment, {color: darkMode ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)'}]}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
  },

  restaurantImage: 
  {
    width: '96%',
    height: 250,
    resizeMode: 'cover',
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center'
  },

  detailsCard: 
  {
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    marginTop: 10,
  },

  restaurantName: 
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1
  },

  infoRow: 
  {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  infoItem: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },

  infoText: 
  {
    color: '#666',
    fontSize: 14,
    letterSpacing: 1
  },

  ratingContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  reviewsSection: 
  {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 15
  },

  reviewsTitle: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', 
    letterSpacing: 1
  },

  reviewCard: 
  {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },

  reviewHeader: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  reviewUsername: 
  {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1
  },

  reviewRating: 
  {
    flexDirection: 'row'
  },

  reviewComment: 
  {
    fontSize: 14,
    letterSpacing: .3
  },

  actionButtons:
  {
    position: 'absolute',
    right: 10,
    top: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10
  },

  actionEdit:
  {
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 3,
    width: 65
  },

  actionHide:
  {
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 3,
    width: 65
  },

  actionText:
  {
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: 900
  }
});

export default RestaurantDetailsScreen;