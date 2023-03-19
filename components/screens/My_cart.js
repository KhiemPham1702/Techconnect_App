import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import Svg, { Image } from "react-native-svg";
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Product_cart from '../task/product_cart';
import Product from '../task/product';

export default function My_cart() {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
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
    const renderItem = () => {
        return <Product_cart/>;
      };
      const renderItem2 = () => {
        return <Product/>;
      };
  return (
    <View style={styles.container}>
        <View style={StyleSheet.absoluteFill} marginLeft={15} marginTop={30}>
                <Svg height={40} width={40}>
                <Image 
                    href={require('../image/logo.png')} 
                    height={40} 
                    width={40}
                    preserveAspectRatio="xMidYMid slice"/>
            </Svg>
        </View>
        <Icon name='trash-o' size={35} color={color.white} marginLeft={352} marginTop={35}/>
        <Text style={styles.title} marginLeft={162} marginTop={-35}>My Cart</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View flexDirection='row' marginLeft={20} marginTop={20}>
                <Checkbox
                    style={styles.checkbox}
                    marginTop={10}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? color.red : undefined}
                />
                <Text style={styles.list} marginLeft={5} marginTop={10}>Select All</Text>
                <View marginLeft={60}>
                    <Text style={styles.total}>Total Prices</Text>
                    <Text style={styles.price}>$1000</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
                    <View style={styles.button2}>
                        <Text style={styles.buttonText2}>Buy now (0)</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View paddingHorizontal={15}>
                <View style={styles.line} />
            </View>
            <FlatList
                marginTop={22}
                marginLeft={22}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                nestedScrollEnabled={true}
                data={DATA}
                renderItem={renderItem}>
            </FlatList>
            <View paddingHorizontal={15}>
                <View style={styles.line} />
            </View>
            <Text style={styles.list} marginLeft={15}>Suggestions for you</Text>
            <FlatList
                marginTop={15}
                marginLeft={22}
                marginBottom={65}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                numColumns={2}
                data={DATA}
                renderItem={renderItem2}>
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
    title: {
        fontSize: 26,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    list: {
        fontSize: 18,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.grey_BE,
        borderWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    checkbox: {
        height: 25,
        width: 25,
        borderColor: color.white,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 10,
    },
    total: {
        fontSize: 14,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    price: {
        fontSize: 18,
        color: color.red,
        fontFamily: 'Inter_Medium',
        textAlign: 'right',
    },
    button2: {
        backgroundColor: color.red,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
        marginHorizontal: 15,
      },
      buttonText2: {
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
      },
})
