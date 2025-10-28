import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider } from '../src/auth/authProvider';

import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { usePushNotifications } from '../src/lib/usePushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,     // iOS
    shouldShowBanner: true,    // iOS 16+
    shouldShowList: true       // iOS summary
  }),
});

const RootLayout = () => {

    usePushNotifications();
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    )
}
export default RootLayout;
