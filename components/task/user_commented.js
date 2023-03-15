import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const user_commented = () => {
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
            <View>
                <View style={styles.view_pro}>
                    <View  style={styles.avatar_view3}>
                        <Image
                            style={styles.image3}
                            source={require('../image/3.png')}
                        />               
                    </View>
                    <View marginTop={5} marginLeft={10}>
                        <Text style={styles.pro_name}>Logitech G733 LIGHTSPEED Wireless</Text>
                        <Text style={styles.pro_color}>Color: White</Text>
                    </View>
                </View>
            </View>
            <View paddingHorizontal={0}>
                <View style={styles.line} />
            </View>
            <View flexDirection='row'>
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
        </View>
    )
}

export default user_commented;

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
        
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.white,
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
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
    view_pro: {
        height: 97,
        borderRadius: 10,
        flexDirection: 'row',
    },
    avatar_view3: {
        width: 80,
        height: 80,
        marginTop: 7,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: color.grey_text,       
    },
    image3: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pro_name: {
        width: 197,
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    pro_color: {
        marginTop: 3,
        width: 197,
        fontSize: 12,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
})