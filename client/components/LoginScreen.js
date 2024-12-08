import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

// SCREENS
import SplashScreenChild from './SplashScreen';

// ICONS
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.secondChild}>

            {/* EMAIL */}
            <View style={styles.inputWrapper}>
                <View style={styles.label}> 
                    <Zocial name='email' size={20} color={'rgba(0, 0, 0,.5)'}/>
                    <Text style={styles.labelText}>Email</Text>
                </View>
                <TextInput
                    style={styles.input}
                />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
                <View style={styles.label}> 
                    <MaterialIcons name='lock' size={20} color={'rgba(0, 0, 0,.5)'}/>
                    <Text style={styles.labelText}>Password</Text>
                </View>
                <TextInput
                    style={styles.input}
                />
            </View>

            {/* BUTTON */}
            <View style={styles.buttonWrapper}>

                <Pressable style={styles.button}> 
                    <Text style={styles.ButtonText}>Login</Text>
                </Pressable>
        
            </View>
        

        </View>
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
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    inputWrapper: 
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingVertical: 10,
    },
    
    label: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    labelText: 
    {
        fontSize: 16,
        letterSpacing: 1,
        color: 'rgba(0, 0, 0,.5)'
    },
    
    input: 
    {
        fontSize: 16,
        borderBottomWidth: 3,
        color: 'rgba(0, 0, 0,.5)',
        borderColor: 'rgba(0, 0, 0,.5)',
        width: "100%",
    },
    
    buttonWrapper: 
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

    button: 
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#7BC5C1'
    },
// ENDS
    
    
// LAST
    lastChild: 
    {
   
    },

  
// ENDS
 
});

export default LoginScreen;