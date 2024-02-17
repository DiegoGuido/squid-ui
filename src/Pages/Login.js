import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { Image, Text, View } from "react-native";


export function Login({navigation}) {
    const [errorEmail, setErrorEmail] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', }}>
            <View key={"imageHeader"} style={{ flex: 1 }}>
                <Image
                    source={require('../Utils/Squid.png')}
                    resizeMode="contain"
                    style={{ width: 300, height: 100, marginTop: '25%' }}
                />
            </View>
            <View key={"form"} style={{ flex: 2, alignItems: 'center' }}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: '10%', color: '#F0B406'}}>Inicio de sesión</Text>
                <View key={"inputs"} style={{ width: '85%' }}>
                    <Input
                        key={"email"}
                        placeholder='Correo electrónico'
                        errorStyle={{ color: 'red' }}
                        errorMessage={errorEmail}
                        inputContainerStyle={{ width: '100%', marginBottom: '7%' }}
                    />
                    <Input
                        key={"password"}
                        placeholder='Contraseña'
                        errorStyle={{ color: 'red' }}
                        errorMessage={errorEmail}
                        inputContainerStyle={{ width: '100%',  marginBottom: '7%' }}
                    />
                </View>

                <Button title={'Ingresar'} size="lg" color={"#F0B406"} onPress={() => navigation.navigate('Map')}/>
                <Text style={{color: "#C2D829", marginTop: '10%', fontSize: 18, fontWeight: '900'}}>¿Olvidaste tu contraseña?</Text>
            </View>
        </View>

    )
}