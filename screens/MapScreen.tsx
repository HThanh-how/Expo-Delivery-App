import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const MapScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();


    const handleLogin = async () => {

        navigation.navigate('Main');

    };

    return (
        <ImageBackground source={require('../assets/unavailable.png')} style={styles.background}>
            <View style={styles.container}>


                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Quay về</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logoContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FF6F00',
    },
    tagline: {
        fontSize: 16,
        color: '#FF6F00',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingLeft: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    inputPassword: {
        flex: 1,
    },
    forgotPassword: {
        width: '80%',
        alignItems: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#666',
        textDecorationLine: 'underline',
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#6F00FF',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 120,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MapScreen;
