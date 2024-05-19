import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
        <ScrollView style={styles.container}>
            {/* <Text style={styles.title}>Thống kê</Text> */}

            <PieChart
                data={data}
                width={screenWidth - 32}
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

            <View style={styles.incomeContainer}>
                <View style={[styles.statBox, styles.incomeBox]}>
                    <Text style={styles.statTitle}>Thu nhập hôm nay</Text>
                    <Text style={styles.statValue}>2 482 000 VND</Text>
                </View>
                <View style={[styles.statBox, styles.monthBox]}>
                    <Text style={styles.statTitle}>Tháng này</Text>
                    <Text style={styles.statValue}>23 982 240 VND</Text>
                </View>
                <View style={[styles.statBox, styles.bonusBox]}>
                    <Text style={styles.statTitle}>Thưởng năng suất</Text>
                    <Text style={styles.statValue}>+624 000 VND</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <View style={[styles.statBox, styles.orderBox]}>
                    <Text style={styles.statText}>Lượng đơn</Text>
                    <Text style={styles.statValue}>642</Text>
                </View>
                <View style={[styles.statBox, styles.efficiencyBox]}>
                    <Text style={styles.statText}>Hiệu suất</Text>
                    <Text style={styles.statValue}>94.3%</Text>
                </View>
            </View>

            <View style={styles.statisticsContainer}>
                <View style={[styles.statBox, styles.delayBox]}>
                    <Text style={styles.statText}>Trễ</Text>
                    <Text style={styles.statValue}>18</Text>
                </View>
                <View style={[styles.statBox, styles.rateBox]}>
                    <Text style={styles.statText}>Tỉ lệ</Text>
                    <Text style={styles.statValue}>3.4%</Text>
                </View>
            </View>

        
        </ScrollView>
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
        textAlign: 'center',
    },
    statisticsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    incomeContainer: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
    statBox: {
        flex: 1,
        padding: 20,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    incomeBox: {
        backgroundColor: '#002984',
    },
    monthBox: {
        backgroundColor: '#002984',
    },
    bonusBox: {
        backgroundColor: '#002984',
    },
    orderBox: {
        backgroundColor: '#1e88e5',
    },
    efficiencyBox: {
        backgroundColor: '#ffa000',
    },
    delayBox: {
        backgroundColor: '#ff5252',
    },
    rateBox: {
        backgroundColor: '#ffca28',
    },
    statText: {
        color: '#fff',
        fontSize: 16,
    },
    statTitle: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    statValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
});

export default StatisticsScreen;
