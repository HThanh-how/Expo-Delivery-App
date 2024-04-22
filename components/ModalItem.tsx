import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList, StyleSheet, Image, Modal } from 'react-native';
import BellIcon from "../assets/icons/notification/1x/baseline_notifications_black_48dp.png";

// ...

export default function OrderListScreen() {
    // ...

    // Thêm state để theo dõi đơn hàng hiện tại được chọn và trạng thái hiển thị của Modal
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    // ...

    const handlePressOrder = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    // ...

    return (
        <View style={styles.container}>
            {/* Thêm Modal để hiển thị thông tin chi tiết của đơn hàng */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Thông tin chi tiết của đơn hàng:</Text>
                        {selectedOrder && (
                            <>
                                <Text>ID: {selectedOrder.id}</Text>
                                <Text>Người nhận: {selectedOrder.recipientName}</Text>
                                <Text>Địa chỉ: {selectedOrder.address}</Text>
                                <Text>Tổng tiền: {selectedOrder.totalAmount}</Text>
                                {/* Thêm thông tin khác của đơn hàng nếu cần */}
                            </>
                        )}
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.textStyle}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Các thành phần khác của màn hình */}
            {/* ... */}
        </View>
    );
};

// ...


// ...

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});