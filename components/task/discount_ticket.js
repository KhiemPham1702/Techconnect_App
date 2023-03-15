import { View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const discount_ticket = () => {
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
        Inter_Regular: require('../../assets/fonts/Inter-Regular.ttf'),
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
        <ImageBackground 
            style={styles.container} 
            source={require('../image/discount.png')}>
                <View>
                    <View flexDirection='row'>
                        <View alignItems='center' justifyContent='center' height={120}>
                            <View  style={styles.avatar_view}>
                            <Image
                                style={styles.image}
                                source={require('../image/free_ship.png')}/>               
                            </View>
                        </View>
                        <View marginLeft={35}>
                            <Text style={styles.tiket} marginTop={17}>Up to $25 off</Text>
                            <Text style={styles.limit}>Minimum order $100</Text>
                            <Text style={styles.date} marginTop={17}>Until: 02/02/2023</Text>
                        </View>
                        <View style={styles.save} marginTop={38} marginLeft={13}>
                            <Text style={styles.save_text}>Save</Text>
                        </View>
                    </View>
                </View>
        </ImageBackground>
    )
}

export default discount_ticket;

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 120,
        resizeMode: 'cover',
        marginVertical: 10,
    },
    avatar_view: {
        width: 100,
        height: 75,
        marginLeft: 5,
        overflow: 'hidden',       
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    tiket: {
        fontSize: 20,
        fontFamily: 'Inter_SemiBold',
        color: 'black',
    },
    limit: {
        fontSize: 14,
        fontFamily: 'Inter_Regular',
        color: color.grey_A0,
    },
    date: {
        fontSize: 14,
        fontFamily: 'Inter_Regular',
        color: color.red,
    },
    save: {
        width: 45,
        height: 35,
        borderRadius: 5,
        borderColor: color.red,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    save_text: {
        fontSize: 14,
        fontFamily: 'Inter_Medium',
        color: color.red,
    },
})