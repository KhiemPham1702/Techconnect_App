import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react'
import { useFonts } from 'expo-font';
import { useEffect , useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const product_review = () => {
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
    });
    useEffect(() => {
        async function prepare() {
        await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };
  return (
      <View marginLeft={15}>
          <ImageBackground
              styles={styles.product_Re}
              source={require('../image/4_zu_3_gz700_1.png')} >
              <View height={154} width={295}>
                  <View style={styles.overlay} />
                  <Text style={styles.product_Re_text}>Premium Gaming Laptop</Text>
              </View>
          </ImageBackground>
      </View>
  )
}

export default product_review;

const styles = StyleSheet.create({
    product_Re: {
        height: 154,
        width: 295,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    product_Re_text: {
        color: color.white,
        fontFamily: 'Inter_SemiBold',
        fontSize: 16,
        marginLeft: 19,
        marginTop: 117,
    },
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 15,
    },
    
})