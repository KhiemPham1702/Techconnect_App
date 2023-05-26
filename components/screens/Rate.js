import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Product_bought from '../task/product_bought';

export default function Rate() {
    const navigation = useNavigation();
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

    return(
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
                <Svg height={40} width={40}  >
                <Image 
                    onPress={() => navigation.goBack()}
                        href={require('../image/icon_back_white.png')} 
                        height={40} 
                        width={40}
                        preserveAspectRatio="xMidYMid slice"/>
                </Svg>
            </View> 
            <Text style={styles.title} marginLeft={132} marginTop={80}>Rate Product</Text>
            <Text style={styles.title2} marginLeft={37} marginTop={20}>Your rating will be displayed in the product's reviews</Text>
            <View style={styles.star} marginTop={30} marginLeft={70}>
                <Icon name="star" size={45} color={color.yellow_2} />
                <Icon name="star" size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name="star" size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name="star" size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name="star-o" size={45} color={color.yellow_2} marginLeft={15} />
            </View>
            <View style={styles.camera}>
                <View style={StyleSheet.absoluteFill} marginLeft={30} marginTop={18}>
                    <Svg height={35} width={40}  >
                    <Image 
                        onPress={() => navigation.goBack()}
                            href={require('../image/ion_camera-sharp.png')} 
                            height={40} 
                            width={40}
                            preserveAspectRatio="xMidYMid slice"/>
                    </Svg>
                </View> 
            </View>
            <TextInput
                multiline={true}
                style={styles.usernametext}
                placeholder="Please share what you like about this product"
                placeholderTextColor={color.white}/>
            <View style={styles.button2}>
                <Text style={styles.buttonText2}>Send</Text>
            </View>
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
    title2: {
        width: 350,
        fontSize: 15,
        color: color.white,
        textAlign: 'center',
        fontFamily: 'Inter_SemiBold',
    },
    star: {
        flexDirection: 'row',
    },
    camera: {
        height: 80,
        width: 105,
        marginTop: 20,
        marginLeft: 150,
        borderColor: color.white,
        borderRadius: 10,
        borderWidth: 2,
    },
    usernametext: {
        height: 218,
        width: 345,
        borderRadius: 12,
        marginTop: 30,
        marginLeft: 35,

        textAlignVertical: 'top',  // Để hoder xuống dòng
        paddingLeft: 15,  // Để hoder cách lề trái
        paddingTop: 15,

        fontStyle: 'normal',
        fontSize: 14,
        color: color.white,
        borderColor: color.white,
        borderRadius: 12,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 22,
        fontFamily: 'Inter_Medium',
    },
    button2: {
        backgroundColor: color.red,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 50,
        marginHorizontal: 50,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 25,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
})

