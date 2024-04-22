import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = () => {
        // Thực hiện hành động đăng nhập ở đây
        console.log(`Username: ${username}, Password: ${password}`);
        // @ts-ignore
        navigation.navigate('Main');
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