import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/auth/authProvider';
// import * as WebBrowser from "expo-web-browser";
// import { AuthProvider } from '../src/auth/authProvider';


// WebBrowser.maybeCompleteAuthSession();


const RootLayout = () => {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onBoarding" />
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    )
}
export default RootLayout;
