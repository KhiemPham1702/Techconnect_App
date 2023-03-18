import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Discount_ticket from '../task/discount_ticket';

export default function My_discount() {
    const navigation = useNavigation();
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
      ];
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
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };

    const renderItem2 = () => {
        return <Discount_ticket />;
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
          </View>
        );
      };
    return(
        <View style={styles.container}>
            <Icon2 name='arrow-left'size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.goBack()}/>
            <Text style={styles.title} marginLeft={112} marginTop={-35}>Discount Coupons</Text>
            <CategoryList/>
            <FlatList 
                marginLeft={22}
                showsVerticalScrollIndicator={false}
                data={DATA}
                renderItem={renderItem2}>
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