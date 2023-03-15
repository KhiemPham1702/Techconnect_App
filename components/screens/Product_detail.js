import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import Comment from '../task/comment';
import Product from '../task/product';

const { width } = Dimensions.get('window');

export default function Product_detail() {
    const DATA = [
        { id: "1", title: "Trademark" },
        { id: "2", title: "Guarantee" },
        { id: "3", title: "Series/Model" },
        { id: "4", title: "Color" },
        { id: "5", title: "Headphone type" },
        { id: "6", title: "Connection type" },
        { id: "7", title: "Connection standard" },
        { id: "8", title: "Microphone" },
        { id: "9", title: "Impedance" },
        { id: "10", title: "Frequency" },
      ];
    const DATA2 = [
        { id: "1", title: "Logitech" },
        { id: "2", title: "24 months" },
        { id: "3", title: "G733 LightSpeed Wireless" },
        { id: "4", title: "White" },
        { id: "5", title: "Over-ear" },
        { id: "6", title: "Wireless" },
        { id: "7", title: "Reciever USB type A" },
        { id: "8", title: "Removable" },
        { id: "9", title: "1kHz 32Ohm" },
        { id: "10", title: "20Hz - 20KHz" },
    ];
    const DATA3 = [
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
          {
            id: '5',
            title: 'Item 2',
          },
          {
            id: '6',
            title: 'Item 3',
          },
          {
            id: '4',
            title: 'Item 1',
          },
          {
            id: '5',
            title: 'Item 2',
          },
          {
            id: '6',
            title: 'Item 3',
          },
      ];
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

    const renderProduct = () => {
        return <Product />;
    };

    const Item = ({ title }) => {
        return <Text style={styles.specifications}>{ title }</Text>;
    };

    const Item2 = ({ title }) => {
        return <Text style={styles.specifications2}>{ title }</Text>;
    };

    const renderItem = ({ item }) => <Item title={item.title} />;
    const renderItem2 = ({ item }) => <Item2 title={item.title} />;

    const Buyer_image = () => {
        return (
            <View style={styles.buyer_image}>
                <View style={StyleSheet.absoluteFill}>
                    <Svg height={75} width={81}> 
                    <Image 
                        href={require('../image/user1.jpg')} 
                        height={75} 
                        width={81}
                        resizeMode={'xMidYMid slice'}/>
                    </Svg>
                </View>
        </View>
        )
    };

    const Product_image = () => {
        return (
            <View style={styles.imageView}>
                <View style={StyleSheet.absoluteFill} borderRadius={30}>
                    <Svg height={303} width={375}>
                    <Image 
                        href={require('../image/3.png')} 
                        height={303} 
                        width={375}
                        />
                    </Svg>
                </View> 
            </View>
        )
    };

    return(
        <View style={styles.container}>
            <View>
                <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
                    <Svg height={40} width={40}  >
                    <Image 
                        href={require('../image/icon_back_white.png')} 
                        height={40} 
                        width={40}
                        preserveAspectRatio="xMidYMid slice"/>
                    </Svg>
                </View> 
                <Icon2 name='dots-three-vertical' size={30} color={color.white} marginTop={40} marginLeft={352}></Icon2>
                <View marginTop={14}>
                    <ScrollView horizontal pagingEnabled>
                        <Product_image/>
                        <Product_image/>
                        <Product_image/>
                    </ScrollView>
                </View>
                <View style={styles.Detail}>
                    <ScrollView>
                        <View flexDirection='row'>
                            <Text style={styles.product_name}>Logitech G733 LIGHTSPEED Wireless</Text>
                            <View style={StyleSheet.absoluteFill} marginLeft={289}>
                                <Svg height={69} width={49}> 
                                    <Image 
                                        href={require('../image/OFF2.png')} 
                                        height={69} 
                                        width={49}
                                        resizeMode={'xMidYMid slice'}/>
                                    <Text style={styles.off_text}>25%</Text>
                                </Svg>
                            </View>
                        </View>
                        <View style={styles.star} marginTop={11}>
                            <Icon name="star" size={20} color={color.yellow_2} />
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                            <Icon name="star-o" size={20} color={color.yellow_2} marginLeft={5}/>
                            <Text style={styles.review}>(250 Reviews)</Text>                       
                        </View>
                        <View flexDirection='row' marginTop={5}> 
                            <Text style={styles.price}>$10000</Text>
                            <Text style={styles.price_sale}>$5000</Text>
                            <Icon name='heart-o' size={28} color={color.white} marginLeft={130} marginTop={3}/>
                            <Icon3 name='sharealt' size={30} color={color.white} marginLeft={10}/>
                        </View>
                        <View style={styles.line} />
                        <Text style={styles.section}>Technical parameters</Text>
                        <View flexDirection='row' marginLeft={15}>
                            <View>
                                <FlatList
                                    data={DATA}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}/>
                            </View>
                            <View marginLeft={35}>
                                <FlatList
                                        data={DATA2}
                                        renderItem={renderItem2}
                                        keyExtractor={(item) => item.id}/>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <Text style={styles.section}>Describe</Text>
                        <Text style={styles.specifications} paddingHorizontal={15}>Logitech G733 LIGHTSPEED Wireless White line of computer headsets is designed with gamers in mind. These are wireless headphones packed with the stereophonic sound, sound filters, and advanced lighting features you need to look, speak, and play in style like never before.</Text>
                        <View style={styles.line} />
                        <Text style={styles.section}>Product Reviews</Text>
                        <View flexDirection='row'>
                            <Text style={styles.score}>4.0</Text>
                            <View style={styles.star} marginTop={20} marginLeft={10}>
                                <Icon name="star" size={20} color={color.yellow_2} />
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5}/>
                                <Icon name="star-o" size={20} color={color.yellow_2} marginLeft={5}/>                      
                                <Text style={styles.review}>(250 Reviews)</Text> 
                            </View>
                        </View>
                        <Text style={styles.section2}>Pictures from buyers</Text>
                        <ScrollView horizontal>
                            <Buyer_image/>
                            <Buyer_image/>
                            <Buyer_image/>
                            <Buyer_image/>
                            <Buyer_image/>
                            <Buyer_image/>
                        </ScrollView>
                        <ScrollView horizontal pagingEnabled>
                            <Comment/>
                            <Comment/>
                        </ScrollView>
                        <View style={styles.line} />
                        <Text style={styles.section}>Similar products</Text>
                        <FlatList marginTop={10}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={DATA3}
                            renderItem={renderProduct}>
                        </FlatList>
                    </ScrollView>
                </View>
            </View> 
                       
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    imageView: {
        borderRadius: 30,
        height: 303,
        width: 375,
        marginHorizontal: 18,
        marginTop: 14,
    },
    Detail: {
        marginTop: 35,
        height: 412,
        Width: 1468,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: color.grey_text,
        paddingHorizontal: 20,
        paddingTop: 0,
    },
    product_name: {
        marginTop: 25,
        width: 293,
        fontFamily: 'Inter_Medium',
        color: color.white,
        fontSize: 24,
    },
    star: {
        flexDirection: 'row',
    },
    review: {
        marginLeft: 10,
        fontFamily: 'Inter_Medium',
        color: color.white,
        fontSize: 16,
    },
    price: {
        marginTop: 5,
        fontFamily: 'Inter_SemiBold',
        fontSize: 20,
        color: color.white,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    price_sale: {
        marginLeft: 10,
        fontFamily: 'Inter_SemiBold',
        fontSize: 26,
        color: color.red,
    },
    off_text: {
        marginLeft: 10,
        marginTop: 7,
        fontFamily: 'Inter_SemiBold',
        fontSize: 15,
        color: color.white,
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.grey_BE,
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    section: {
        fontFamily: 'Inter_SemiBold',
        fontSize: 20,
        color: color.white,
    },
    section2: {
        fontFamily: 'Inter_SemiBold',
        fontSize: 14,
        color: color.white,
    },
    specifications: {
        fontFamily: 'Inter_Medium',
        fontSize: 14,
        color: color.white,
        marginTop: 10,
        textAlign: 'justify',
    },
    specifications2: {
        fontFamily: 'Inter_Medium',
        fontSize: 14,
        color: color.grey_A0,
        marginTop: 10,
    },
    score: {
        fontFamily: 'Inter_SemiBold',
        fontSize: 36,
        color: color.white,
    },
    buyer_image: {
        height:75,
        width: 81,
        marginRight: 15,
        marginTop: 10,
        backgroundColor: color.white,
        borderRadius: 10,
    },
    bottom_View: {
        position: 'absolute', 
        bottom: 0, 
        height: 100, 
        backgroundColor: 'red'
    },
  });
