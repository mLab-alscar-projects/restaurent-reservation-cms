import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, StatusBar, ActivityIndicator } from 'react-native';

// SCREENS
import SplashScreenChild from './SplashScreen';
import AuthContext from '../AuthContext';


// ICONS
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {

   const { handleLogin, fetchRestaurants, darkMode, fetchUsers } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // HANDLE LOGIN AND NAVIGATE TO HOME SCREEN
    const handleLoginAndNavigate = async () => {
        setLoading(true);
        try {
            const isLoggedIn = await handleLogin(email, password, setMessage);
            setLoading(false);
            if (isLoggedIn) {
                fetchRestaurants();
                fetchUsers();
                navigation.replace('Home');
            }
        } catch (error) {
            setLoading(false); 
            console.error('Login failed:', error);
        }
    };
    // ENDS

    return (
        <View style={[styles.Parent, { backgroundColor: darkMode ? '#333333' : '#f4f7fa' }]}>
                <StatusBar backgroundColor={'#97CBDC'}/>
            {/* FIRST CHILD */}
            <View style={styles.firstChild}>
                <View style={styles.sibling}>
                    <SplashScreenChild />
                </View>
                <View style={styles.skewedBottom} >
                    <Text style={styles.Text}>Alscar Tables</Text>
                </View>
            </View>

            {/* SECOND CHILD */}
            <View style={styles.secondChild}>
                {/* EMAIL */}
                <View style={styles.inputWrapper}>
                    <View style={styles.label}>
                        <Zocial name='email' size={20} color={darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'} />
                        <Text style={[styles.labelText, { color: darkMode ? '#ffffff' : '#000000' }]}>Email</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { borderColor: darkMode ? '#ffffff' : '#000000', color: darkMode ? '#ffffff' : '#000000' }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* PASSWORD */}
                <View style={styles.inputWrapper}>
                    <View style={styles.label}>
                        <MaterialIcons name='lock' size={20} color={darkMode ? '#ffffff' : 'rgba(0, 0, 0, .5)'} />
                        <Text style={[styles.labelText, { color: darkMode ? '#ffffff' : '#000000' }]}>Password</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { borderColor: darkMode ? '#ffffff' : '#000000', color: darkMode ? '#ffffff' : '#000000' }]}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>

                {/* BUTTON */}
                <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button} onPress={handleLoginAndNavigate}>
                        
                        {
                        !loading ? 
                        <Text style={styles.buttonText}>Login</Text> 
                        : 
                        <ActivityIndicator size="small" color="#0000ff" /> 
                        }

                    </Pressable>

                    {/* MESSAGE */}
                    {message ? <Text style={styles.message}>{message}</Text> : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
        gap: 10,
    },
    firstChild: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CBDC',
        position: 'relative',
    },
    sibling: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    skewedBottom: {
        position: 'absolute',
        bottom: -25,
        width: 380,
        height: 50,
        backgroundColor: '#97CBDC',
        transform: [{ rotate: '-8deg' }],
        zIndex: 10,
    },
    secondChild: {
        width: '100%',
        height: '60%',
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 20
    },
    inputWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingVertical: 10,
    },
    label: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    labelText: {
        fontSize: 16,
        letterSpacing: 1,
        color: 'rgba(0, 0, 0,.5)',
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 3,
        width: '100%',
        height: 40,
    },
    buttonWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 7,
        backgroundColor: '#97CBDC',
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: 2,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        letterSpacing: 1,
        color: 'red',
    },

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

export default LoginScreen;