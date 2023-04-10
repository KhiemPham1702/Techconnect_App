import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
import Svg, { Image } from "react-native-svg";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useEffect , useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import color from '../../contains/color';

import { db, ref, set, child, get, onValue, storage } from '../DAL/Database'

const product = (props) => {
    // const set = new Set(props.data);
    //console.log(props.data);


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

    //const [Image, setImage] = useState([]);

    // const ListImage = useState([]);

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     const starCountRef = ref(db, "Image/");
    //     setProductDetail([]);
    //     onValue(
    //         starCountRef,
    //         (snapshot) => {
    //             snapshot.forEach((childSnapshot) => {
    //                 setImage((pre) => [...pre, childSnapshot.val()]);
    //                 //console.log(ProductDetail);
    //             }).then(() => {
    //                 Image.forEach((element) => {
    //                     if(element.product_ID == props.data.ID)
    //                     ListImage.push(element.image_Url);
    //                 })
    //             }) 
    //         },
    //         {
    //             onlyOnce: true,
    //         }
    //     );
    // }, []);

    //const productImage = ref(storage, 'gs://mobile-550f2.appspot.com/4_zu_3_gz700_1.png')

  return (
    <View style={styles.product}>
            <View style={StyleSheet.absoluteFill} >
                    <Svg height={111} width={175}> 
                    <Image 
                        onPress={() => navigation.navigate('Product_detail', {
                            paramKey: props.data,
                        })}
                        href={require('../image/rog_lap.jpg')} 
                        
                        //source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-550f2.appspot.com/o/4_zu_3_gz700_1.png?alt=media&token=6bab32e1-0b98-413f-ab46-10a035cf6547' }}
                        height={111} 
                        width={175}
                        resizeMode={'xMidYMid slice'}/>
                </Svg>
                </View>
            <View flexDirection='row'>
                <Icon name='heart-o' size={25} color={color.grey_text} marginLeft={10} marginTop={7}/>
                <View style={StyleSheet.absoluteFill} marginLeft={130}>
                    <Svg height={41} width={29}> 
                    <Image 
                        href={require('../image/OFF.png')} 
                        height={41} 
                        width={29}
                        resizeMode={'xMidYMid slice'}/>
                    <Text style={styles.off_text}>25%</Text>
                </Svg>
                </View>
            </View>
          <Text style={styles.Pro_name}>{props.data.name}</Text>
            <View style={styles.star}>
                <Icon name="star" size={15} color={color.yellow} />
                <Icon name="star" size={15} color={color.yellow} marginLeft={3}/>
                <Icon name="star" size={15} color={color.yellow} marginLeft={3}/>
                <Icon name="star" size={15} color={color.yellow} marginLeft={3}/>
                <Icon name="star-o" size={15} color={color.yellow} marginLeft={3}/>
            </View>
            <View flexDirection='row' marginTop={5} marginHorizontal={8}> 
                <Text style={styles.price}>${props.data.price}</Text>
                <Text style={styles.price_sale}>$5000</Text>
            </View>
            <View style={StyleSheet.absoluteFill} marginLeft={142} marginTop={160}>
                    <Svg height={33} width={33}> 
                    <Image 
                        href={require('../image/icon_add.png')} 
                        height={33} 
                        width={33}
                        resizeMode={'xMidYMid slice'}/>
                </Svg>
                </View>
            
        </View>
  )
}

export default product;

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
        marginTop: 83,
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
        color: color.white,
    },
})