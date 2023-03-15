import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product_cart from '../task/product_cart';
import Product from '../task/product';

export default function My_cart() {
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
        <Icon2 name='arrow-left'size={35} color={color.white} marginLeft={15} marginTop={30}/>
        <Icon name='trash-o' size={35} color={color.white} marginLeft={352} marginTop={-36}/>
        <Text style={styles.title} marginLeft={162} marginTop={-35}>My Cart</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View flexDirection='row' marginLeft={30} marginTop={20}>
                <Icon2 name='box' size={30} color={color.white} />
                <Text style={styles.list} marginLeft={10}>Item list</Text>
            </View>
            <FlatList
                marginTop={22}
                marginLeft={22}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={DATA}
                renderItem={renderItem}>
            </FlatList>
            <View paddingHorizontal={15}>
                <View style={styles.line} />
            </View>
            <Text style={styles.list} marginLeft={15}>Suggestions for you</Text>
            <FlatList
                marginTop={22}
                marginLeft={22}
                showsVerticalScrollIndicator={false}
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
        fontSize: 20,
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
})
