import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

const SplashScreenChild = () => {
 
  return (
    <View style={styles.Parent}>
        <View style={styles.firstChild}>
            <Image source={require('../assets/splashIcon.jpg')} style={styles.image} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

    // PARENT
    Parent: 
    {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 0,
        margin: 0,
    },
    // ENDS

    // FIRST
    firstChild: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: 30
    },

    // ENDS
    
    
    // IMAGE
    image: 
    {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    // ENDS
    
    
});

export default SplashScreenChild;