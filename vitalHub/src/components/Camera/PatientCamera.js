import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraView  } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';


import * as MediaLibrary from "expo-media-library"

import { FontAwesome } from "@expo/vector-icons"

import { Ionicons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

import { ButtonLargeConfirmModal } from '../Button/Button';
import { CardCancelLess, RefazerLess } from '../Descriptions/Descriptions';

import { LastPhoto } from './Style';

import * as ImagePicker from "expo-image-picker"




export default function PatientCam({ navigation }) {

    const cameraRef = useRef(null)

    const [openModal, setOpenModal] = useState(false)

    const [photo, setPhoto] = useState(null)

    const [tipoCamera, setTipoCamera] = useState('back')

    const [flashMode, setFlashMode] = useState('off');

    const [zoom, setZoom] = useState(0)

    const [lastPhoto, setLastPhoto] = useState(null)

    useEffect(() => {

        (async () => {

            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

        })();

    }, [])

    useEffect(() => {
        GetLatestPhoto()
    }, [])


    async function GetLatestPhoto() {

        const { assets } = await MediaLibrary.getAssetsAsync({ sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 })

        // console.log(assets)

        if (assets.length > 0) {
            setLastPhoto(assets[0].uri)
        }

    }

    async function SelectImageGallery() {
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)

            setOpenModal(true)
        }

    }


    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();

            setPhoto(photo.uri)

            setOpenModal(true)
        }
    }

    async function ClearPhoto() {

        setPhoto(null)

        setOpenModal(false)

    }

    async function UploadPhoto() {

        // console.log(photo)
        navigation.navigate("Main", { photoUri: photo, screen: "PatientProfile" });

    }

    const changeZoom = (event) => {
        if (event.nativeEvent.scale > 1 && zoom < 1) {
            setZoom(zoom + 0.002);
        }
        if (event.nativeEvent.scale < 1 && zoom > 0) {
            setZoom(zoom - 0.02);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PinchGestureHandler onGestureEvent={(event) => { changeZoom(event) }}>
                <View style={styles.container}>

                    <CameraView
                        ref={cameraRef}
                        zoom={zoom}
                        style={styles.camera}
                        facing={tipoCamera}
                        ratio='16:9'
                        autoFocus={true}
                        whiteBalance={'shadow'}
                        flash={flashMode}
                    >

                        <TouchableOpacity style={styles.btnClear} onPress={() => { navigation.replace("PatientProfile") }} >
                            <FontAwesome name="close" size={23} color={"#fff"} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnFlip}
                            onPress={() => setTipoCamera(tipoCamera == 'front' ? 'back' : 'front')}
                        >

                            <Ionicons name="camera-reverse" size={32} color="white" />

                        </TouchableOpacity>

                        <View style={styles.viewFlip}>

                            {
                                lastPhoto !== null ?

                                    <TouchableOpacity
                                        style={styles.btnGallery}
                                        onPress={() => SelectImageGallery()}
                                    >
                                        <LastPhoto source={{ uri: lastPhoto }} />
                                    </TouchableOpacity>

                                    :

                                    null

                            }


                            <TouchableOpacity style={styles.btnCapture} onPress={() => CapturePhoto()}>
                                <Entypo name="circle" size={45} color="#404040" />
                                {/* #E8E8E8 */}
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.btnFlash}
                                onPress={() => setFlashMode(flashMode === 'off'
                                    ? 'on'
                                    : 'off')}
                            >

                                {flashMode === 'on'? <Ionicons name="flash" size={23} color="white" /> : <Ionicons name="flash-off" size={24} color="white" />}

                            </TouchableOpacity>



                            <Modal animationType='slide' transparent={false} visible={openModal}>

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>

                                    <View stye={{ margin: 10, flexDirection: "row" }}>
                                        {/* Botoes de controle */}
                                    </View>

                                    <Image
                                        style={{ width: "95%", height: 600, borderRadius: 12, marginTop: 35, }}
                                        source={{ uri: photo }}
                                    />

                                    <View style={{ margin: 10, flexDirection: 'column', width: "95%", gap: 2, }}>

                                        {/* Botoes de controle */}
                                        {/* <TouchableOpacity style={styles.btnClear} onPress={() => ClearPhoto()}>
                                    <FontAwesome name="trash" size={25} color={"#ff0000"} />
                                </TouchableOpacity> */}

                                        <ButtonLargeConfirmModal text={"Confirmar"} onPress={() => UploadPhoto()} />

                                        <RefazerLess onPressCancel={() => navigation.replace("PatientCamera")} text={"Refazer"} />

                                    </View>

                                </View>
                            </Modal>


                        </View>

                    </CameraView>
                </View>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        width: "100%",
        height: "80%",
        flex: 1,
    },
    viewFlip: {
        flex: 1,
        backgroundColor: "trasparent",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 5
    },
    btnFlip: {
        padding: 20,
        // marginBottom: 10,
        marginLeft: "80%",
        marginTop: -68,
    },

    btnGallery: {
        padding: 20,
        marginBottom: 10,
        marginRight: -0,
    },

    txtFlip: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 20
    },
    btnCapture: {
        // padding: 20,
        margin: 20,
        borderRadius: 50,
        backgroundColor: "white",

        width: 55,
        height: 55,

        marginBottom: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnFlash: {
        padding: 20,
        marginBottom: 19,
        borderRadius: 20,
        // backgroundColor: "#121212",

        alignItems: "center",
        justifyContent: "center",
    },

    btnClear: {
        backgroundColor: 'transparent',
        padding: 20,
        marginRight: '80%',
        marginTop: 35,

        alignItems: "center",
        justifyContent: "center",
    },

    btnUpload: {
        backgroundColor: 'transparent',
        padding: 20,

        alignItems: "center",
        justifyContent: "center",
    }

});
