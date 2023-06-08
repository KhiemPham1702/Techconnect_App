import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, LogBox, RefreshControl } from 'react-native';
import React from 'react'
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


import color from '../../contains/color';
import Product_review from '../task/product_review';
import Brand from '../task/brand';
import Product from '../task/product';
import { Recommend_data } from '../../Recommend/recommend_data';

import { db, ref, set, child, get, onValue } from '../DAL/Database'
import { liked, User, brand, Carts, CartProduct } from '../screens/Login';

export { CartProduct }

var test = [1, 2, 3, 4, 5]

function LoadImage(e, i) {
    const starCountRef = ref(db, "Image/");

    onValue(
        starCountRef,
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const image = childSnapshot.val()
                // console.log(image)
                if (image.product_ID == e.product_ID) {
                    e.image = image.image_Url
                    //console.log(image.image_Url)
                }
            })
        },
        {
            onlyOnce: true,
        }
    );

}


export var ProductData = []

export default function Home() {
    const childRef = useRef()

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const navigation = useNavigation();

    const [DATA, setDATA] = useState([]);
    const [imageBrand, setImageBrand] = useState([])

    const [advertise, setAdvertise] = useState([])

    const [Category, setCategory] = useState("")
    const [ProductBrand, setProductBrand] = useState("")

    const [recommendData, setRecommendData] = useState([]);


    const getDataArray = (dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0) console.log(dataArray);
    };

    function LoadProduct() {
        //console.log("Load product")
        const starCountRef = ref(db, "Product/");
        ProductData = []
        setDATA([]);
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let data = childSnapshot.val()

                    ProductData.push(data);
                    if(advertise.length < 3)
                        advertise.push(data)

                    if (recommendData.includes(data.ID))
                        setDATA((pre) => [...pre, data]);

                    if (Carts.length != CartProduct.length) {

                        for (let i = 0; i < Carts.length; i++) {
                            if (data.ID == Carts.at(i).product_ID) {
                                //CartProduct.push(data)
                                Carts.at(i).product = data;
                                LoadImage(Carts.at(i), i)
                            }
                        }
                    }
                });

            },
            {
                onlyOnce: true,
            }
        );
    }


    function LoadImageBrand(id) {
        const starCountRef = ref(db, "Image/" + id);
        onValue(
            starCountRef,
            (snapshot) => {
                setImageBrand((pre) => [...pre, snapshot.val()]);
            },
        );
    }

    const renderItem2 = () => {
        return <Product_review />;
    };

    const DATA5 = [
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
    ];

    const { height, width } = Dimensions.get("window");
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
        setImageBrand([]);
        brand.forEach((e) => {
            LoadImageBrand(e.ID_Image);

        })

        if (recommendData.length > 0) {
            console.log(recommendData);
        }

        LoadProduct();
        if(ProductData.length > 0) {
            for(let i = 0; i < ProductData.length; i++)
                setAdvertise((pre) => [...pre, ProductData.at(i)]);
        }
        // navigation.addListener('focus', () => {
        //     //alert('Refreshed');
        //     LoadProduct();


        //     //CreateChildRef()
        //     //console.log(Carts);
        //     console.log('--------------');
        // });


    }, [recommendData]);



    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };
    // const renderItem = ({ item }) => {
    //     return <product item={item}/>;
    //   };

    function checkLike(id) {

        let isLiked = false;
        //console.log(liked)
        liked.forEach((e) => {
            if (e.product_ID == id) {
                //console.log(e)
                isLiked = true;

            }
        })

        //console.log(isLiked) 

        return { "islike": isLiked, "id": (User.ID + id) }
    }

    function FilterCategory(category) {
        if (category == Category) {
            setCategory("")
            Filter("", ProductBrand)
        }
        else {
            setCategory(category)
            Filter(category, ProductBrand)
        }

    }

    function FilterBrand(brandName) {
        if (brandName == ProductBrand) {
            setProductBrand("")
            Filter(Category, "")
        }
        else {
            setProductBrand(brandName)
            Filter(Category, brandName)
        }
    }

    function Filter(category, brandName) {
        let dataFilter = [];

        for (let i = 0; i < test.length; i++) {

            const e = ProductData.find(data => data.ID == test.at(i))
            console.log(e)
            if (e
                && (category == "" || (category == e.category_ID))
                && (brandName == "" || (brandName == e.brand_ID)))
                dataFilter.push(e);
        }

        setDATA(dataFilter)
    }

    return (
        <View style={styles.container}>
            <Recommend_data movie={''} getDataArray={setRecommendData} />
            <View style={StyleSheet.absoluteFill} marginLeft={15} marginTop={30} >
                <Svg height={40} width={40}>
                    <Image
                        href={require('../image/logo.png')}
                        height={40}
                        width={40}
                        preserveAspectRatio="xMidYMid slice" />
                </Svg>
            </View>
            <View style={StyleSheet.absoluteFill} marginLeft={56} marginTop={28} >
                <Svg height={55} width={110}>
                    <Image
                        href={require('../image/2.png')}
                        height={55}
                        width={110}
                        resizeMode={'cover'} />
                </Svg>
            </View>
            <View style={styles.searchtext}>
                <TextInput
                    style={styles.searchhinttext}
                    placeholder="Search products..."
                    placeholderTextColor={color.white}
                //onFocus={() => { navigation.navigate('List_product'); }}
                />
                <View style={StyleSheet.absoluteFill} marginLeft={153} marginTop={12}>
                    <Svg height={28} width={28}  >
                        <Image
                            href={require('../image/icon_search.png')}
                            height={28}
                            width={28}
                            preserveAspectRatio="xMidYMid slice" />
                    </Svg>
                </View>
            </View>
            <ScrollView marginTop={20}>
                <Text style={styles.textTop}>Discover Your Best</Text>
                <View marginTop={27}>
                    <FlatList
                        pagingEnabled
                        horizontal
                        showsVerticalScrollIndicator={false}
                        data={advertise}
                        renderItem={(item) =>
                            <Product_review
                                data={item}
                            />
                        }>
                    </FlatList>
                </View>
                <View style={styles.Choose}>
                    <View>
                        <View style={styles.Circle} >
                            <Svg height={30} width={30} >
                                <Image
                                    href={require('../image/laptop.png')}
                                    height={30}
                                    width={30}
                                    preserveAspectRatio="xMidYMid slice"
                                    onPress={() => FilterCategory("Laptop")}
                                />
                            </Svg>
                        </View>
                        <Text style={styles.Circle_text} marginLeft={3}>Laptop</Text>
                    </View>
                    <View marginLeft={25}>
                        <View style={styles.Circle} >
                            <Svg height={35} width={35}  >
                                <Image
                                    href={require('../image/headphone.png')}
                                    height={35}
                                    width={35}
                                    preserveAspectRatio="xMidYMid slice"
                                    onPress={() => FilterCategory("Headphone")}
                                />
                            </Svg>
                        </View>
                        <Text style={styles.Circle_text} marginLeft={-11}>Headphone</Text>
                    </View>
                    <View marginLeft={16}>
                        <View style={styles.Circle} >
                            <Svg height={30} width={30} >
                                <Image
                                    href={require('../image/mouse.png')}
                                    height={30}
                                    width={30}
                                    preserveAspectRatio="xMidYMid slice"
                                    onPress={() => FilterCategory("Mouse")}
                                />
                            </Svg>
                        </View>
                        <Text style={styles.Circle_text} marginLeft={6}>Mouse</Text>
                    </View>
                    <View marginLeft={22}>
                        <View style={styles.Circle} >
                            <Svg height={30} width={30}  >
                                <Image
                                    href={require('../image/keyboard.png')}
                                    height={30}
                                    width={30}
                                    preserveAspectRatio="xMidYMid slice"
                                    onPress={() => FilterCategory("Keyboard")}
                                />
                            </Svg>
                        </View>
                        <Text style={styles.Circle_text} marginLeft={-3}>Keyboard</Text>
                    </View>
                    <View marginLeft={20}>
                        <View style={styles.Circle} >
                            <Svg height={30} width={30}  >
                                <Image
                                    href={require('../image/gamepad.png')}
                                    height={30}
                                    width={30}
                                    preserveAspectRatio="xMidYMid slice"
                                    onPress={() => FilterCategory("Gamepad")}
                                />
                            </Svg>
                        </View>
                        <Text style={styles.Circle_text} marginLeft={-5}>Gamepad</Text>
                    </View>
                </View>
                <Text style={styles.textMid} >Popular Brands</Text>

                <View marginTop={19}>
                    {/* <ScrollView horizontal>
                        {
                            imageBrand.map((element, index) => (

                                <Brand brand={element} key={index}/>

                            ))
                        }
                    </ScrollView> */}
                    <FlatList
                        horizontal
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        data={imageBrand}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Brand brand={item}
                                onRef={ref => (this.parentReference = ref)}
                                parentReference={FilterBrand.bind(this)}
                            />}
                    >
                    </FlatList>
                </View>

                <Text style={styles.textMid} >Popular Products</Text>
                <FlatList
                    marginTop={10} marginBottom={65}
                    marginLeft={22}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={DATA}
                    //extraData={isRender}
                    renderItem={({ item, index }) =>
                        <Product data={item} like={checkLike(item.ID)}
                            onRef={ref => (this.parentReference = ref)}
                            ref={childRef} // này cho vui, để ko bị lỗi
                        />}>
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
    container2: {
        paddingHorizontal: 17,
    },
    searchtext: {
        flexDirection: 'row',
        height: 50,
        width: 190,
        marginLeft: 200,
        justifyContent: 'center',
        marginTop: 30,
        paddingLeft: 15,
        backgroundColor: color.grey_text,

        borderRadius: 30,
        fontFamily: 'Inter_Light',
    },
    searchhinttext: {
        flex: 1,
        fontStyle: 'normal',
        fontSize: 14,
        color: color.white,
        letterSpacing: 1,
        fontFamily: 'Inter_Light',
    },
    textTop: {
        marginLeft: 17,
        fontFamily: 'Inter_SemiBold',
        color: color.white,
        fontStyle: 'normal',
        letterSpacing: 1,
        fontSize: 30,
    },
    textMid: {
        marginTop: 20,
        marginLeft: 17,
        fontFamily: 'Inter_SemiBold',
        color: color.white,
        fontStyle: 'normal',
        letterSpacing: 1,
        fontSize: 22,
    },
    Choose: {
        marginLeft: 18,
        marginTop: 35,
        flexDirection: 'row',
    },
    Circle: {
        height: 55,
        width: 55,
        borderRadius: 100,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Circle_text: {
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_SemiBold',
        marginTop: 11,

    },
})

