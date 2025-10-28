import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const receiveListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => { 
    (async () => {
      if (Device.osName === 'Android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log('Expo Push Token:', token);
      if (token) setExpoPushToken(token);
    });

    receiveListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((resp) => {
      console.log('Notification action:', resp.actionIdentifier, resp.notification.request.content.data);
    });

    return () => {
      receiveListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
    sendPushNotification,
    scheduleLocalNotification,
  };
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (!Device.isDevice) {
    console.warn('Debes usar un dispositivo físico para push.');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('Permisos de notificaciones denegados.');
    return;
  }

  const projectId =
    (Constants?.expoConfig?.extra as any)?.eas?.projectId ??
    (Constants as any)?.easConfig?.projectId;

  if (!projectId) {
    console.warn('Project ID no encontrado. Asegura EAS project vinculado.');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  return token;
}

async function sendPushNotification(expoPushToken: string) {
  console.log('Sending push notification to token:', expoPushToken);
  if (!expoPushToken) return;

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '¡Hola Bola!',
    body: 'Esto es un push de prueba ',
    data: { screen: 'home' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function scheduleLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio',
      body: 'Esto es una notificación local de prueba',
      sound: 'default',
      data: { local: true },
    },
    trigger: { seconds: 2 },
  });
}
