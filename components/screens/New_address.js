import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
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
import { db, ref, set, child, get, onValue, update } from '../DAL/Database'
import { User } from '../screens/Login'


export default function New_address({route}) {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const [Email, setEmail] = useState(User.email)
    const [Phone, setPhone] = useState(User.phone)
    const [Address, setAddress] = useState(() => {
        console.log(route.params.address)
        if (route.params.address.at(0) != undefined)
            return route.params.address.at(0).address
        else 
            return ""
    })
    const [StreetHouse, setStreetHouse] = useState("")

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

    function setNewAddress(place) {
        console.log(place)
        set(ref(db, 'Address/' + place.id), {
            id: place.id,
            user_ID: place.user_ID,
            address: place.address,
        }).catch((error) => {
            console.error(error);
        });

    }

    function Complete() {
        let place = {
            address: "",
            user_ID: "",
            id: ""
        };

        if(route.params.address.length > 0) {
            place.address = route.params.address.at(0).address;
            place.id = route.params.address.at(0).id
            place.user_ID = route.params.address.at(0).user_ID
        }
        
        if(StreetHouse != "")
            place.address = (StreetHouse + ", " + Address);
        else 
            place.address = Address;
        
        console.log(isEnabled)

        setNewAddress(place)
        if (isEnabled == true) {
            //console.log(Address)
            
        }

        route.params.updateAddress(place, Email, Phone)


        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Icon2 name='arrow-left' size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.goBack()} />
            <Text style={styles.title} marginLeft={132} marginTop={-35}>New_address</Text>
            <View style={styles.contact}>
                <Text style={styles.address}>Contact</Text>
                <TextInput
                    style={styles.usernametext}
                    placeholder="Email"
                    value={Email}
                    onChangeText={setEmail}
                    placeholderTextColor={color.white} />
                <TextInput
                    style={styles.usernametext}
                    keyboardType='numeric'
                    placeholder="Phone number"
                    value={Phone}
                    onChangeText={setPhone}
                    placeholderTextColor={color.white} />
                <Text style={styles.address} marginTop={15}>Address</Text>
                <TextInput
                    style={styles.usernametext}
                    placeholder="Address"
                    value={Address}
                    onChangeText={setAddress}
                    placeholderTextColor={color.white} />
                <TextInput
                    style={styles.usernametext}
                    placeholder="Street Name, House Number"
                    value={StreetHouse}
                    onChangeText={setStreetHouse}
                    placeholderTextColor={color.white} />
                <Text style={styles.address} marginTop={15}>Setting</Text>
                <View flexDirection='row'>
                    <View>
                        <Text style={styles.address2} marginTop={20}>Address Type</Text>
                        <Text style={styles.address2} marginTop={20}>Set as default address</Text>
                    </View>
                    <View>
                        <View flexDirection='row'>
                            <View style={styles.button} marginLeft={-10}>
                                <Text style={styles.buttonText}>Office</Text>
                            </View>
                            <View style={styles.button} marginLeft={10}>
                                <Text style={styles.buttonText} >Home</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: color.red }}
                            thumbColor={isEnabled ? color.white : color.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                            marginLeft={120}
                            marginTop={10}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => Complete()}>
                    <View style={styles.button2}>
                        <Text style={styles.buttonText2}>Complete</Text>
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
    address: {
        fontSize: 20,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    address2: {
        fontSize: 16,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    contact: {
        paddingHorizontal: 32,
        paddingVertical: 28,
    },
    usernametext: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 15,

        fontStyle: 'normal',
        fontSize: 14,
        color: color.white,
        borderColor: color.white,
        borderRadius: 12,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 22,
        fontFamily: 'Inter_Medium',
    },
    button: {
        marginTop: 10,
        borderColor: color.white,
        borderRadius: 5,
        borderWidth: 2,
        height: 30,
        width: 86,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
    button2: {
        backgroundColor: color.red,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 180,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 28,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
})
