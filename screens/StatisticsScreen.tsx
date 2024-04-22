import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatisticsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thống kê</Text>
            <Text style={styles.info}>Tổng số đơn hàng: 100</Text>
            <Text style={styles.info}>Đơn hàng hoàn thành: 80</Text>
            <Text style={styles.info}>Đơn hàng chưa hoàn thành: 20</Text>
            {/* Thêm các thông tin thống kê khác tại đây */}
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

export default StatisticsScreen;