import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Product_bought from '../task/product_bought';

import { db, ref, set, child, get, onValue, auth } from '../DAL/Database'
import { FullCartOfUser, User } from './Login';
import { ProductData } from './Home';

var OriginOrder = []
export default function History() {
  const navigation = useNavigation();

  const [OrderData, setOrderData] = useState([])

  function LoadOrder() {
    OriginOrder = []
    setOrderData([])
    const starCountRef = ref(db, "Order/");
    onValue(
      starCountRef,
      (snapshot) => {
        //Carts = []
        snapshot.forEach((childSnapshot) => {
          const order = childSnapshot.val()
          if(order.user_ID == User.ID) {
            let carts = []
            FullCartOfUser.forEach((data) => {
              if(data.order_ID == order.ID)
              {
                let cart = data

                let e = ProductData.find(i => i.ID == cart.product_ID)

                cart.product = e
                //console.log(cart)
                carts.push(cart)
              }
              
            })
            //console.log(order)
            //console.log(carts)
            order.carts = carts;
            setOrderData((pre) => [...pre, order]);
            OriginOrder.push(order)
          }


        });
      },
      {
        onlyOnce: true,
      }
    );
  }

  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ['All', 'Newest', 'Price'];

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
    LoadOrder()

  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  };

  function Filter(index) {
    console.log(OriginOrder)
    if (categories[index] == "All") {

      setOrderData(OriginOrder)
    }
    else if (categories[index] == "Newest") {
      setOrderData([])
      let temp = [...OriginOrder].sort((a, b) => parseFloat(a.order_total) < parseFloat(b.order_total) ? 1 : -1)

      setOrderData(temp)
    }
    else if (categories[index] == "Price") {
      setOrderData([])
      let temp = [...OriginOrder].sort((a, b) => parseFloat(a.order_total) > parseFloat(b.order_total) ? 1 : -1)

      setOrderData(temp)
    }

    setCategoryIndex(index)


  }

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => Filter(index)}>
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <Icon name='sort' color={color.white} size={25} marginTop={-3} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
        <Svg height={40} width={40}  >
          <Image
            onPress={() => navigation.goBack()}
            href={require('../image/icon_back_white.png')}
            height={40}
            width={40}
            preserveAspectRatio="xMidYMid slice" />
        </Svg>
      </View>
      <Text style={styles.title} marginLeft={172} marginTop={30}>History</Text>
      <CategoryList />
      <FlatList marginTop={0}
        marginLeft={0}
        showsVerticalScrollIndicator={false}
        data={OrderData}
        renderItem={(item) =>
          <Product_bought
            data = {item}
          />}>
      </FlatList>
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
  searchtext: {
    flexDirection: 'row',
    height: 50,
    width: 280,
    marginLeft: 70,
    justifyContent: 'center',
    marginTop: 24,
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

  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-evenly',
  },
  categoryText: {
    fontSize: 14,
    color: color.white,
    fontFamily: 'Inter_SemiBold',

  },
  categoryTextSelected: {
    color: color.red,
    paddingBottom: 1,
    borderBottomWidth: 2,
    borderColor: color.red,
  },
})

