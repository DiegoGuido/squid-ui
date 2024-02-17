import { NavigationContainer } from "@react-navigation/native";
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Map } from "../Pages/Map";
import { Login } from "../Pages/Login";

export default function IndexNavigation() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}