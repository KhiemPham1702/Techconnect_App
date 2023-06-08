import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useImperativeHandle } from 'react'
//import Svg, { Image } from "react-native-svg";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import color from '../../contains/color';

import { db, set, child, get, onValue, storage, remove, GetRef } from '../DAL/Database'
import { User, liked } from '../screens/Login'


const product = (props) => {
    const [like, setLike] = useState(props.like.islike)
    const [icon, setIcon] = useState(() => {
        return props.like.islike == true ? 'heart' : 'heart-o';
    });

    const [ratio, setRatio] = useState(0)
    const [SaleOff, setSaleOff] = useState(props.data.price)
    const [myImage, setImage] = useState([]);


    const [AverageReview, setAverageReview] = useState(0)

    function LoadUserReview() {
        const starCountRef = GetRef("User_comment/")
        onValue(
            starCountRef,
            (snapshot) => {
                let sum = 0;
                let count = 0;
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['Product_ID'] == props.data.ID) {
                        sum += parseFloat(da.Rate)
                        count++;
                        //console.log(da)
                    }
                })

                let average = parseFloat(sum) / parseFloat(count);
                //console.log(average)
                if(average == 0)
                    average = 5
                setAverageReview(average);

            },
            {
                onlyOnce: true,
            }
        )
    }

    const ListImage = useState([]);

    function LoadSaleOff(id) {
        if (id != "") {

            const starCountRef = GetRef("Discount/" + id)//ref(db, "Discount/" + props.data.discount_ID);
            onValue(
                starCountRef,
                (snapshot) => {
                    let d = snapshot.val()
                    if (d != undefined) {

                        let date = new Date(d.expirationDate)
                        if ((isNaN(date) || date >= new Date())) {
                            let sale = (props.data.price * (100 - d.ratio) / 100)
                            setSaleOff(sale);
                            setRatio(d.ratio)

                            //console.log(sale)
                        }
                    }
                },
                {
                    onlyOnce: true,
                }
            );
        }
        else {
            setRatio(0)
            setSaleOff(props.data.price)
        }

    }

    function LoadImageOfProduct() {
        setImage([]);

        const starCountRef = GetRef("Image/")//ref(db, "Image/");
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    //console.log(props.data.ID)
                    if (childSnapshot.val().product_ID == props.data.ID) {
                        //console.log(childSnapshot.val().image_Url)
                        setImage((pre) => [...pre, childSnapshot.val().image_Url]);
                        //console.log(childSnapshot.val())
                    }
                })
                if (!myImage.find(element => element != undefined && element.image_Url == props.data.thumbnail))
                    setImage((pre) => [...pre, props.data.thumbnail]);
            },
            {
                onlyOnce: true,
            }
        );
    }

    useEffect(() => {
        setLike(props.like.islike);
        setIcon(props.like.islike == true ? 'heart' : 'heart-o');

        LoadSaleOff(props.data.discount_ID);
        LoadImageOfProduct();
        LoadUserReview()
        //console.log(props.data)
        //console.log("Hello")
    }, [props]);


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

    function Like() {
        //set(ref(db, 'Liked/' + (User.ID + props.data.ID)), {
        set(GetRef('Liked/' + (User.ID + props.data.ID)), {
            ID: User.ID + props.data.ID,
            product_ID: props.data.ID,
            user_ID: User.ID
        })
            .then(() => {
                liked.push({ "ID": (User.ID + props.data.ID), "user_ID": User.ID, "product_ID": props.data.ID })
            })
            .catch((error) => {
                // The write failed...
            });
    }
    function Unlike() {
        //console.log(liked)
        for (var i = 0; i < liked.length; i++) {

            if (liked.at(i).ID === props.like.id) {

                liked.splice(i, 1);
            }

        }
        //remove(ref(db, 'Liked/' + props.like.id), {
        remove(GetRef('Liked/' + props.like.id), {
        })
            .then(() => {
                // Data saved successfully!
            })
            .catch((error) => {
                // The write failed...
            });
    }

    function ClickHeart() {
        isLiked = like;

        setLike(!like);
        //console.log(like);

        if (!isLiked) {
            Like()
            setIcon('heart')
        }
        else {
            Unlike()
            setIcon('heart-o')
        }
    }

    const renderSale = () => {
        if (ratio != 0) {
            return (
                <View marginLeft={90} marginTop={0}>
                    {/* <Svg height={41} width={29}>
                    <Image
                        href={require('../image/OFF.png')}
                        height={41}
                        width={29}
                        resizeMode={'xMidYMid slice'}/>
                    <Text style={styles.off_text}>25%</Text>
                </Svg> */}
                    <Image
                        source={require('../image/OFF.png')}
                        height={41}
                        width={29} />
                    <Text style={styles.off_text}>{ratio}%</Text>
                    {/* resizeMode={'xMidYMid slice'} /> */}
                </View>
            )
        }

    }

    const renderPrice = () => {
        if (ratio != 0) {
            return (
                <View flexDirection='row' marginTop={5} marginHorizontal={8}>
                    <Text style={styles.price}>${props.data.price}</Text>
                    <Text style={styles.price_sale}>${SaleOff}</Text>
                </View>
            )
        }
        else {
            return (
                <View flexDirection='row' marginTop={5} marginHorizontal={8}>
                    <Text style={styles.normal_price}>${props.data.price}</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.product}>
            <View style={StyleSheet.absoluteFill} >
                {/* <Svg height={111} width={175}> 
                    <Image 
                        onPress={() => navigation.navigate('Product_detail', {
                            paramKey: props.data,
                        })}
                        href={require('../image/rog_lap.jpg')} 
                        
                        //source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-550f2.appspot.com/o/Headphone_Bengoo.jpg?alt=media&token=d1f5ec86-14c6-4262-b38d-8a0bce30d343' }}
                        height={111} 
                        width={175}
                        resizeMode={'xMidYMid slice'}/>
                </Svg> */}
                <TouchableOpacity onPress={() => navigation.navigate('Product_detail', {
                    paramKey: props.data,
                    listImage: myImage,
                    like: { "isLike": like, "ID": props.data.ID },
                    ratio: ratio,
                    SaleOff: SaleOff
                })}>
                    <View style={styles.img_view}>
                        <Image

                            style={styles.img}
                            //source={require('../image/3.png')}
                            //source={{ uri: 'https://reactnative.dev/img/tiny_logo.png?fbclid=IwAR1EhF8DfYpEoBdAqNen17pOnhlVWzksrLWoXFXto8oHuLgpwZwvnrjxPI4' }}
                            source={{ uri: myImage.at(0) }}
                        />
                    </View>
                </TouchableOpacity>

            </View>
            <View flexDirection='row'>


                <Icon name={icon} onPress={ClickHeart} size={25} color={color.red} marginLeft={10} marginTop={7} />
                {/* {renderLike} */}
                {renderSale()}
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.Pro_name}>{props.data.name}</Text>
            <View style={styles.star}>
                <Icon name={AverageReview >= 1 ? 'star' : 'star-o'} size={15} color={color.yellow} />
                <Icon name={AverageReview >= 2 ? 'star' : 'star-o'} size={15} color={color.yellow} marginLeft={3} />
                <Icon name={AverageReview >= 3 ? 'star' : 'star-o'} size={15} color={color.yellow} marginLeft={3} />
                <Icon name={AverageReview >= 4 ? 'star' : 'star-o'} size={15} color={color.yellow} marginLeft={3} />
                <Icon name={AverageReview >= 5 ? 'star' : 'star-o'} size={15} color={color.yellow} marginLeft={3} />

            </View>

            {renderPrice()}

            <View style={StyleSheet.absoluteFill} marginLeft={142} marginTop={160}>
                {/* <Svg height={33} width={33}> 
                    <Image 
                        href={require('../image/icon_add.png')} 
                        height={33} 
                        width={33}
                        resizeMode={'xMidYMid slice'}/>
                </Svg> */}
                <Image
                    href={require('../image/icon_add.png')}
                    height={33}
                    width={33} />
                {/* resizeMode={'xMidYMid slice'} /> */}
            </View>

        </View>
    )
}

