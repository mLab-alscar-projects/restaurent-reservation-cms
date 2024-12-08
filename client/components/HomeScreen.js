import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
 
  return (
    <View style={styles.Parent}>
      
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

export default HomeScreen;