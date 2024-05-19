// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const PersonalScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const status = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(status === 'true');
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        setModalVisible(false);
        // Navigate to login screen if needed
        navigation.navigate('Login');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/male.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Huy Thanh</Text>
            </View>

            <Text style={styles.sectionHeader}>Tài khoản</Text>
            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('MapScreen')}>
                    <View style={styles.settingContent}>
                        <Icon name="person-outline" size={20} color="#000" />
                        <Text style={styles.settingText}>Cá nhân hoá</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ChangePasswordScreen')}>
                    <View style={styles.settingContent}>
                        <Icon name="lock-closed-outline" size={20} color="#000" />
                        <Text style={styles.settingText}>Mật khẩu</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('NotificationScreen')}>
                    <View style={styles.settingContent}>
                        <Icon name="notifications-outline" size={20} color="#000" />
                        <Text style={styles.settingText}>Thông báo</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeader}>Thêm</Text>
            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('MapScreen')}>
                    <View style={styles.settingContent}>
                        <Icon name="star-outline" size={20} color="#000" />
                        <Text style={styles.settingText}>Đăng ký khu vực</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('MapScreen')}>
                    <View style={styles.settingContent}>
                        <Icon name="help-circle-outline" size={20} color="#000" />
                        <Text style={styles.settingText}>Hỗ trợ</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -5,
                        marginBottom: 40,
                    }}
                >
                    <Text style={{ color: 'gray' }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Bạn có chắc muốn đăng xuất?</Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={{ color: 'gray', textAlign: 'center', fontWeight: 'bold',}}>Hủy</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonLogout]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.textStyle}>Đăng xuất</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
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
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    settingsContainer: {
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    settingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        // shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        // elevation: 2,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#fff',
    },
    buttonLogout: {
        backgroundColor: '#f00',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PersonalScreen;
