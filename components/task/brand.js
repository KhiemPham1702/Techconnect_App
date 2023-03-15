import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect , useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const brand = () => {
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
    <View style={styles.brand}>
                    <View style={StyleSheet.absoluteFill}>
                        <Svg height={50} width={80}  >
                        <Image 
                            href={require('../image/apple.png')} 
                            height={50} 
                            width={80}
                            />
                        </Svg>
                    </View>
                </View>
  )
}

export default brand;

const styles = StyleSheet.create({
    brand:{
        width: 80,
        height: 50,
        marginLeft: 18,
        borderRadius: 12,
        backgroundColor: color.white,
    },
})