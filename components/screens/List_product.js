import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity, Animated } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import color from '../../contains/color';
import Product from '../task/product';

export default function List_product() {
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(1000));
  const [isVisible, setIsVisible] = useState(false);

  const handleSlideIn = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSlideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };
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
    const DATA2 = [
        {
          id: '1',
          title: 'Apple',
        },
        {
          id: '2',
          title: 'Asus',
        },
        {
          id: '3',
          title: 'Lenovo',
        },
        {
            id: '4',
            title: 'Hp',
          },
          {
            id: '5',
            title: 'Samsung',
          },
          {
            id: '6',
            title: 'Dell',
          },
          {
            id: '7',
            title: 'Sony',
          },
          {
            id: '8',
            title: 'Xbox',
          },
          {
            id: '9',
            title: 'Logitech',
          },
      ];
    const DATA3 = [
        {
          id: '1',
          title: 'Laptop',
        },
        {
          id: '2',
          title: 'Headphone',
        },
        {
          id: '3',
          title: 'Keyboard',
        },
        {
            id: '4',
            title: 'Mouse',
          },
          {
            id: '5',
            title: 'GamePad',
          },
      ];
    const DATA4 = [
        {
          id: '1',
          title: 'New',
        },
        {
          id: '2',
          title: 'Best Seller',
        },
        {
          id: '3',
          title: 'Sale Off',
        },
      ];
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const [value, setValue] = useState(1);
    const categories = ['Related', 'Newest', 'Best Seller', 'Price'];
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

    const renderItem = () => {
        //return <Product />;
    };

    const CategoryList = () => {
        return (
          <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setCategoryIndex(index)}>
                <Text
                  style={[
                    styles.categoryText,
                    catergoryIndex === index && styles.categoryTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <Icon name='sort' color={color.white} size={25} marginTop={-3}/>
          </View>
        );
      };
    return(
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
                <Svg height={40} width={40}  >
                <Image 
                    href={require('../image/logo.png')} 
                    height={40} 
                    width={40}
                    preserveAspectRatio="xMidYMid slice"/>
                </Svg>
            </View> 
            <View style={styles.searchtext}>
            <TextInput 
                style={styles.searchhinttext}
                placeholder="Search products..."
                placeholderTextColor={color.white}/>   
                <View style={StyleSheet.absoluteFill} marginLeft={235} marginTop={12}>
                    <Svg height={28} width={28}  >
                    <Image 
                        href={require('../image/icon_search.png')} 
                        height={28} 
                        width={28}
                        preserveAspectRatio="xMidYMid slice"/>
                    </Svg>
                </View>        
            </View>
            <Icon name='menu' size={35} color={color.white} marginTop={-40} marginLeft={362} onPress={handleSlideIn}></Icon>
            
            <CategoryList/>
            <FlatList marginTop={15} marginBottom={65}
                marginLeft={22}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={DATA}
                nestedScrollEnabled={true}
                renderItem={renderItem}>
            </FlatList>
            {isVisible && (
              <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
                <View flexDirection='row'>
                  <TouchableOpacity onPress={handleSlideOut}>
                    <Icon name='window-close' size={30} color={'black'}/>
                  </TouchableOpacity>
                  <Text style={styles.text}>Search Filter</Text>
                </View>
                <View paddingHorizontal={0}>
                    <View style={styles.line} />
                </View>
              <Text style={styles.component}>Brands</Text>
                <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={DATA2}
                    renderItem={({ item }) => (
                      <View style={styles.view_buttom}>
                          <Text style={styles.view_text_buttom}>{item.title}</Text>
                      </View>
                    )}>
                  </FlatList>
                </View>
              <Text style={styles.component} marginTop={10}>Products</Text>
              <View>
              <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={DATA3}
                    renderItem={({ item }) => (
                      <View style={styles.view_buttom}>
                          <Text style={styles.view_text_buttom}>{item.title}</Text>
                      </View>
                    )}>
                  </FlatList>
              </View>
              <Text style={styles.component} marginTop={10}>State</Text>
              <View>
              <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={DATA4}
                    renderItem={({ item }) => (
                      <View style={styles.view_buttom}>
                          <Text style={styles.view_text_buttom}>{item.title}</Text>
                      </View>
                    )}>
                  </FlatList>
              </View>
              <Text style={styles.component} marginTop={10}>Evaluate</Text>
              <View style={styles.star}>
                                <Icon2 name="star" size={30} color={color.yellow_2} />
                                <Icon2 name="star" size={30} color={color.yellow_2} marginLeft={15}/>
                                <Icon2 name="star" size={30} color={color.yellow_2} marginLeft={15}/>
                                <Icon2 name="star" size={30} color={color.yellow_2} marginLeft={15}/>
                                <Icon2 name="star-o" size={30} color={color.yellow_2} marginLeft={15}/>                      
                            </View>
              <Text style={styles.component} marginTop={10}>Price</Text>
              <View flexDirection='row' marginTop={10}>
                <Text style={styles.min} marginLeft={15} >$100</Text>
                <Text style={styles.min}marginHorizontal={65} >To</Text>
                <Text style={styles.min}>$10000</Text>
              </View>
              <Slider
                value={value}
                minimumValue={100}ơ
                maximumValue={10000}
                step={100}
                style={{height: 40}}
                onValueChange={(value) => setValue(value)}
                thumbTintColor={color.red}
                minimumTrackTintColor={color.red}
                maximumTrackTintColor={color.grey_text}
              />
              <Text style={styles.now}>${value.toFixed(0)}</Text>
              <View flexDirection='row' marginTop={20}>
                <View style={styles.buttom_reset}>
                  <Text style={styles.buttom_reset_text}>Reset</Text>
                </View>
                <View style={styles.buttom_reset} backgroundColor={color.red} marginLeft={15}>
                  <Text style={styles.buttom_reset_text2}>Apply</Text>
                </View>
              </View>
              </Animated.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
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
      star: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 45,
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
      slideContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
      },
      text: {
        textAlign: 'center',
        fontFamily: 'Inter_Medium',
        fontSize: 20,
        marginLeft: 70,
      },
      line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    component: {
      fontFamily: 'Inter_Medium',
      fontSize: 18,
    },
    view_buttom: {
      height: 31,
      width: 93,
      borderRadius: 5,
      borderColor: color.grey_A0,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',

      marginRight: 5,
      marginTop: 10,
    },
    view_text_buttom: {
      fontFamily: 'Inter_Medium',
      fontSize: 14,
      color: color.grey_A0,
    },
    min: {
      fontFamily: 'Inter_Medium',
      fontSize: 18,
      color: color.grey_A0,
    },
    now: {
      fontFamily: 'Inter_Medium',
      fontSize: 18,
      color: color.red,
      marginLeft: 110,
    },
    buttom_reset: {
      height: 46,
      width: 135,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: color.red,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttom_reset_text: {
      fontFamily: 'Inter_SemiBold',
      fontSize: 18,
      color: color.red,
    },
    buttom_reset_text2: {
      fontFamily: 'Inter_SemiBold',
      fontSize: 18,
      color: color.white,
    },
})

