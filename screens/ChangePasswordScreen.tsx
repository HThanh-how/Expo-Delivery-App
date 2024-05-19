import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu không chính xác');
            return;
        }

        // Implement your password change logic here
        // For demo, we assume the password is changed successfully
        await AsyncStorage.setItem('password', newPassword);
        Alert.alert('Thành công', 'Đổi mật khẩu thành công');
        navigation.goBack(); // Go back to the previous screen after changing password
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/male.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Huy Thanh</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu cũ"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu mới"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonChange]}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        marginTop: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonChange: {
        backgroundColor: '#6200EA',
    },
    buttonCancel: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;
