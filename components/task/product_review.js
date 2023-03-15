import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
import Svg, { Image } from "react-native-svg";
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
    <View style={styles.product_Re}>
                <View style={StyleSheet.absoluteFill}>
                    <Svg height={154} width={295}  >
                    <Image 
                        href={require('../image/4_zu_3_gz700_1.png')} 
                        height={154} 
                        width={295}
                        preserveAspectRatio="xMidYMid slice"/>
                    </Svg>
                </View>
                <View style={styles.overlay} />   
                <Text style={styles.product_Re_text}>Premium Gaming Laptop</Text>
        </View>
  )
}

export default product_review;

const styles = StyleSheet.create({
    product_Re: {
        height: 154,
        width: 295,
        borderRadius: 15,
        backgroundColor: color.grey_text,
        marginLeft: 18,

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
    },
})