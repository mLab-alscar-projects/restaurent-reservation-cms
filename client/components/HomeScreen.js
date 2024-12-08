import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const HomeScreen = ({ navigation }) => {
 
  return (
    <View style={styles.Parent}>
        {/* FIRST CHILD */}
        <View style={styles.firstChild}>
            <View style={styles.child}>

                <Pressable style={styles.progressCont}>

                </Pressable>

            </View>
            {/* <View style={styles.skewedBottom} /> */}
        </View>
        {/* ENDS */}

        {/* SECOND CHILD */}
        <View style={styles.secondChild}>

            {/* NAVIGATION BUTTONS */}
            {/* <View style={styles.navigationWrapper}>
                <Pressable style={styles.button}><Text style={styles.text}>KFC</Text></Pressable>
                <Pressable style={styles.button}><Text style={styles.text}>MacD</Text></Pressable>
                <Pressable style={styles.button}><Text style={styles.text}>Chicken</Text></Pressable>
            </View> */}
            {/* ENDS */}

            {/* <Text style={styles.subTitle}>Restaurant Tables</Text> */}

            {/* UPDATES TABS */}
            <View style={styles.tabWrapper}>
                <Pressable style={styles.tab}>

                </Pressable>
                <Pressable style={styles.tab}>

                </Pressable>
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
        height: '50%',
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#97CBDC',
        position: 'relative',
    },

    child: 
    {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 10,
        gap: 20,
    },
    
    progressCont: 
    {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 200,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        zIndex: 1,
        position: 'relative'
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
        flexDirection: 'row',
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
        height: 320,
        width: 200,
        backgroundColor: '#7BC5C1',
        borderRadius: 7,
        padding: 10,
        zIndex: 1
    },

// ENDS
    
});

export default HomeScreen;