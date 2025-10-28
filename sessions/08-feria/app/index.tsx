import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function HomeRedirect() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem('hasSeenOnboarding')
      .then((value) => {
        if (!isMounted) return;
        setInitialRoute(!value ? '/login' : '/onboarding');
      })
      .catch(() => {
        if (isMounted) setInitialRoute('/onboarding');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#f9738f" />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}
