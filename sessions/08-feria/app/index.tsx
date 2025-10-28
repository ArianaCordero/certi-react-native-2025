import React from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/auth/authProvider';

export default function HomeRedirect() {
  const { user, loading } = useAuth();
  const [ready, setReady] = React.useState(false);
  const [hasSeen, setHasSeen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeen(v === 'true');
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (loading || !ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (user) return <Redirect href="/map" />;
  if (hasSeen) return <Redirect href="/login" />;
  return <Redirect href="/onBoarding" />;
}
