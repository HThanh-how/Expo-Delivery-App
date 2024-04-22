import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <Text style={styles.info}>Tên: Nguyễn Văn A</Text>
            <Text style={styles.info}>Email: nva@example.com</Text>
            {/* Thêm các thông tin khác tại đây */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default PersonalScreen;