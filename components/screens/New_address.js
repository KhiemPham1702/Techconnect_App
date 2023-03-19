import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Switch} from 'react-native';
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

export default function New_address() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

  return (
    <View style={styles.container}>
        <Icon2 name='arrow-left'size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.goBack()}/>
        <Text style={styles.title} marginLeft={132} marginTop={-35}>New_address</Text>
        <View style={styles.contact}>
            <Text style={styles.address}>Contact</Text>
            <TextInput 
                style={styles.usernametext}
                placeholder="Email"
                placeholderTextColor={color.white}/>
            <TextInput 
                style={styles.usernametext}
                keyboardType='numeric'
                placeholder="Phone number"
                placeholderTextColor={color.white}/>
            <Text style={styles.address} marginTop={15}>Address</Text>
            <TextInput 
                style={styles.usernametext}
                placeholder="Address"
                placeholderTextColor={color.white}/>
            <TextInput 
                style={styles.usernametext}
                placeholder="Street Name, House Number"
                placeholderTextColor={color.white}/>
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
                        trackColor={{false: '#767577', true: color.red}}
                        thumbColor={isEnabled ? color.white : color.white }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        marginLeft={120}
                        marginTop={10}
                        />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
