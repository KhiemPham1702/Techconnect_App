import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity, ImageBackground, Animated, Image } from 'react-native';
import Svg, { Image2 } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import color from '../../contains/color';
import Comment from '../task/comment';
import Product from '../task/product';
import { Recommend_data } from '../../Recommend/recommend_data';

import { db, ref, set, child, get, onValue, remove } from '../DAL/Database'
import { liked, LoadCarts, User, Carts, CartProduct } from '../screens/Login'
import { ProductData } from '../screens/Home'

const { width } = Dimensions.get('window');

export default function Product_detail({ route }) {
    const [BuyOrCart, setBuyOrCart] = useState('Buy Now');
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(1);
    const onPress = () => setCount(prevCount => prevCount + 1);
    const onPress2 = () => setCount(prevCount => ((prevCount <= 1) ? (prevCount + 0) : (prevCount - 1)))
    const [slideAnimation] = useState(new Animated.Value(Dimensions.get('window').height));
    const navigation = useNavigation();


    const [SimilarProduct, setSimilarProduct] = useState([])
    const childRef = useRef()

    function HandleSimilarProduct() {
        recommendData.forEach((d) => {
            let data = ProductData.find(element => element.name == d)

            if(data != undefined )
                setSimilarProduct((pre) => [...pre, data]);
        })

    }

    const slideUp = (text) => {
        setBuyOrCart(text)
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const sliceDown = () => {
        Animated.timing(slideAnimation, {
            toValue: 1000,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsVisible(false));
    };

    const getDataArray = (dataArray) => {
        if (Array.isArray(dataArray) && dataArray.length > 0) console.log(dataArray);
    };

    const TypeProduct = {
        Laptop: 0,
        Headphone: 1,
        Keyboard: 2,
        Mouse: 3,
        Gamepad: 4,
    }

    const [like, setLike] = useState(route.params.like.isLike)
    const [icon, setIcon] = useState(() => {
        return route.params.like.isLike == true ? 'heart' : 'heart-o';
    });

    function Like() {
        set(ref(db, 'Liked/' + (User.ID + route.params.like.ID)), {
            ID: User.ID + route.params.like.ID,
            product_ID: route.params.like.ID,
            user_ID: User.ID
        })
            .then(() => {
                liked.push({ "ID": (User.ID + route.params.like.ID), "user_ID": User.ID, "product_ID": route.params.like.ID })
            })
            .catch((error) => {
                // The write failed...
            });
    }
    function Unlike() {
        console.log(liked)
        for (var i = 0; i < liked.length; i++) {

            if (liked.at(i).ID === (User.ID + route.params.like.ID)) {

                liked.splice(i, 1);
            }

        }
        remove(ref(db, 'Liked/' + (User.ID + route.params.paramKey.ID)), {
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

    const [ProductDetail, setProductDetail] = useState([]);
    const [Field, setField] = useState([]);
    const [Type, setType] = useState();
    const [recommendData, setRecommendData] = useState([]);

    useEffect(() => {
        console.log("recommend Data" + recommendData)
        if(recommendData.length > 0)
            HandleSimilarProduct()
        //laptop
        let starCountRef = ref(db, "Laptop/");
        setProductDetail([]);
        setField([]);
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['product_ID'] == route.params.paramKey.ID) {
                        console.log(1);
                        delete da['product_ID']
                        //console.log(da);
                        //const i = da.indexOf('product_ID');
                        //da = da.splice(i, 1);
                        setProductDetail((pre) => [...pre, Object.values(da)])
                        setField((pre) => [...pre, Object.keys(da)])
                        console.log(1);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        //headphone
        starCountRef = ref(db, "headphone/");
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['product_ID'] == route.params.paramKey.ID) {
                        console.log(2);
                        delete da['product_ID']
                        //console.log(da);
                        //const i = da.indexOf('product_ID');
                        //da = da.splice(i, 1);
                        setProductDetail((pre) => [...pre, Object.values(da)])
                        setField((pre) => [...pre, Object.keys(da)])
                        console.log(1);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        //keyboard
        starCountRef = ref(db, "Keyboard/");
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['product_ID'] == route.params.paramKey.ID) {
                        console.log(2);
                        delete da['product_ID']
                        //console.log(da);
                        //const i = da.indexOf('product_ID');
                        //da = da.splice(i, 1);
                        setProductDetail((pre) => [...pre, Object.values(da)])
                        setField((pre) => [...pre, Object.keys(da)])
                        console.log(1);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        //mouse
        starCountRef = ref(db, "Mouse/");
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['product_ID'] == route.params.paramKey.ID) {
                        console.log(2);
                        delete da['product_ID']
                        //console.log(da);
                        //const i = da.indexOf('product_ID');
                        //da = da.splice(i, 1);
                        setProductDetail((pre) => [...pre, Object.values(da)])
                        setField((pre) => [...pre, Object.keys(da)])
                        console.log(1);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        //gamepad
        starCountRef = ref(db, "Gamepad/");
        onValue(
            starCountRef,
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    if (da && da['product_ID'] == route.params.paramKey.ID) {
                        console.log(2);
                        delete da['product_ID']
                        //console.log(da);
                        //const i = da.indexOf('product_ID');
                        //da = da.splice(i, 1);
                        setProductDetail((pre) => [...pre, Object.values(da)])
                        setField((pre) => [...pre, Object.keys(da)])
                        console.log(1);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        return () => { }

    }, [recommendData])

    const PaymentData = new Array({
        "ID": route.params.paramKey.ID,
        "name": route.params.paramKey.name,
        "color": route.params.paramKey.color,
        "price": route.params.paramKey.price,
        "quantity": count,
        "image": route.params.listImage.at(0),
        "SaleOff": route.params.SaleOff
    });

    
    
    const DATA4 = [
        {
            id: '1',
            title: 'White',
        },
        {
            id: '2',
            title: 'Black',
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
        //return <Product />;
    };

    const Item = ({ title }) => {
        return <Text style={styles.specifications}>{title}</Text>;
    };

    const Item2 = ({ title }) => {
        return <Text style={styles.specifications2}>{title}</Text>;
    };

    const renderItem = ({ item }) => <Item title={item.title} />;
    const renderItem2 = ({ item }) => <Item2 title={item.title} />;

    const Buyer_image = () => {
        return (
            <View style={styles.buyer_image}>
                <Image
                    source={require('../image/user1.jpg')}
                    style={styles.Buyer_image}
                />
            </View>
        )
    };

    function BuyOrAddToCart() {
        //// Add to cart ////
        let unique = (+new Date).toString(36);
        console.log(unique);
        set(ref(db, 'Cart/' + unique), {
            ID: unique,
            user_ID: User.ID,
            product_ID: route.params.paramKey.ID,
            order_ID: "",
            quantity: count,
            product_Type: ""
        }).catch((error) => {
            console.error(error);
        });

        const carts = new Array({ "ID": unique })
        //// buy now ////
        if (BuyOrCart == 'Buy Now') {
            navigation.navigate('Payment', {
                productData: PaymentData,
                carts: carts,
            })
        }

        Carts.push({
            ID: unique,
            user_ID: User.ID,
            product_ID: route.params.paramKey.ID,
            order_ID: "",
            quantity: count,
            product_Type: "",
            image: route.params.listImage.at(0),
            discount_ID: route.params.paramKey.discount_ID,
            SaleOff: route.params.SaleOff,
            product: route.params.paramKey
        })

        const starCountRef = ref(db, "Product/" + route.params.paramKey.ID);
        onValue(
            starCountRef,
            (snapshot) => {
                CartProduct.push(snapshot.val())
            },
            {
                onlyOnce: true,
            }
        );

        sliceDown()
    }

    const Product_image = ({ item }) => {
        //const item = 'https://reactnative.dev/img/tiny_logo.png?fbclid=IwAR1EhF8DfYpEoBdAqNen17pOnhlVWzksrLWoXFXto8oHuLgpwZwvnrjxPI4'
        return (
            <View style={styles.imageView}>
                <Image
                    style={styles.img}
                    // source={require('../image/3.png')}
                    //source={{ uri: 'https://reactnative.dev/img/tiny_logo.png?fbclid=IwAR1EhF8DfYpEoBdAqNen17pOnhlVWzksrLWoXFXto8oHuLgpwZwvnrjxPI4' }}
                    source={{ uri: item }}
                />
            </View>
        )
    };

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


    return (
        <View style={styles.container}>
            <Recommend_data movie={route.params.paramKey.name} getDataArray={setRecommendData} />
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View height={40} width={40} marginLeft={14} marginTop={30}>
                        <Image
                            source={require('../image/icon_back_white.png')}
                            height={40}
                            width={40} />
                    </View>
                </TouchableOpacity>
                <Icon2 name='dots-three-vertical' size={30} color={color.white} marginTop={-30} marginLeft={352}></Icon2>
                <View marginTop={14}>
                    <ScrollView horizontal pagingEnabled>
                        {
                            route.params.listImage.map((image) => (

                                <Product_image item={image} />

                            ))
                        }
                        {/* <Product_image />
                        <Product_image /> */}
                    </ScrollView>
                </View>
                <View style={styles.Detail}>
                    <ScrollView>
                        <View flexDirection='row'>
                            <Text style={styles.product_name} numberOfLines={2}>{route.params.paramKey.name}</Text>
                            <View height={69} width={49} marginLeft={10}>
                                <Image
                                    source={require('../image/OFF2.png')}
                                    height={'100%'}
                                    width={'100%'} />
                                <Text style={styles.off_text}>{route.params.ratio}%</Text>
                            </View>
                        </View>
                        <View style={styles.star} marginTop={10}>
                            <Icon name="star" size={20} color={color.yellow_2} />
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                            <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                            <Icon name="star-o" size={20} color={color.yellow_2} marginLeft={5} />
                            <Text style={styles.review}>(250 Reviews)</Text>
                        </View>
                        <View flexDirection='row' marginTop={5}>
                            <Text style={styles.price}>${route.params.paramKey.price}</Text>
                            <Text style={styles.price_sale}>${route.params.SaleOff}</Text>
                            <Icon name={icon} onPress={ClickHeart} size={28} color={color.white} marginLeft={130} marginTop={3} />
                            <Icon3 name='sharealt' size={30} color={color.white} marginLeft={10} />
                        </View>
                        <View style={styles.line} />
                        <Text style={styles.section}>Technical parameters</Text>
                        <View flexDirection='row' marginLeft={15}>
                            <View>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    //data={DATA[Type]}
                                    data={Field.at(0)}
                                    renderItem={({ item }) => <Item title={item} />} />
                                {/* // keyExtractor={(item) => item.id} /> */}
                            </View>
                            <View marginLeft={15}>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={ProductDetail.at(0)}
                                    renderItem={({ item }) => <Item2 title={item} />} />
                                {/* keyExtractor={(item) => item.id} /> */}

                            </View>
                        </View>
                        <View style={styles.line} />
                        <Text style={styles.section}>Describe</Text>
                        <Text style={styles.specifications} paddingHorizontal={15}>{route.params.paramKey.description}</Text>
                        <View style={styles.line} />
                        <Text style={styles.section}>Product Reviews</Text>
                        <View flexDirection='row'>
                            <Text style={styles.score}>4.0</Text>
                            <View style={styles.star} marginTop={20} marginLeft={10}>
                                <Icon name="star" size={20} color={color.yellow_2} />
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                                <Icon name="star" size={20} color={color.yellow_2} marginLeft={5} />
                                <Icon name="star-o" size={20} color={color.yellow_2} marginLeft={5} />
                                <Text style={styles.review}>(250 Reviews)</Text>
                            </View>
                        </View>
                        <Text style={styles.section2}>Pictures from buyers</Text>
                        <ScrollView horizontal>
                            <Buyer_image />
                            <Buyer_image />
                            <Buyer_image />
                            <Buyer_image />
                            <Buyer_image />
                            <Buyer_image />
                        </ScrollView>
                        <ScrollView horizontal pagingEnabled>
                            <Comment />
                            <Comment />
                        </ScrollView>
                        <View style={styles.line} />
                        <Text style={styles.section}>Similar products</Text>
                        <FlatList marginTop={10}
                            numColumns={2}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            data={SimilarProduct}
                            renderItem={({item, index}) =>
                                <Product data={item} like={checkLike(item.ID)}
                                    onRef={ref => (this.parentReference = ref)}
                                    ref={childRef}
                                />
                            }>
                        </FlatList>
                    </ScrollView>
                    <View style={styles.bottom_view}>
                        <View flexDirection='row' height={40} width={215} marginTop={13}>
                            <TouchableOpacity onPress={() => slideUp('Add to cart')}>
                                <View height={40} width={215} marginLeft={15}>
                                    <Image
                                        source={require('../image/btAddtoCart.png')}
                                        height={40}
                                        width={215} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => slideUp('Buy Now')}>
                                <View height={40} width={215} marginLeft={-60}>
                                    <Image
                                        source={require('../image/btBuyNow.png')}
                                        height={40}
                                        width={215} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '50%',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: 'white',
                        transform: [{ translateY: slideAnimation }],
                    }}>
                    <View flexDirection='row' marginLeft={20} marginTop={20}>
                        <View style={styles.avatar_view3}>
                            <View height={80} width={80}>
                                <Image
                                    onPress={slideUp}
                                    source={require('../image/3.png')}
                                    height={80}
                                    width={80} />
                            </View>
                        </View>
                        <View marginTop={5} marginLeft={10}>
                            <Text style={styles.pro_name}>{route.params.paramKey.name}</Text>
                            <Text style={styles.pro_color}>{"$" + route.params.paramKey.price}</Text>
                        </View>
                        <TouchableOpacity onPress={sliceDown}>
                            <Icon4 name='window-close' size={30} color={'black'} marginLeft={60} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line2} />
                    <Text style={styles.component} marginLeft={20}>Color</Text>
                    <FlatList
                        marginLeft={20}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        data={DATA4}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                            <View style={styles.view_buttom}>
                                <Text style={styles.view_text_buttom}>{item.title}</Text>
                            </View>
                        )}>
                    </FlatList>
                    <View marginBottom={30}>
                        <View flexDirection='row'>
                            <Text style={styles.component} marginLeft={20}>Quantity</Text>
                            <View style={styles.add}>
                                <TouchableOpacity onPress={onPress2}>
                                    <Text style={styles.minus} marginLeft={15} marginTop={-4}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.minus} marginLeft={20} marginTop={-3.5}>{count}</Text>
                                <TouchableOpacity onPress={onPress}>
                                    <Text style={styles.minus} marginTop={-4} marginLeft={18}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={BuyOrAddToCart}>
                            <View style={styles.button2}>
                                <Text style={styles.buttonText2}>{BuyOrCart}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
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
        height: 353,
        width: 375,
        marginHorizontal: 18,
        marginTop: 14,
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    product_image: {
        height: 200,
        width: 200,
    },
    Detail: {
        marginTop: 35,
        height: 412,
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
        marginTop: -63,
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
    line2: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.grey_BE,
        borderWidth: 1,
        width: '90%',
        marginVertical: 10,
        marginHorizontal: 20,
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
        marginTop: 20,
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
    component: {
        fontFamily: 'Inter_Medium',
        fontSize: 18,
    },
    buyer_image: {
        height: 75,
        width: 81,
        marginRight: 15,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: color.white,
    },
    Buyer_image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    bottom_View: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        backgroundColor: 'red'
    },
    bottom_view: {
        backgroundColor: color.white,
        height: 110,
        flexDirection: 'row',
        marginHorizontal: -20,
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
        color: 'black',
        fontFamily: 'Inter_SemiBold',
    },
    pro_color: {
        marginTop: 3,
        width: 197,
        fontSize: 16,
        color: color.red,
        fontFamily: 'Inter_SemiBold',
    },
    view_buttom: {
        height: 31,
        width: 93,
        borderRadius: 5,
        borderColor: color.grey_A0,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 20,
        marginTop: 10,
    },
    view_text_buttom: {
        fontFamily: 'Inter_Medium',
        fontSize: 14,
        color: color.grey_A0,
    },
    add: {
        backgroundColor: color.red,
        width: 110,
        height: 30,
        borderRadius: 5,
        marginLeft: 190,
        flexDirection: 'row',
        alignItems: 'center',
    },
    minus: {
        fontSize: 25,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    button2: {
        backgroundColor: color.red,
        height: 40,
        width: 347,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 35,
        marginBottom: 30,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 22,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
});
