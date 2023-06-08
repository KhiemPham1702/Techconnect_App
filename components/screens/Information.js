import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import Svg, { Image } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import { db, ref, set, child, get, onValue } from '../DAL/Database'

import { getStorage, uploadBytes, ref as ref_storage, getMetadata, getDownloadURL } from "firebase/storage"

import { User, reload } from '../screens/Login'
import { AddressObj, LoadAddress } from '../screens/Profile';


export default function Infomation() {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get("window");
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
        <View style={styles.container}>
            
            <View style={StyleSheet.absoluteFill}>
                <Svg height={height} width={width}>
                <Image
                    href={require('../image/Information.png')}
                    width={width}
                    height={height}
                    preserveAspectRatio="xMidYMid slice"
                />
                </Svg>
            </View>
            <Icon2 name='arrow-left' size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.navigate('Tab_navigation')} />{/*navigation.goBack()}/>*/}           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    title: {
        fontSize: 26,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    button2: {
        backgroundColor: color.red,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 50,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 28,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
    view_ava: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar_view: {
        width: 100,
        height: 100,

        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    avatar_view2: {
        width: 25,
        height: 25,
        marginTop: -25,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image2: {
        width: '100%',
        height: '100%',
    },
    address: {
        fontSize: 20,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    usernametext: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 25,

        fontStyle: 'normal',
        fontSize: 20,
        color: color.white,
        borderColor: color.white,
        borderRadius: 12,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 22,
        fontFamily: 'Inter_Medium',
    },
})