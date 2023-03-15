import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

const product_cart = () => {
    const [isChecked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const [count, setCount] = useState(1);
    const onPress = () => setCount(prevCount => prevCount + 1);
    const onPress2 = () => setCount(prevCount => ((prevCount <= 1) ? (prevCount + 0) : (prevCount - 1)))
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
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? color.red : undefined}
            />
            <View style={styles.view_pro}>
                <View style={styles.avatar_view}>
                    <Image
                        style={styles.image}
                        source={require('../image/3.png')}
                    />               
                </View>
                <View marginTop={15} marginLeft={10}>
                    <Text style={styles.pro_name}>Logitech G733 LIGHTSPEED Wireless</Text>
                    <Text style={styles.pro_color}>Color: White</Text>
                    <Text style={styles.pro_price}>$299</Text>
                </View>
                <View style={styles.add}>
                    <TouchableOpacity onPress={onPress2}>
                        <Text style={styles.minus} marginLeft={8}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.minus} marginLeft={10}>{count}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.minus} marginBottom={3} marginLeft={10}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default product_cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 32,
        alignItems: 'center',
    },
    checkbox: {
        height: 25,
        width: 25,
        borderColor: color.white,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 15,
    },
    view_pro: {
        height: 97,
        width: 295,
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
        marginTop: 3,
        width: 197,
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    add: {
        backgroundColor: color.red,
        width: 60,
        height: 28,
        borderRadius: 5,
        marginLeft: -27,
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    minus: {
        fontSize: 17,
        color: color.white,
        fontFamily: 'Inter_Medium',
    }
})