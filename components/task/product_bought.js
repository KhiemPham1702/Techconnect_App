import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const product_bought = (props) => {
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

        //console.log(props.data.item)
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };

    const renderFlatlist = (data) => {
        //console.log(data)

        return (
            <View flexDirection='row'>
                <View style={styles.avatar_view}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.item.product.thumbnail }}
                    />
                </View>
                <View marginTop={15} marginLeft={10}>
                    <Text style={styles.pro_name}>{data.item.product.name}</Text>
                    <Text style={styles.pro_color}>Color: {data.item.product.color}</Text>
                    <Text style={styles.pro_price} marginTop={3}>${data.item.product.price}</Text>
                </View>
                <Text style={styles.pro_price} marginTop={70} marginLeft={50}>x{data.item.quantity}</Text>
            </View>
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.view_pro}>
                <FlatList
                    horizontal
                    showsVerticalScrollIndicator={false}
                    data={props.data.item.carts}
                    renderItem={renderFlatlist}>
                </FlatList>
                
                <View paddingHorizontal={15}>
                    <View style={styles.line} />
                </View>
                <View flexDirection='row' marginLeft={15}>
                    <View style={styles.avatar_view4}>
                        <Image
                            style={styles.image4}
                            source={require('../image/check_total.png')} />
                    </View>
                    <Text style={styles.section}>Amount paid: </Text>
                    <Text style={styles.section2}>${props.data.item.order_total} </Text>
                </View>
                <View style={styles.button2}>
                    <Text style={styles.buttonText2}>Buy back</Text>
                </View>             
            </View>
        </View>
    )
}

export default product_bought;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 22,
        alignItems: 'center',
        marginLeft: -15,
    },
    view_pro: {
        height: 202,
        width: 373,
        backgroundColor: color.grey_text,
        borderRadius: 10,
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
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.white,
        borderWidth: 1,
        width: '100%',
        marginVertical: 15,
    },
    avatar_view4: {
        width: 30,
        height: 30,
        overflow: 'hidden',
    },
    image4: {
        width: '100%',
        height: '100%',
    },
    section: {
        fontFamily: 'Inter_Medium',
        fontSize: 16,
        color: color.white,
        marginLeft: 10,
        marginTop: 3,
    },
    section2: {
        fontFamily: 'Inter_Medium',
        fontSize: 20,
        color: color.red,
        marginLeft: 10,
        marginTop: 0,
    },
    button2: {
        backgroundColor: color.red,
        height: 30,
        width: 118,
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 241,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText2: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Inter_SemiBold',
    },
})