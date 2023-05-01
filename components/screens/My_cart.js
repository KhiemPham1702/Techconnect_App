import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Svg, { Image } from "react-native-svg";
import React, { useEffect, useState, useRef } from 'react';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Product_cart from '../task/product_cart';
import Product from '../task/product';

import { db, ref, set, child, get, onValue, remove, RemoveElementByID } from '../DAL/Database'
//import { LoadAllCartProduct, LoadCartProduct,  } from '../screens/Home';
import { Carts } from '../screens/Login'


export default function My_cart() {
    const [childRefs, setChildRefs] = useState([])
    //const childRef = useRef();

    const [Total, setTotal] = useState(0)
    const [Quantity, setQuantity] = useState(0)

    const [myCart, setMyCart] = useState([])

    //var temp = []
    const [PaymentData, setPayment] = useState([]);
    const [carts, setCarts] = useState([]);

    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const DATA = [
        {
            id: '1',
            title: 'Item 1',
        },
        {
            id: '2',
            title: 'Item 2',
        },
        {
            id: '3',
            title: 'Item 3',
        },
        {
            id: '4',
            title: 'Item 1',
        },
    ];
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
    });

    function CreateChildRef() {
        
        console.log("Start create an array useRef")
        for (var i = 0; i < Carts.length; i++) {
            setChildRefs((childRefs) =>
                Array(Carts.length)
                    .fill()
                    .map((_, i) => childRefs[i] || React.createRef()),
            );
        }

    }

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
        //console.log(CartProduct)
        //setMyCart(Carts);
        navigation.addListener('focus', () => {
            //alert('Refreshed');
            setChecked(false)


            //console.log(Carts.length);
            //console.log(childRefs.length)
            if (childRefs.length != Carts.length || myCart.length !== Carts.length) {

                setCarts([]);
                setPayment([]);
                setTotal(0);
                setQuantity(0);

                setMyCart(Carts);
                CreateChildRef()
            }

            console.log(Carts)
            //console.log(PaymentData);
            //console.log(carts);

        });


    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };
    const renderItem = () => {
        return <Product_cart />;
    };
    const renderItem2 = () => {
        //return <Product/>;
    };


    function BuyNow() {
        console.log(PaymentData)
        if (PaymentData != [] && PaymentData.length > 0) {
            navigation.navigate('Payment', {
                productData: PaymentData,
                carts: carts,
            })
        }
    }

    function removeElement(array, e) {
        var index = 0;

        for (var i = 0; i < array.length; i++) {
            if (array.at(i).ID == e.ID) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function parentMethod(childData, check) {
        // if (check == true) 
        //     setPayment((pre) => [...pre, childData.at(0)]);
        //     //PaymentDatas.push();
        // else
        //     removeElement(PaymentData, childData.at(0))

        if (check == true)
            PaymentData.push(childData.at(0))
        //PaymentDatas.push();
        else
            removeElement(PaymentData, childData.at(0))


        console.log(PaymentData)

        setTotal(0)
        setQuantity(0)
        setCarts([])

        //console.log(Total);
        //console.log(Quantity);
        //console.log(carts)

        let t = 0;
        let q = 0;
        PaymentData.forEach((e) => {
            for (let i = 0; i < myCart.length; i++) {
                if (myCart.at(i).product_ID == e.ID) {
                    setCarts((pre) => [...pre, { "ID": myCart.at(i).ID }]);
                    //carts.push({ "ID": myCart.at(i).ID })
                    break;
                }
            }
            q += e.quantity
            t += (e.quantity * e.SaleOff)
            //console.log(Quantity);
        })

        setQuantity(q)
        setTotal(t.toFixed(2))
    }

    // function unCheckAll() {

    //     setChecked(false);


    //     childRefs.forEach((e) => {
    //         //console.log("e:");
    //         //console.log(e)
    //         e.current.unChecked()
    //     })

    // }
    function CheckAll() {
        let checked = isChecked;
        setChecked(!checked);


        childRefs.forEach((e) => {
            //console.log("e:");
            //console.log(e)
            if (e.current != null)
                e.current.Checked(!checked)
        })

    }

    function RemoveCartFromFirebase(id) {
        remove(ref(db, 'Cart/' + id), {
        })
            .then(() => {
                // Data saved successfully!
            })
            .catch((error) => {
                // The write failed...
            });
    }

    function FindElementByID(array, id) {
        let index = 0;

        for (let i = 0; i < array.length; i++) {
            if (array.at(i).ID == id || array.at(i).product_ID == id) {
                index = i;
                break;
            }
        }

        return index;
    }

    function DeleteCart() {

        for (let i = carts.length - 1; i >= 0; i--) {

            const index = FindElementByID(myCart, carts.at(i).ID);
            RemoveCartFromFirebase(carts.at(i).ID)
            //childRefs.at(index).current.unChecked()
            //setChildRefs((products) => products.filter((_, index) => index !== i));
            //setMyCart((products) => products.filter((_, index) => index !== i))

            // setMyCart([
            //     ...myCart.slice(0, index),
            //     ...myCart.slice(index + 1, myCart.length)
            // ]);

            Carts.splice(index, 1)
            //CartProduct.splice(CartProduct.findIndex(e => e.ID === e.ID), 1);
            //RemoveElementByID(CartProduct, e.ID)

            setPayment((products) => products.filter((_, index) => index !== index));
            // setPayment([
            //     ...PaymentData.slice(0, index),
            //     ...PaymentData.slice(index + 1, PaymentData.length)
            // ]);
            setCarts((products) => products.filter((_, index) => index !== index));
            // setCarts([
            //     ...carts.slice(0, index),
            //     ...carts.slice(index + 1, carts.length)
            // ]);
            //childRefs.at(index).current.unChecked()
            // setChildRefs([
            //     ...childRefs.slice(0, index),
            //     ...childRefs.slice(index + 1, childRefs.length)
            // ]);

            //setChildRefs((products) => products.filter((_, index) => index !== index));

            //setMyCart((products) => products.filter((_, index) => index !== index));
            childRefs.at(index).current.unChecked()
            console.log(Carts)
        }

        console.log(childRefs.length)
        console.log(Carts.length)
        setChecked(false)
        console.log("re setMyCart and re render")
        setCarts([]);
        
        setPayment([]);
        setTotal(0);
        setQuantity(0);

        setMyCart(Carts);
        CreateChildRef()
        //setPayment([])
        //setCarts([])
    }


    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill} marginLeft={15} marginTop={30}>
                <Svg height={40} width={40}>
                    <Image
                        href={require('../image/logo.png')}
                        height={40}
                        width={40}
                        preserveAspectRatio="xMidYMid slice" />
                </Svg>
            </View>
            <TouchableOpacity onPress={DeleteCart}>
                <Icon name='trash-o' onPress={() => { DeleteCart() }} size={35} color={color.white} marginLeft={352} marginTop={35} />
                <Text style={styles.title} marginLeft={162} marginTop={-35}>My Cart</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View flexDirection='row' marginLeft={20} marginTop={20}>
                    <Checkbox
                        style={styles.checkbox}
                        marginTop={10}
                        value={isChecked}
                        onValueChange={CheckAll}
                        color={isChecked ? color.red : undefined}
                    />
                    <Text style={styles.list} marginLeft={5} marginTop={10}>Select All</Text>
                    <View marginLeft={60}>
                        <Text style={styles.total}>Total Prices</Text>
                        <Text style={styles.price}>{Total}</Text>
                    </View>
                    <TouchableOpacity onPress={BuyNow}>
                        <View style={styles.button2}>
                            <Text style={styles.buttonText2}>Buy now ({Quantity})</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View paddingHorizontal={15}>
                    <View style={styles.line} />
                </View>
                <FlatList
                    marginTop={22}
                    marginLeft={22}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    nestedScrollEnabled={true}
                    data={myCart}
                    renderItem={({ item, index }) =>
                        <Product_cart data={item}
                            onRef={ref => (this.parentReference = ref)}
                            ref={childRefs[index]}
                            parentReference={parentMethod.bind(this)} />}>
                </FlatList>
                <View paddingHorizontal={15}>
                    <View style={styles.line} />
                </View>
                <Text style={styles.list} marginLeft={15}>Suggestions for you</Text>
                <FlatList
                    marginTop={15}
                    marginLeft={22}
                    marginBottom={65}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    numColumns={2}
                    data={DATA}
                    renderItem={renderItem2}>
                </FlatList>
            </ScrollView>

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
    list: {
        fontSize: 18,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.grey_BE,
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    checkbox: {
        height: 25,
        width: 25,
        borderColor: color.white,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 10,
    },
    total: {
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    price: {
        fontSize: 18,
        color: color.red,
        fontFamily: 'Inter_Medium',
        textAlign: 'right',
    },
    button2: {
        backgroundColor: color.red,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
        marginHorizontal: 15,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
})
