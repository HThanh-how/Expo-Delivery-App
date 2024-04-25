import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Animated, Linking, Platform} from 'react-native';
import axios from "axios";
import {Camera, CameraType} from 'expo-camera';

const {width, height} = Dimensions.get('window');

const OrderModal = ({selectedOrder, isModalVisible, handleCloseModal}) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const [coordinates, setCoordinates] = useState(null);
    const [isDetailModalVisible, setDetailModalVisible] = useState(false);

// Hàm xử lý khi nhấn vào nút "Hoàn thành"
    const handleComplete = (event) => {
        event.stopPropagation();
        // console.log('Hoàn thành đơn hàng:', selectedOrder);
        setDetailModalVisible(true);
    };

    const getCoordinates = async (address) => {
        const api_key = "AIzaSyDwwnbEjt8ZWK8DqAi7oyAAtFyXMLLE6iQ";
        // const address = "1600 Amphitheatre Parkway, Mountain View, CA";

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api_key}`);
            if (response.data.status === 'OK') {
                const {lat, lng} = response.data.results[0].geometry.location;
                setCoordinates({lat, lng});
                const url = Platform.select({
                    ios: `maps:${lat},${lng}`,
                    android: `geo:${lat},${lng}?center=${lat},${lng}&q=${lat},${lng}&z=16`,
                });
                if (url) {
                    Linking.openURL(url);
                }
            } else {
                console.error('Unable to retrieve coordinates');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isModalVisible) {


            Animated.spring(scaleValue, {
                toValue: 1,
                // @ts-ignore
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleValue, {
                toValue: 0,
                // @ts-ignore
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isModalVisible]);

    let cameraRef;

    const takePicture = async () => {
        if (cameraRef) {
            const options = {quality: 0.5, base64: true};
            const data = await cameraRef.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleCloseModal}
        >
            <TouchableOpacity
                style={styles.centeredView}
                // activeOpacity={1}
                onPress={(event) => {
                    event.stopPropagation();
                    handleCloseModal();
                }}
            >
                <View style={styles.overlay}/>
                <Animated.View style={[styles.modalView, {transform: [{scale: scaleValue}]}]}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={(event) => {
                            event.stopPropagation();
                            handleCloseModal();
                        }}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    {/*<Text style={styles.modalText} onPress={(event) => event.stopPropagation()}>Thông tin chi tiết của*/}
                    {/*    đơn hàng :</Text>*/}
                    {selectedOrder && (
                        <>
                            <Text style={{color: "#808080", fontStyle: 'italic', marginBottom: 16, marginTop: -10}}
                                  onPress={(event) => event.stopPropagation()}>#{selectedOrder.id}</Text>
                            <Text style={{fontSize: 36, fontWeight: 'bold', marginBottom: 16}}
                                  onPress={(event) => event.stopPropagation()}>{selectedOrder.recipientName}</Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 16
                                }}>
                                <Text style={{fontSize: 16, flexShrink: 1}}
                                      onPress={(event) => event.stopPropagation()}>{selectedOrder.address}</Text>
                                <TouchableOpacity
                                    style={{...styles.directButton}}
                                    onPress={(event) => {
                                        event.stopPropagation();
                                        getCoordinates(selectedOrder.address);
                                    }}
                                >
                                    <Text style={{color: "#0000FF"}}>Chỉ đường</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, marginEnd: 50}}>
                                <Text style={{color: "#808080"}}>{selectedOrder.tags.join(', ')}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}
                                      onPress={(event) => event.stopPropagation()}>Tổng tiền:</Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}
                                      onPress={(event) => event.stopPropagation()}>{selectedOrder.totalAmount.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</Text>
                            </View>
                        </>
                    )}
                    {isDetailModalVisible && (
                        <View>
                            <Camera
                                ref={ref => {
                                    cameraRef = ref;
                                }}
                                style={{flex: 1, width: '100%'}}
                            />
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={takePicture}
                            >
                                <Text style={styles.textStyle}>Chụp ảnh</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={{...styles.openButton, backgroundColor: "#4F46E5"}}
                            onPress={(event) => {
                                event.stopPropagation();
                                Linking.openURL(`tel:${selectedOrder.phoneNumber}`);
                            }}
                        >
                            <Text style={styles.textStyle}>Gọi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{...styles.openButton, backgroundColor: "#4CAF50"}}
                            onPress={handleComplete}
                        >
                            <Text style={styles.textStyle}>Hoàn thành</Text>
                        </TouchableOpacity>
                    </View>


                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

export default OrderModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        width: '100%',
        // height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    captureButton: {
        flex: 0,
        backgroundColor: '#4F46E5',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        // backgroundColor: "#2196F3",
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: "black",
        fontWeight: "bold",
    },
    modalView: {
        flex: 0,
        flexShrink: 1,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    directButton: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 5,
        padding: 5,
        elevation: 2,
        color: "#0000FF", // Màu chữ xanh dương
        borderColor: "#0000FF", // Viền màu xanh dương
        borderWidth: 1, // Độ dày của viền
    },
    openButton: {
        backgroundColor: "#4F46E5",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        // elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    detailModalView: {
        // Thêm các thuộc tính style cho modal chi tiết tại đây
        // Ví dụ:
        width: '100%',
        // height: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
});