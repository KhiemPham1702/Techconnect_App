import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import User_commented from '../task/user_commented';

import { db, ref, set, child, get, onValue,} from '../DAL/Database'
import { User } from './Login';
import {ProductData} from './Home'

var FullComment = []
export default function My_assessment() {
  const navigation = useNavigation();
  
  const [Data, setData] = useState([])

  function LoadComment() {
    const starCountRef = ref(db, "User_comment/");
    setData([])
    FullComment = []
    onValue(
      starCountRef,
      (snapshot) => {
        Carts = []
        FullCartOfUser = []
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val()
          
          const product = ProductData.find(element => element.ID == comment.Product_ID)
          comment.product = product

          if(comment.User_ID == User.ID) {
            setData((pre) => [...pre, comment]);
            FullComment.push(comment)
          }

        });
      },
      {
        onlyOnce: true,
      }
  )}


  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ['All', 'Newest', 'Rate star'];

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

    LoadComment()
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  };

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

  function Filter(index) {
    console.log(FullComment)
    if (categories[index] == "All") {

      setData(FullComment)
    }
    else if (categories[index] == "Newest") {
      setData([])
      let temp = [...FullComment].sort((a, b) => parseFloat(a.Rate) < parseFloat(b.Rate) ? 1 : -1)

      setData(temp)
    }
    else if (categories[index] == "Rate star") {
      setData([])
      let temp = [...FullComment].sort((a, b) => parseFloat(a.Rate) > parseFloat(b.Rate) ? 1 : -1)

      setData(temp)
    }

    setCategoryIndex(index)


  }


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
      <Text style={styles.title} marginLeft={122} marginTop={30}>My Assessment</Text>
      <CategoryList />
      <FlatList marginTop={15}
        marginLeft={22}
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={(item) =>
          <User_commented
            data={item}
          />

        }>
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
    marginTop: 30,
    marginBottom: 20,
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

