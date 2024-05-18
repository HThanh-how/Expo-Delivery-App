import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn !== null) {
                navigation.navigate('Main');
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        console.log(`Username: ${username}, Password: ${password}`);
        navigation.navigate('Main');
        try {
            await AsyncStorage.setItem('isLoggedIn', '1');
        } catch (error) {
            // Error saving data
        }
    };

    return (
        <ImageBackground source={require('../assets/login.png')} style={styles.background}>
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        placeholderTextColor="#666"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#666"
                                style={{ marginRight: 4 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
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
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginScreen;
