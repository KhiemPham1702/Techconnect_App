import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

import {Recommend_data} from '../../Recommend/recommend_data';
import { ProductService } from '../connect_recommend/ProductService';

import { getDatabase} from "firebase/database";
import { db, ref, set, child, get, onValue } from '../DAL/Database'
import { liked, User, brand, Carts, CartProduct } from '../screens/Login';

export default function Start() {


  const [data, setData] = useState(null);
  const [product, setProduct] = useState([]);

  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const [fontsLoaded] = useFonts({
    Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
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


  const user = {
    id: 'abc',
    movie: 'ROG Mothership GZ700',
  };


  const getDataArray = (dataArray) => {
    if(dataArray) console.log(dataArray);
  };
  

  return (
    <View style={styles.container}>
      {/* <Recommend_data user={user} rating={rating} getDataArray={getDataArray} /> */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width}>
          <Image
            href={require('../image/Start.png')}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}
          onPress={() => navigation.navigate('Login')}
        >Get started</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: color.red,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 33,
    marginVertical: 711,
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter_SemiBold',
  }
});
