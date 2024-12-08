import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
 
  return (
    <View style={styles.Parent}>

        {/* FIRST CHILD */}
        <View style={styles.firstChild}>
            
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: 0,
    margin: 0,
    },
    // ENDS

// FIRST
    firstChild: 
    {
 
    },

// ENDS
    
    
// SECOND
    secondChild: 
    {

    },

// ENDS
    
    
// LAST
    lastChild: 
    {
   
    },

  
// ENDS
 
});

export default LoginScreen;