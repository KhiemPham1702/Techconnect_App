import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const comment = () => {
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
        <View style={styles.comment}>
            <View  style={styles.avatar_view}>
                <Image
                    style={styles.image}
                    source={require('../image/girl.jpg')}
                />               
            </View>
            <View >
                <Text style={styles.user_name}>@username001</Text>
                <View style={styles.star} marginVertical={5}>
                    <Icon name="star" size={15} color={color.yellow_2} />
                    <Icon name="star" size={15} color={color.yellow_2} marginLeft={5}/>
                    <Icon name="star" size={15} color={color.yellow_2} marginLeft={5}/>
                    <Icon name="star" size={15} color={color.yellow_2} marginLeft={5}/>
                    <Icon name="star-o" size={15} color={color.yellow_2} marginLeft={5}/>                      
                </View>
                <Text style={styles.user_name}>Nice product and very good quality</Text>
                <View  style={styles.image_review}>
                    <Image
                        style={styles.image2}
                        source={require('../image/user1.jpg')}
                    />               
            </View>
            </View>
        </View>
    )
}

export default comment;

const styles = StyleSheet.create({
    comment: {
        marginVertical: 10,
        marginRight: 5,
        padding: 10,
        borderRadius: 10,
        borderColor: color.white,
        borderWidth: 1,
        backgroundColor: color.grey_A0,
        height: 'auto',
        width: 368,
        flexDirection: 'row'
    },
    avatar_view: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    user_name: {
        fontFamily: 'Inter_Medium',
        fontSize: 14,
        color: color.white,
    },
    star: {
        flexDirection: 'row',
    },
    image_review: {
        width: 107,
        height: 75,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image2: {
        width: '100%',
        height: '100%',
    },
})