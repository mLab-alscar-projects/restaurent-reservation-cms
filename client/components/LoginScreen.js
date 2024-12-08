import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import SplashScreenChild from './SplashScreen';

const LoginScreen = ({ navigation }) => {
 
  return (
    <View style={styles.Parent}>

        {/* FIRST CHILD */}
        <View style={styles.firstChild}>
            <View style={styles.sibling}>
                <SplashScreenChild />
            </View>
            <View style={styles.skewedBottom} />
        </View>
        {/* ENDS */}

        {/* SECOND CHILD */}
        <View style={styles.secondChild}></View>
        {/* ENDS */}
      
    </View>
  );
};

const styles = StyleSheet.create({

    // PARENT
    Parent: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: 0,
    margin: 0,
    gap: 10
    },
    // ENDS
    
    // FIRST
    firstChild: 
    {
        width: '100%',
        height: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CBDC',
        position: 'relative',
    },

    sibling: 
    {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },

    skewedBottom: 
    {
        position: 'absolute',
        bottom: -25,
        width: 380,
        height: 50,
        backgroundColor: '#97CBDC',
        transform: [{ rotate: '-8deg' }], 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
        zIndex: 10
      },

// ENDS
    
    
// SECOND
    secondChild: 
    {
        width: '100%',
        height: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9
    },

// ENDS
    
    
// LAST
    lastChild: 
    {
   
    },

  
// ENDS
 
});

export default LoginScreen;