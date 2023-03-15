import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

export default function Profile() {
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
        Inter_Regular: require('../../assets/fonts/Inter-Regular.ttf'),
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
        <Icon2 name='arrow-left'size={35} color={'black'} marginLeft={15} marginTop={30}/>
        <Text style={styles.title} marginLeft={142} marginTop={-35}>My Profile</Text>
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
                <Text style={styles.name_user} marginTop={10}>Nguyen Van A</Text>
                <Text style={styles.id_user}>ID: 0123456789</Text>
                <View style={styles.avatar_view3}>
                    <Image
                        style={styles.image3}
                        source={require('../image/edit.png')}
                    />               
                </View>
            </View>
        </View>
        <View style={styles.view_bot}>
            <View flexDirection='row' marginTop={25}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/tabler.png')}/>               
                </View>
                <Text style={styles.section}>History of purchases</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/discount_ic.png')}/>               
                </View>
                <Text style={styles.section}>My discount</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/heart.png')}/>               
                </View>
                <Text style={styles.section}>Liked</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={15}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/ic-star.png')}/>               
                </View>
                <Text style={styles.section}>My assessment</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View paddingHorizontal={0}>
                <View style={styles.line} />
            </View>
            <View flexDirection='row' marginTop={5}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/change.png')}/>               
                </View>
                <Text style={styles.section}>Change Password</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/info.png')}/>               
                </View>
                <Text style={styles.section}>Infomation</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/help.png')}/>               
                </View>
                <Text style={styles.section}>Help</Text>
                <Icon name='chevron-right' size={30} color={color.white} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/admin.png')}/>               
                </View>
                <Text style={styles.section3}>Admin manage</Text>
                <Icon name='chevron-right' size={30} color={color.green} marginTop={3} marginLeft={110}/>
            </View>
            <View flexDirection='row' marginTop={20}>
                <View style={styles.avatar_view4}>
                    <Image
                        style={styles.image4}
                        source={require('../image/log-out.png')}/>               
                </View>
                <Text style={styles.section2}>Log Out</Text>
                <Icon name='chevron-right' size={30} color={color.red} marginTop={3} marginLeft={110}/>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    title: {
        fontSize: 26,
        color: 'black',
        fontFamily: 'Inter_Medium',
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
        borderColor: color.grey_A0,
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
        borderColor: color.grey_A0,
        borderWidth: 2,
    },
    image2: {
        width: '100%',
        height: '100%',
    },
    avatar_view3: {
        width: 25,
        height: 25,
        marginTop: -28,
        marginLeft: 200,
        overflow: 'hidden',
    },
    image3: {
        width: '100%',
        height: '100%',
    },
    avatar_view4: {
        width: 30,
        height: 30,
        marginTop: 0,
        overflow: 'hidden',
    },
    image4: {
        width: '100%',
        height: '100%',
    },
    name_user: {
        fontSize: 26,
        color: 'black',
        fontFamily: 'Inter_Medium',
    },
    id_user: {
        fontSize: 16,
        color: color.grey_A0,
        fontFamily: 'Inter_Regular',
    },
    view_bot: {
        height: 800,
        paddingHorizontal: 18,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: color.grey_text,
    },
    section: {
        fontFamily: 'Inter_Medium',
        fontSize: 20,
        color: color.white,
        marginLeft: 10,
        marginTop: 3,
        width: 200,
    },
    section2: {
        fontFamily: 'Inter_Medium',
        fontSize: 20,
        color: color.red,
        marginLeft: 10,
        marginTop: 3,
        width: 200,
    },
    section3: {
        fontFamily: 'Inter_Medium',
        fontSize: 20,
        color: color.green,
        marginLeft: 10,
        marginTop: 3,
        width: 200,
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.grey_BE,
        borderWidth: 1,
        width: '100%',
        marginVertical: 20,
    },
})
