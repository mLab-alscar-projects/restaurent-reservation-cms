import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';

// SCREENS
import SplashScreenChild from './SplashScreen';
import AuthContext from '../AuthContext';


// ICONS
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {

    const { handleLogin } = useContext(AuthContext);
    const { fetchRestauirants } = useContext(AuthContext);

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
                fetchRestauirants();
                navigation.replace('Home');
            }
        } catch (error) {
            setLoading(false); 
            console.error('Login failed:', error);
        }
    };
    // ENDS

    return (
        <View style={styles.Parent}>
            {/* FIRST CHILD */}
            <View style={styles.firstChild}>
                <View style={styles.sibling}>
                    <SplashScreenChild />
                </View>
                <View style={styles.skewedBottom} />
            </View>

            {/* SECOND CHILD */}
            <View style={styles.secondChild}>
                {/* EMAIL */}
                <View style={styles.inputWrapper}>
                    <View style={styles.label}>
                        <Zocial name='email' size={20} color={'rgba(0, 0, 0,.5)'} />
                        <Text style={styles.labelText}>Email</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* PASSWORD */}
                <View style={styles.inputWrapper}>
                    <View style={styles.label}>
                        <MaterialIcons name='lock' size={20} color={'rgba(0, 0, 0,.5)'} />
                        <Text style={styles.labelText}>Password</Text>
                    </View>
                    <TextInput
                        style={styles.input}
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
        backgroundColor: '#f9f9f9',
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
        color: 'rgba(0, 0, 0,.5)',
        borderColor: 'rgba(0, 0, 0,.5)',
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
        borderRadius: 10,
        backgroundColor: '#7BC5C1',
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: 1,
        color: 'rgba(0, 0, 0,.5)',
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
});

export default LoginScreen;