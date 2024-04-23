import React, {useState} from 'react';
import {Badge} from 'react-native-elements';
import {View, Text, TextInput, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, Modal} from 'react-native';
import BellIcon from "../assets/icons/notification/1x/baseline_notifications_black_48dp.png";
import OrderModal from '../components/OrderModal';

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
    const orders = [
        // Các đơn hàng hiện tại...
        {
            id: '5',
            recipientName: 'Người nhận 5',
            address: 'Địa chỉ 5',
            totalAmount: 500000,
            tags: ['Giao sáng', 'Cả ngày', 'Giao chiều', 'Giờ hành chính', 'Hàng dễ vỡ', 'Giá trị cao', 'Giao ngoài giờ'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'new',
        },
        {
            id: '453',
            recipientName: 'Người nhận 5',
            address: 'Địa chỉ 5',
            totalAmount: 500000,
            tags: ['Giao sáng', 'Cả ngày', 'Giao chiều', 'Giờ hành chính', 'Hàng dễ vỡ', 'Giá trị cao', 'Giao ngoài giờ'],
            paymentCompleted: true,
            isPickUp: true,
            priority: false,
            status: 'new',
        },
        {
            id: '123',
            recipientName: 'Người nhận 5',
            address: 'Địa chỉ 5',
            totalAmount: 500000,
            tags: ['Giao sáng', 'Cả ngày', 'Giao chiều', 'Giờ hành chính', 'Hàng dễ vỡ', 'Giá trị cao', 'Giao ngoài giờ'],
            paymentCompleted: true,
            isPickUp: true,
            priority: false,
            status: 'new',
        },
        {
            id: '6',
            recipientName: 'Người nhận 6',
            address: 'Địa chỉ 6',
            totalAmount: 600000,
            tags: ['tag11', 'tag12'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'late',
        },
        {
            id: '7',
            recipientName: 'Người nhận 7',
            address: 'Địa chỉ 7',
            totalAmount: 700000,
            tags: ['tag13', 'tag14'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'delete',
        },
        {
            id: '8',
            recipientName: 'Người nhận 8',
            address: 'Địa chỉ 8',
            totalAmount: 800000,
            tags: ['tag15', 'tag16'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'change',
        },
        {
            id: '9',
            recipientName: 'Người nhận 9',
            address: 'Địa chỉ 9',
            totalAmount: 900000,
            tags: ['tag17', 'tag18'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'normal',
        },
        {
            id: '10',
            recipientName: 'Người nhận 10',
            address: 'Địa chỉ 10',
            totalAmount: 1000000,
            tags: ['tag19', 'tag20'],
            paymentCompleted: true,
            isPickUp: true,
            priority: true,
            status: 'normal',
        },
    ];


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

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20
        }}>
            <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold', margin: 4, fontSize: 20}}>{item.recipientName}</Text>
                <Text style={{color: "#6C7072", margin: 4, fontSize: 16}}>{item.address}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {item.tags.map((tag, index) => renderBadge(tag, index))}
                </View>
            </View>
            <Text style={{
                fontSize: 20,
                color: "#6C7072"
            }}>{item.totalAmount.toLocaleString('vi-VN') + ' VND'}</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Tìm kiếm..."
                />
                <Image source={BellIcon} style={styles.notificationIcon}/>
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
                                style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}
                                onPress={() => setVisible(!isVisible)}
                            >
                                <Text style={{fontWeight: 'bold', fontSize: 24}}>{index === 0 ? 'Ưu tiên' : 'Bình thường'}</Text>
                                <Text style={{color: "#6C7072"}}>Tổng cộng: {item.length}</Text>
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

const renderBadge = (tag, index) => {
    const badgeColors = {
        'Giao sáng': {background: '#b3e5fc', text: '#0091ea'}, // blue.50 and blue.700 in hex
        'Cả ngày': {background: '#b9f6ca', text: '#00c853'}, // green.50 and green.700 in hex
        'Giao chiều': {background: '#b2ebf2', text: '#006064'},
        'Giờ hành chính': {background: '#d1c4e9', text: '#4527a0'},
        'Hàng dễ vỡ': {background: "#b2ebf2", text: "#4DBCC3"},// orange.50 and orange.700 in hex
        'Giá trị cao': {background: "#ffcdd2", text: "#f44336"},
        'Giao ngoài giờ': {background: "#f0f4c3", text: '#827717'}// orange.50 and orange.700 in he
    };

    const colors = badgeColors[tag] || {background: '#f0f4c3', text: '#827717'};

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
            textStyle={{color: colors.text, margin: 1, fontSize: 10}}
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
        marginRight: 10,
    },
});