import { View, Text, StyleSheet, FlatList, TouchableOpacity, LogBox } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Discount_ticket from '../task/discount_ticket';

import { db, ref, set, child, get, onValue } from '../DAL/Database'
import { User } from '../screens/Login'

var Discount = []

export default function My_discount({ route }) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const navigation = useNavigation();

  const [Data, setData] = useState([])
  function LoadDisCount() {
    setData([])
    Discount = []
    const starCountRef = ref(db, "Discount/");
    onValue(
      starCountRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const discount = childSnapshot.val();
          let date = new Date(discount.expirationDate)

          if (discount.user_ID == User.ID && (isNaN(date) || date >= new Date()) 
              && discount.state == "Available") {
            setData((pre) => [...pre, discount]);
            Discount.push(discount)
          }

        });
      },
      {
        onlyOnce: true,
      }
    );

  }


  const [useDiscount, setUseDiscount] = useState([{
    ID: "", Type: "", expirationDate: "", name: "", ratio: "", state: "", user_ID: ""
  }, {
    ID: "", Type: "", expirationDate: "", name: "", ratio: "", state: "", user_ID: ""
  }])

  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ['All', 'Free Ship', 'Sale Off', 'New Coupons'];

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

    navigation.addListener('focus', () => {
      //alert('Refreshed');
      LoadDisCount()
    });

  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  };

  const renderItem2 = () => {
    return <Discount_ticket data="Use" />;
  };

  function FilterByCategory(i) {
    console.log(categories.at(i));
    if (categories.at(i) == "Free Ship" || categories.at(i) == "Sale Off") {
      setData([])
      Discount.forEach((e) => {
        if (e.Type == categories.at(i))
          setData((pre) => [...pre, e]);
      })
    }

    else {
      setData([])
      setData(Discount)
    }
    setCategoryIndex(i);
    console.log(Data)
  }

  function GoBack() {
    if (route.params != undefined && route.params.from != undefined) {

      
      console.log(route.params.getDiscount)
      
      
      route.params.getDiscount(useDiscount)
    }
    //if(navigation.)

    navigation.goBack();
  }

  function DiscountTicketCall(message, data) {
    console.log("Discount tiket call My Discount with message");
    console.log(message)
    console.log(data)

    let temp = [...useDiscount];

    if(data != undefined) {

      if (data.Type == "Free Ship") 
        temp[0] = data
      else 
        temp[1] = data;
    }

    setUseDiscount(temp);
    console.log(temp)
  }

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => FilterByCategory(index)}>
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Icon2 name='arrow-left' size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => GoBack()} />
      <Text style={styles.title} marginLeft={112} marginTop={-35}>Discount Coupons</Text>
      <CategoryList />
      <FlatList
        marginLeft={22}
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={({ item }) =>
          <Discount_ticket data={item}
            onRef={ref => (this.parentReference = ref)}
            fromMyDiscount={DiscountTicketCall.bind(this)} />}>
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
