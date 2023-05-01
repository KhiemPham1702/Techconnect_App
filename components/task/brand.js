import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { useFonts } from 'expo-font';
import { useEffect , useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const brand = (props) => {

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

        //LoadImage()

    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };
  return (
    <TouchableOpacity>
          <View style={styles.brand}>
              <Image
                  //source={require(('../image/apple.png'))}
                  source={{uri: props.brand.image_Url}}
                  style={styles.Image}
              />
          </View>
    </TouchableOpacity>
    
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
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'center',
        borderRadius: 0,
    }
})