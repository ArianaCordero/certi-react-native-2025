import { View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { STEPS } from '../src/data/steps';
import { router } from 'expo-router';

const OnBoardingScreen = () => {
    const finish = () => {
        router.replace('/login');
        
    }
    return (
        <Onboarding
            pages={STEPS}
            onDone={finish}
            onSkip={finish}
        />
    )
}

export default OnBoardingScreen;