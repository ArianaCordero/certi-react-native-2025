import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../src/auth/authProvider';

const AuthLayout = () => {
    const { user, loading } = useAuth();
    if(loading) {
        return (
            <View>
                <Text> Cargando </Text>
            </View>
        )
    }

    if(user) {
        return <Redirect href="map"/>
    }


    return (
        <Stack screenOptions={{headerShown: false}}> 
        <Stack.Screen name="onBoarding"/>
            <Stack.Screen name="login"/>
            <Stack.Screen name="signup"/>
        </Stack>
    );
}
export default AuthLayout;

