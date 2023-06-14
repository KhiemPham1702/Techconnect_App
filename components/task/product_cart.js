import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState, useImperativeHandle } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import color from '../../contains/color';

import { db, ref, set, child, get, onValue, update, GetRef} from '../DAL/Database'
//import { CartProduct } from '../screens/Home';

const product_cart = (props, ref) => {
    const navigation = useNavigation();

    const Data = props.data.product
    //const [Data, setData] = useState(props.data.product)


    const [isChecked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const [count, setCount] = useState(props.data.quantity);
    const onPress = () => setCount(prevCount => prevCount + 1);
    const onPress2 = () => setCount(prevCount => ((prevCount <= 1) ? (prevCount + 0) : (prevCount - 1)))
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
    });

    var SaleOff = Data.price
    

    const [saleOff, setSaleOff] = useState(SaleOff)

    // const [name, setName] = useState(() => {
    //     if (props.data.product != undefined)
    //         return props.data.product.name
    //     else
    //         return ""
    // })
    // const [color, setColor] = useState(() => {
    //     if (props.data.product != undefined)
    //         return props.data.product.color
    //     else
    //         return ""
    // })

    // function LoadSaleOff() {
    //     const data = props.data.product
        
    //     if (data != undefined && data.discount_ID != "") {
    //         console.log(data)
    //         const starCountRef = GetRef("Discount/" + data.discount_ID)
    //         onValue(
    //             starCountRef,
    //             (snapshot) => {
    //                 let d = snapshot.val()
    //                 if (d != undefined) {
    //                     let sale = (data.price * (100 - d.ratio) / 100)
    //                     setSaleOff(sale);
    //                 }
    //             }
    //         );
    //     }
    // }

    function LoadSaleOff() {
        const data = props.data.product
        
        if (data != undefined && data.discount_ID != "" ) {
            //console.log(data)
            const starCountRef = GetRef("Discount/" + data.discount_ID)
            onValue(
                starCountRef,
                (snapshot) => {
                    let d = snapshot.val()
                    let date = new Date(d.expirationDate)
                    if (d != undefined && date >= new Date()) {
                        let sale = (data.price * (100 - d.ratio) / 100)
                        SaleOff = sale
                        setSaleOff(sale)
                    }
                }
            );
        }
    }

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
        
        navigation.addListener('focus', () => {
            unChecked()
            //console.log(Data);
            // setData([])
            // for (var i = 0; i < CartProduct.length; i++) {
            //     if (CartProduct.at(i).ID == props.data.product_ID) {
            //         setData((pre) => [...pre, CartProduct.at(i)]);

            //         break;
            //     }
            // }
            
        });

        LoadSaleOff()
        console.log(props.data);

    }, []);

    // useImperativeHandle(childRef, () => ({
    //     Check: (checked) => {Checked(checked)},
    // }));

    useImperativeHandle(ref, () => ({
        Checked: (checked) => {Checked(checked)},
        unChecked: () => {unChecked()}
    }));

    function unChecked() {
        setChecked(false)
    }

    function Checked(checked) {
        let check = isChecked

        var PaymentData = new Array({
            "ID": Data.ID,
            "name": Data.name,
            "color": Data.color, 
            "price": Data.price,
            "quantity": count,
            "image": props.data.image,
            "discount_ID": Data.discount_ID,
            "SaleOff": saleOff,
        });

        if(checked == "")
        {
            
            props.parentReference(PaymentData, !check);

            setChecked(!check)
        }
        
        else if(checked == true) {
            if (check == false) {
                props.parentReference(PaymentData, true);

                setChecked(true)
            }
        }
        else {
            if (check == true) {
                props.parentReference(PaymentData, false);

                setChecked(false)
            }
        }

        //console.log(ref)
    }

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
                onValueChange={() => Checked("")}
                color={isChecked ? color.red : undefined}
            />
            <View style={styles.view_pro}>
                <View style={styles.avatar_view}>
                    <Image
                        style={styles.image}
                        source={{ uri: Data.thumbnail }}
                    />
                </View>
                <View marginTop={15} marginLeft={10}>
                    {/* <Text style={styles.pro_name}>{() => {if(Data.name != undefined) return Data.name}}</Text>
                    <Text style={styles.pro_color}>Color:{() => { if (Data.color != undefined) return Data.color }} </Text>
                    <Text style={styles.pro_price}>${() => { if (Data.price != undefined) return Data.price }}</Text> */}
                    <Text style={styles.pro_name}>{Data.name}</Text>
                    <Text style={styles.pro_color}>Color:{Data.color} </Text>
                    <Text style={styles.pro_price}>${saleOff}</Text>
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

//export default product_cart;
export default React.forwardRef(product_cart);

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