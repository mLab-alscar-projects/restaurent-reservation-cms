import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, Pressable, StatusBar, ActivityIndicator } from 'react-native';

// ICONS
import { StarIcon, MapPinIcon, ClockIcon, Radiation } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

// STORAGE
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../AuthContext';

const RestaurantDetailsScreen = ({navigation, route}) => {


  const { restaurant, darkMode } = route.params;
  
  const { fetchRestaurants } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(restaurant.isActive);
  const [loading, setLoader] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // FETCH REVIEWS
  useEffect(() => {

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(`https://lumpy-clover-production.up.railway.app/api/reviews/restaurant/${restaurant._id}`, {headers: { Authorization : `Bearer ${token}`}});

        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Successfully fetched reviews",
            position: "bottom",
          });

          const reviewsData = response.data.reviews;
          setReviews(reviewsData);
          
          // CALCULATE REVIEWS
          const totalRating = reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0);
          const calculatedAverage = reviewsData.length > 0 ? totalRating / reviewsData.length : 0;
          setAverageRating(calculatedAverage);
        }
      } catch (error) {
        
        const errMessage = error.response?.data || `Failed t fetch reviews.${error.message}`;
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errMessage,
          position: "bottom",
        });
        console.error(errMessage);

      } finally {
        setLoading(false);
      }

    }

    fetchReviews();

  }, [restaurant._id]);

   // EDIT RESTAURANT
   const handleEdit = async () => {
    setLoader(true);

    const updatedData = {
      isActive: !isActive,
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `https://acrid-street-production.up.railway.app/api/v2/updateRestaurant/${restaurant._id}`,
        {updatedData},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setIsActive(updatedData.isActive); 
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Restaurant status updated successfully",
          position: "bottom",
        });

        await fetchRestaurants();
      }
    } catch (error) {
      console.error("Error updating restaurant status:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update restaurant status",
        position: "bottom",
      });
    } finally {
      setLoader(false);
    }
  };


  // RENDER STARS
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

      <StatusBar backgroundColor="#3498db"/>
      
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
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{averageRating} / 5</Text>
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
              <Text style={[styles.infoText, {color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)'}]}>{isActive ? 'Active' : 'Not Active'}</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            {renderStars(averageRating)}
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={[styles.actionEdit, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]} onPress={()=> navigation.navigate('RestaurantFormScreen', {restaurant})}>
              <Text style={[styles.actionText, {color: '#2ecc71'}]}>Update</Text>
            </Pressable>

            <Pressable style={[styles.actionHide, { backgroundColor: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)' }]} onPress={handleEdit}>
              <Text style={[styles.actionText, {color: '#3498db'}]}>{loading ? <ActivityIndicator size={'small'} color={restaurant.color} /> : isActive ? 'Disable' : 'Enable'}</Text>
            </Pressable>
          </View>

        </View>

        {/* REVIEWS SECTION */}
        <View style={[styles.reviewsSection, { backgroundColor: darkMode ? '#444' : '#ffffff' }]}>
          <Text
            style={[
              styles.reviewsTitle,
              { color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)' },
            ]}
          >
            Customer Reviews
          </Text>
          {reviews.length === 0 ? (
            <Text style={{ color: darkMode ? '#ccc' : '#333' }}>No reviews available.</Text>
          ) : (
            reviews.map((review) => (
              <View
                key={review._id}
                style={[styles.reviewCard, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}
              >
                <View style={styles.reviewHeader}>
                  <Text
                    style={[
                      styles.reviewUsername,
                      { color: darkMode ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .5)' },
                    ]}
                  >
                    {review.heading}
                  </Text>
                  <View style={styles.reviewRating}>{renderStars(review.rating)}</View>
                </View>
                <Text
                  style={[
                    styles.reviewComment,
                    { color: darkMode ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)' },
                  ]}
                >
                  {review.message}
                </Text>
                <Text
                  style={[
                    styles.reviewComment,
                    { color: darkMode ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)' },
                  ]}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
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
    width: 'auto'
  },

  actionHide:
  {
    paddingHorizontal: 7,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 3,
    width: 'auto'
  },

  actionText:
  {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 900,
    textAlign: 'center'
  }
});

export default RestaurantDetailsScreen;