import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';

import Product_pay from '../task/product_pay';

export default function Payment() {
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
        return <Product_pay/>;
      };
  return (
    <View style={styles.container}>
        <Icon2 name='arrow-left'size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.goBack()}/>
        <Text style={styles.title} marginLeft={162} marginTop={-35}>Payment</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View flexDirection='row' marginLeft={30} marginTop={20}>
                <Icon3 name='location' size={40} color={color.white}/>
                <View marginLeft={10} width={270}>
                    <Text style={styles.address}>Delivery address</Text>
                    <View flexDirection='row'>
                        <Text style={styles.user}>Nguyen Van A</Text>
                        <Text style={styles.user} marginHorizontal={5}>|</Text>
                        <Text style={styles.user}>0123456789</Text>                        
                    </View>
                    <Text style={styles.user} marginTop={2}>Street A, District 7, Ho Chi Minh City</Text>                   
                </View>
                <Icon3 name='chevron-right' size={40} color={color.white} marginTop={20} marginLeft={15} onPress={() => navigation.navigate('New_address')}/>
            </View>
            <View paddingHorizontal={15}>
                        <View style={styles.line} />
                    </View>
            <FlatList
                marginTop={22}
                marginLeft={22}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={DATA}
                renderItem={renderItem}>
            </FlatList>
            <View style={styles.pay_choose}>
                <View flexDirection='row'>
                    <Icon4 name='ticket-percent-outline' size={30} color={color.white}/>
                    <Text style={styles.section} marginTop={5}>Discount</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('My_discount')}>
                        <View flexDirection='row'>
                            <Text style={styles.dis_check}>Choose discount</Text>
                            <Icon3 name='chevron-right' size={25} color={color.white} marginTop={7} marginLeft={5}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View flexDirection='row' marginTop={10}>
                    <Icon name='dollar' size={25} color={color.white} marginLeft={8}></Icon>
                    <Text style={styles.section}>Payment method</Text>
                </View>
                <View marginTop={10} marginLeft={35}>
                    <View flexDirection='row'>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? color.red : undefined}/>
                        <View style={styles.avatar_view} marginTop={-5}>
                            <Image
                                style={styles.image}
                                source={require('../image/ship.png')}
                            />               
                        </View>
                        <Text style={styles.section}>Cash on delivery</Text>
                    </View>
                    <View flexDirection='row' marginTop={10}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? color.red : undefined}/>
                        <View style={styles.avatar_view} marginTop={-5}>
                            <Image
                                style={styles.image}
                                source={require('../image/momo.png')}
                            />               
                        </View>
                        <Text style={styles.section}>Pay by Momo</Text>
                    </View>
                    <View flexDirection='row' marginTop={10}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? color.red : undefined}/>
                        <View style={styles.avatar_view} marginTop={-5}>
                            <Image
                                style={styles.image}
                                source={require('../image/card.png')}
                            />               
                        </View>
                        <Text style={styles.section}>Pay by credit card</Text>
                    </View>
                </View>
            </View>
            <View style={styles.pay_choose} marginTop={21}>
                <View flexDirection='row'>
                    <View style={styles.avatar_view} >
                        <Image
                            style={styles.image}
                            source={require('../image/invoice.png')}
                            />               
                    </View>
                    <Text style={styles.section} marginTop={5}>Payment details</Text>
                </View>
                <View flexDirection='row'>
                    <View>
                        <Text style={styles.section} marginLeft={0} marginTop={10}>Shipping fee</Text>
                        <Text style={styles.section} marginLeft={0} marginTop={10}>Goods price</Text>
                        <Text style={styles.list} marginLeft={0} marginTop={10}>Total (Included VAT)</Text>
                    </View>
                    <View marginLeft={100}> 
                        <Text style={styles.section} marginLeft={0} marginTop={10} textAlign='right'>$10</Text>
                        <Text style={styles.section} marginLeft={0} marginTop={10} textAlign='right'>$500</Text>
                        <Text style={styles.section2} marginLeft={0} marginTop={10} textAlign='right'>$510</Text>
                    </View>
                </View>
            </View>
            <View flexDirection='row' marginLeft={18}  marginVertical={21}>
            <View style={styles.avatar_view} >
                <Image
                    style={styles.image}
                    source={require('../image/note.png')}
                    />               
                </View>
                <View marginLeft={10}>
                    <Text style={styles.note}>Clicking order means that you agree to </Text>
                    <Text style={styles.note2}>Techconnect's regulations</Text>
                </View>
            </View>
        </ScrollView>
        <View style={styles.bottom_view}>
            <View marginLeft={200}>
                    <Text style={styles.total} marginTop={10}>Total Prices</Text>
                    <Text style={styles.price}>$1000</Text>
                </View>
                <TouchableOpacity >
                    <View style={styles.button2}>
                        <Text style={styles.buttonText2}>Oder</Text>
                    </View>
                </TouchableOpacity>
        </View>
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
    address: {
        fontSize: 20,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    user: {
        fontSize: 15,
        color: color.white,
        fontFamily: 'Inter_Light',
    },
    pay_choose: {
        width: 380,
        height: 'auto',
        marginLeft: 19,
        backgroundColor: color.grey_text,
        borderRadius: 10,
        padding: 13
    },
    section: {
        fontSize: 15,
        color: color.white,
        fontFamily: 'Inter_Medium',
        marginLeft: 10,
    },
    dis_check: {
        fontSize: 12,
        color: color.white,
        fontFamily: 'Inter_Light',
        marginTop: 7,
        marginLeft: 133,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderColor: color.white,
        borderRadius: 50,
        borderWidth: 2,
        marginRight: 15,
    },
    avatar_view: {
        width: 30,
        height: 30,
        overflow: 'hidden',       
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    section2: {
        fontSize: 20,
        color: color.red,
        fontFamily: 'Inter_Medium',
        marginLeft: 10,
    },
    note: {
        fontSize: 16,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    note2: {
        fontSize: 16,
        color: color.red,
        fontFamily: 'Inter_Medium',
    },
    bottom_view: {
        backgroundColor: color.white,
        height: 70,
        flexDirection: 'row',
    },
    total: {
        fontSize: 14,
        color: color.grey_text,
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
        marginTop: 15,
        marginHorizontal: 15,
      },
      buttonText2: {
        fontStyle: 'normal',
        fontSize: 16,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
      },
})
