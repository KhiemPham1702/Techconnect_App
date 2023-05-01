import { View, Text, StyleSheet, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const product_pay = (props) => {
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
            <View style={styles.view_pro}>
                <View  style={styles.avatar_view}>
                    <Image
                        style={styles.image}
                        source={{uri: props.data.image}}
                    />               
                </View>
                <View marginTop={15} marginLeft={10}>
                    <Text style={styles.pro_name}>{props.data.name}</Text>
                    <Text style={styles.pro_color}>Color: {props.data.color}</Text>
                    <Text style={styles.pro_price} marginTop={3}>${props.data.SaleOff}</Text>
                </View>
                <Text style={styles.pro_price} marginTop={70} marginLeft={50}>x{props.data.quantity}</Text>
            </View>
        </View>
    )
}

export default product_pay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 22,
        alignItems: 'center',
    },
    view_pro: {
        height: 97,
        width: 373,
        backgroundColor: color.grey_text,
        borderRadius: 10,
        flexDirection: 'row',
    },
    avatar_view: {
        width: 80,
        height: 80,
        marginTop: 7,
        marginLeft: 5,
        borderRadius: 5,
        overflow: 'hidden',       
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pro_name: {
        width: 197,
        fontSize: 12,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    pro_color: {
        marginTop: 3,
        width: 197,
        fontSize: 10,
        color: color.grey_A0,
        fontFamily: 'Inter_Medium',
    },
    pro_price: {
        width: 197,
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
})