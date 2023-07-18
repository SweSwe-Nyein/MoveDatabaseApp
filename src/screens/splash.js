import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { getToken } from "../utils/loginCredential";

const SplashScreen = ({ navigation }) => {

  const goScreen = () => {
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../assets/splash/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          goScreen();
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
