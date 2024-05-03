import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
    const cameraRef = useRef(null);

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = {quality: 0.5, base64: true};
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    return (
        <View style={{flex: 1, width: '100%'}}>
            <Camera ref={cameraRef} style={{flex: 1, width: '100%'}} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleTakePicture} style={styles.button}>
                    <Text style={styles.text}>Chụp ảnh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraScreen;