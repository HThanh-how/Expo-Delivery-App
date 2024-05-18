import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = () => {
    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const options = {quality: 0.5, base64: true};
            const data = await cameraRef.current.takePictureAsync(options);
            setPhoto(data.uri);
        }
    };

    const handleSavePicture = async () => {
        if (photo) {
            await AsyncStorage.setItem('@photo', photo);
        }
    };

    const handleRetakePicture = () => {
        setPhoto(null);
    };

    return (
        <View style={styles.container}>
        <Camera ref={cameraRef} style={styles.camera} />
{photo && (
    <View style={styles.overlay}>
        <Image source={{ uri: photo }} style={styles.camera} />
    </View>
)}
            <View style={styles.buttonContainer}>
                {!photo&&<TouchableOpacity onPress={handleTakePicture} style={styles.captureButton}>
    <View style={styles.innerCaptureButton} />
</TouchableOpacity>}
                {photo && (
                    <>
                        <TouchableOpacity onPress={handleSavePicture} style={styles.button}>
                            <Text style={styles.text}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRetakePicture} style={styles.button}>
                            <Text style={styles.text}>Chụp lại</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    imagePreview: {
        flex: 1,
        width: '100%',
    },
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
        color: 'gray',
    },
    captureButton: {
    alignSelf: 'center',
        alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'white',
    height: 70,
    width: 70,
    justifyContent: 'center',
    marginBottom: 30,
},
innerCaptureButton: {
    backgroundColor: 'white',
    borderRadius: 35,
    height: 59,
    width: 59,
},
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
},
});

export default CameraScreen;