import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

const SplashScreenChild = () => {
 
  return (
    <View style={styles.Parent}>
        <View style={styles.firstChild}>
            <Image source={require('../assets/splashIcon.jpg')} style={styles.image} />
            <Text style={styles.Text}>Alscar Tables</Text>
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
        // backgroundColor: '#f9f9f9',
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


    // TEXT
    Text: 
    {
        fontSize: 24,
        letterSpacing: 3,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        width: '100%',
        textAlign: 'center',
        color: '#231934',
        // transform: [{ rotate: '-8deg' }], 
    },

    // ENDS
    
    
});

export default SplashScreenChild;