//export default product;
export default React.forwardRef(product);

const styles = StyleSheet.create({
    product: {
        height: 193,
        width: 175,
        backgroundColor: color.white,
        borderRadius: 15,
        marginRight: 18,
        marginVertical: 15,
    },
    Pro_name: {
        marginTop: 93,
        marginHorizontal: 8,
        fontFamily: 'Inter_Medium',
        fontSize: 12,
        color: color.grey_text,
    },
    star: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 5,
    },
    price: {
        fontFamily: 'Inter_SemiBold',
        fontSize: 12,
        color: color.grey_text,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    normal_price: {
        fontFamily: 'Inter_SemiBold',
        fontSize: 12,
        color: color.grey_text,
        textDecorationStyle: 'solid'
    },
    price_sale: {
        marginLeft: 10,
        fontFamily: 'Inter_SemiBold',
        fontSize: 12,
        color: color.red,
    },
    off_text: {
        marginHorizontal: 3.5,
        marginVertical: 5,
        fontFamily: 'Inter_SemiBold',
        fontSize: 10,
        marginTop: -37,
        color: color.white,
    },
    img: {
        height: '85%',
        width: '100%',
        resizeMode: 'center',
    },
    img_view: {
        alignItems: 'center',
        // justifyContent: 'center',
    }
})