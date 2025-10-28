import React from 'react';
import Onboarding from "react-native-onboarding-swiper";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STEPS } from "../src/data/steps";

const OnBoardingScreen = () => {
  React.useEffect(() => {
    (async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      if (seen === 'true') {
        router.replace("/login");
      }
    })();
  }, []);

  const complete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } finally {
      router.replace("/login");
    }
  };

  return (
    <Onboarding
      pages={STEPS}
      onSkip={complete}
      onDone={complete}
    />
  );
};

export default OnBoardingScreen;
