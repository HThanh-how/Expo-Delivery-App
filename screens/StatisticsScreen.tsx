import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = () => {
    const data = [
        { name: 'Đã giao', population: 78, color: '#00bfa5', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Chưa giao', population: 42, color: '#7f8c8d', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Đã lấy', population: 23, color: '#3498db', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Chưa lấy', population: 10, color: '#95a5a6', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Đơn trễ', population: 5, color: '#e74c3c', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thống kê</Text>

            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            <View style={styles.statisticsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Thu nhập hôm nay</Text>
                    <Text style={styles.statValue}>2 482 000 VND</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Tháng này</Text>
                    <Text style={styles.statValue}>23 982 240 VND</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Thưởng năng suất</Text>
                    <Text style={styles.statValue}>+624 000 VND</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Lượng đơn</Text>
                    <Text style={styles.statValue}>642</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Hiệu suất</Text>
                    <Text style={styles.statValue}>94.3%</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Trễ</Text>
                    <Text style={styles.statValue}>18</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Tỉ lệ</Text>
                    <Text style={styles.statValue}>3.4%</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.info}>Tổng số đơn hàng: 158</Text>
                <Text style={styles.info}>Đã giao: 78</Text>
                <Text style={styles.info}>Chưa giao: 42</Text>
                <Text style={styles.info}>Đã lấy: 23</Text>
                <Text style={styles.info}>Chưa lấy: 10</Text>
                <Text style={styles.info}>Đơn trễ: 5</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statisticsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#1e88e5',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    statText: {
        color: '#fff',
        fontSize: 16,
    },
    statValue: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default StatisticsScreen;
