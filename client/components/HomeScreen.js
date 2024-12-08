import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const HomeScreen = ({ navigation }) => {
 
  return (
    <View style={styles.Parent}>
        {/* FIRST CHILD */}
        <View style={styles.firstChild}>
            <View style={styles.child}></View>
            <View style={styles.skewedBottom} />

        </View>
        {/* ENDS */}

        {/* SECOND CHILD */}
        <View style={styles.secondChild}>

            {/* NAVIGATION BUTTONS */}
            <View style={styles.navigationWrapper}>
                <Pressable style={styles.button}><Text style={styles.text}>KFC</Text></Pressable>
                <Pressable style={styles.button}><Text style={styles.text}>MacD</Text></Pressable>
                <Pressable style={styles.button}><Text style={styles.text}>Chicken</Text></Pressable>
            </View>
            {/* ENDS */}

            <Text style={styles.subTitle}>Restaurant Tables</Text>

            {/* UPDATES TABS */}
            <View style={styles.tabWrapper}>
                <Pressable style={styles.tab}><Text>KFC</Text></Pressable>
                <Pressable style={styles.tab}><Text>MacD</Text></Pressable>
                <Pressable style={styles.tab}><Text>Chicken</Text></Pressable>
            </View>
            {/* ENDS */}

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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        height: '100%',
        width: '100%',
    },
// ENDS

// FIRST
    firstChild: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '40%',
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#97CBDC',
        position: 'relative',
    },

    child: 
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50%',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        gap: 20
    },

    navigationWrapper: 
    {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        gap: 5
    },

    button: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '32%',
        backgroundColor: '#7BC5C1',
        borderRadius: 7,
        padding: 10
    },

    text: 
    {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 1
    },

    subTitle: 
    {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 2,
        width: '100%', 

    },

    tabWrapper: 
    {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        gap: 10
    },

    tab: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#7BC5C1',
        borderRadius: 7,
        padding: 10
    },

// ENDS
    
});

export default HomeScreen;