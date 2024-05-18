import React, { useEffect, useState } from 'react';
import { Badge } from 'react-native-elements';
import { View, Text, TextInput, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import BellIcon from "../assets/icons/notification/1x/baseline_notifications_black_48dp.png";
import QRCodeIcon from "../assets/icons/qr_code_scanner.png";
import OrderModal from '../components/OrderModal';
import axios from 'axios';
import orders from '../_lib/api/apiSilde';


export default function OrderListScreen() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {

        setSelectedOrder(null);
        setModalVisible(false);
    };
    const handleOpenModal = (order) => {

        setSelectedOrder(order);
        setModalVisible(true);
    };





    const [isPriorityVisible, setPriorityVisible] = useState(true);
    const [isNonPriorityVisible, setNonPriorityVisible] = useState(true);
    

    const orderPriority = orders.filter(order => order.priority);
    const orderNonPriority = orders.filter(order => !order.priority);
    const OrderList = ({ data }) => (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            nestedScrollEnabled
        />
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 20
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', margin: 4, fontSize: 20 }}>{item.recipientName}</Text>
                    <Text style={{ color: "#6C7072", margin: 4, fontSize: 16 }}>{item.address}</Text>
                    <Text style={{
                        margin: 4,
                        color: "#6C7072"
                    }}>{item.totalAmount.toLocaleString('vi-VN') + ' VND'}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {item.tags.map((tag, index) => renderBadge(tag, index))}
                    </View>
                </View>
                <Text style={{
                    fontSize: 20,
                    color: "#6C7072"
                }}>{formatTimeReceived(item.timeRecieve)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={BellIcon} style={styles.notificationIcon} />

                <TextInput
                    style={styles.searchBar}
                    placeholder="Tìm kiếm..."
                />
                <Image source={QRCodeIcon} style={styles.QrIcon} />
            </View>
            <FlatList
                data={[orderPriority, orderNonPriority]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const isVisible = index === 0 ? isPriorityVisible : isNonPriorityVisible;
                    const setVisible = index === 0 ? setPriorityVisible : setNonPriorityVisible;

                    return (
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}
                                onPress={() => setVisible(!isVisible)}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{index === 0 ? 'Ưu tiên' : 'Bình thường'}</Text>
                                <Text style={{ color: "#6C7072" }}>Tổng cộng: {item.length}</Text>
                            </TouchableOpacity>
                            {isVisible && <OrderList data={item} />}
                        </View>
                    );
                }}
            />
            <OrderModal
                selectedOrder={selectedOrder}
                isModalVisible={isModalVisible}
                handleCloseModal={handleCloseModal}
            />
        </View>
    );
};


function formatTimeReceived(timeReceived: string): string {
let now = new Date();
let timeReceivedDate = new Date(timeReceived);   
  const diffInSeconds = Math.floor((now.getTime() - timeReceivedDate.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 30) {
    return "Mới nhất";
  } else if (diffInSeconds < 60) {
    return "Gần đây";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút`;
  } else if (diffInHours < 10) {
    return `${diffInHours} giờ`;
  } else if (diffInHours < 24) {
    return "Hôm nay";
  } else if (diffInDays === 1) {
    return "Hôm qua";
  } else if (diffInDays === 2) {
    return "Hôm kia";
  } else if (diffInDays < 30) {
    return `${diffInDays} ngày`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} tháng`;
  } else {
    return `${diffInYears} năm`;
  }
}
const renderBadge = (tag, index) => {
    const badgeColors = {
        'Giao sáng': { background: '#b3e5fc', text: '#0091ea' }, // blue.50 and blue.700 in hex
        'Cả ngày': { background: '#b9f6ca', text: '#00c853' }, // green.50 and green.700 in hex
        'Giao chiều': { background: '#b2ebf2', text: '#006064' },
        'Giờ hành chính': { background: '#d1c4e9', text: '#4527a0' },
        'Hàng dễ vỡ': { background: "#b3e5fc", text: "#4DBCC3" },// orange.50 and orange.700 in hex
        'Giá trị cao': { background: "#ffcdd2", text: "#f44336" },
        'Giao ngoài giờ': { background: "#f0f4c3", text: '#827717' },// orange.50 and orange.700 in he
        'Gọi trước': { background: '#b2ebf2', text: '#0097a7' },
    };

    const colors = badgeColors[tag] || { background: '#f0f4c3', text: '#827717' };
    // CheckCoordinates();
    return (
        <Badge
            key={index}
            value={tag}
            badgeStyle={{
                backgroundColor: colors.background,
                margin: 4,
                minHeight: 25,
                borderRadius: 20
            }}
            textStyle={{ color: colors.text, margin: 1, fontSize: 10 }}
        />
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
    },
    notificationIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    QrIcon: {
        width: 24,
        height: 24,

        marginRight: 10,
    },
});