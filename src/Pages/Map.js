import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Input } from '@rneui/themed';
import { request, PERMISSIONS, checkLocationAccuracy } from 'react-native-permissions';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, onUserLocationChange, } from "react-native-maps";
import GetLocation from 'react-native-get-location';
import RNPickerSelect from 'react-native-picker-select';
import { axiosCliente } from "../Axios/axios";
import Modal from "react-native-modal";
import axios from "axios";

export function Map() {

    const [position, setPosition] = useState(null);
    const [areaTerreno, setAreaTerreno] = useState('');
    const [visible, setVisible] = useState(false);
    const [area, setArea] = useState([
    ])
    const [markers, setMarkers] = useState([])
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            //18.970834723718863, -99.21006257250195
            .then(location => {
                console.log('Netrooo');
                console.log(location);
                setPosition({ latitud: 18.970834723718863, longitud: -99.21006257250195 })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        if (markers) {
            console.log('Netrooo');
            setArea([...markers])
        }
    }, [])


    // hooks
    const sheetRef = useRef();

    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const snapPoints = useMemo(() => ["5%", "50%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


    const createMarker = (e) => {
        console.log(e.nativeEvent.coordinate);
        setMarkers([...markers, e.nativeEvent.coordinate]);
        setArea([...markers, e.nativeEvent.coordinate]);
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Modal 
                backdropColor={'transparent'}
                coverScreen={false}
                isVisible={visible}>
                <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Text>Su terreno mide: {areaTerreno}</Text>
          <Button title="Cerrar" onPress={()=> {setVisible(!visible)}}/>
        </View>
                </Modal>
                {
                    position ?

                        <MapView
                            style={styles.map}
                            //provider="google" 
                            region={{
                                latitude: position.latitud,
                                longitude: position.longitud,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            // showsUserLocation={true}
                            // showsMyLocationButton={true}
                            // zoomEnabled={true}
                            // zoomControlEnabled={true}
                            // showsScale={true}
                            minZoomLevel={20}
                            //mapType="hybrid"
                            onPress={(e) => createMarker(e)}
                        >


                            {markers.map((marker, id) => {

                                return (
                                    <Marker
                                        key={id}
                                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                        title="Posicion actual"
                                        description="Trampa"
                                        draggable
                                        tracksInfoWindowChanges={false}
                                        tracksViewChanges={false}
                                    />)
                            })}



                            {area.length >= 3 ? <Polygon
                                coordinates={area}
                                fillColor="#F0B406"
                                strokeColor="#C2D829"
                                strokeWidth={2}
                            /> : null}

                        </MapView>

                        : <Text>Cargando</Text>
                }

                <BottomSheet
                    ref={sheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                >
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        <Text>Información de la trampa actual</Text>
                        <Input
                            placeholder={position ? `${position.latitud}` : 'LATITUD'}
                            disabled={true}
                        />
                        <Input
                            placeholder={position ? `${position.longitud}` : 'LONGITUD'}
                            disabled={true}
                        />
                        <Input
                            placeholder='Nombre'
                            containerStyle={{ marginBottom: 5 }}
                        />
                        <RNPickerSelect
                            style={{ marginBottom: 5 }}
                            placeholder={{ label: 'Selecciona una trampa', value: null }}
                            onValueChange={(value) => console.log(value)}
                            items={[
                                { label: 'Trampa 1', value: 'football' },
                                { label: 'Trampa 2', value: 'baseball' },
                                { label: 'Trampa 3', value: 'hockey' },
                            ]}
                        />
                        <Button
                            title="Guardar terreno"
                            onPress={async () => {
                             
                                let res = await axios.post('http://192.168.100.12:1234/', {
                                    coordinates: markers
                                })
                                setAreaTerreno(res.data.area);
                                setVisible(true);
                                console.log(res.data);
                            }}
                            buttonStyle={{
                                backgroundColor: 'red',
                                borderRadius: 3,
                                color: 'black'
                            }}
                            containerStyle={{
                                marginTop: 5,
                                width: 200,
                                marginHorizontal: 50,
                                marginVertical: 10,
                                backgroundColor: 'black'
                            }}
                        />
                    </BottomSheetScrollView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});
