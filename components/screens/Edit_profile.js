import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';

import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

export default function Edit_profile() {
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
        <Icon2 name='arrow-left'size={35} color={color.white} marginLeft={15} marginTop={30}/>
        <Text style={styles.title} marginLeft={142} marginTop={-35}>Edit Profile</Text>
        <View padding={30}>
            <View style={styles.view_ava}>
                <View style={styles.avatar_view}>
                    <Image
                        style={styles.image}
                        source={require('../image/girl.jpg')}
                    />               
                </View>
                <View style={styles.avatar_view2}>
                    <Image
                        style={styles.image2}
                        source={require('../image/camera.png')}
                    />               
                </View>
            </View>
            <View marginTop={20}>
                <Text style={styles.address} marginTop={15}>Public Information</Text>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="First Name"
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Last Name"
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Email"
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Phone"
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Address"
                    placeholderTextColor={color.white}/>
            </View>
            <View style={styles.button2}>
                <Text style={styles.buttonText2}>Complete</Text>
            </View>
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
      button2: {
        backgroundColor: color.red,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 50,
      },
      buttonText2: {
        fontStyle: 'normal',
        fontSize: 28,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
      },
      view_ava: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar_view: {
        width: 100,
        height: 100,
        
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    avatar_view2: {
        width: 25,
        height: 25,
        marginTop: -25,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image2: {
        width: '100%',
        height: '100%',
    },
    address: {
        fontSize: 20,
        color: color.white,
        fontFamily: 'Inter_Medium',
    },
    usernametext: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 25,
    
        fontStyle: 'normal',
        fontSize: 20,
        color: color.white,
        borderColor: color.white,
        borderRadius: 12,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 22,
        fontFamily: 'Inter_Medium',
      },
})
