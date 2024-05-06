import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn !== null) {
                // @ts-ignore
                navigation.navigate('Main');
            }
        };

        checkLoginStatus();
    }, []);
    const handleLogin = async () => {
        // Thực hiện hành động đăng nhập ở đây
        console.log(`Username: ${username}, Password: ${password}`);
        // @ts-ignore
        navigation.navigate('Main');
        try {
            await AsyncStorage.setItem('isLoggedIn', '1');
        } catch (error) {
            // Error saving data
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Đăng nhập" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default LoginScreen;