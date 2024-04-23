import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const OrderModal = ({ selectedOrder, isModalVisible, handleCloseModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleCloseModal}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPressOut={handleCloseModal}
            >
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
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#F194FF" }}
                        onPress={() => {/* Thêm hành động khi nhấn vào button này */}}
                    >
                        <Text style={styles.textStyle}>Button hành động 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#F194FF" }}
                        onPress={() => {/* Thêm hành động khi nhấn vào button này */}}
                    >
                        <Text style={styles.textStyle}>Button hành động 2</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default OrderModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        // alignItems: "center",
        marginTop: 22,
        // marginBottom: 70
    },
    modalView: {
        width: width, // chiều ngang bằng màn hình
        height: height  / 2 , // chiều cao 2/3 màn hình
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
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