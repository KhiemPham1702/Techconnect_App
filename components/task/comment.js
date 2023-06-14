import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';

import { db, ref, set, child, get, onValue, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../DAL/Database'


import color from '../../contains/color';

const comment = (props) => {
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
    });

    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")

    function LoadUser() {
        starCountRef = ref(db, "App_user/" + props.review.User_ID);
        onValue(
            starCountRef,
            (snapshot) => {
                let data = snapshot.val();
                if(data) {
                    let useravatar = data.avatar == "" ? 'https://firebasestorage.googleapis.com/v0/b/mobile-550f2.appspot.com/o/images%2Favatar.jpg?alt=media&token=b63eb061-4747-4f25-814a-9f1650d0f333&_gl=1*kx0bq8*_ga*NzQ0MjMxOTg3LjE2NzcxNDQyMTU.*_ga_CW55HF8NVT*MTY4NTY4ODMwNi43My4xLjE2ODU2ODkxMzIuMC4wLjA.' : data.avatar;

                    setAvatar((pre) => [...pre, useravatar]);
                    setName((pre) => [...pre, data.first_Name + ' ' + data.last_Name]);
                }
                
                    
                console.log(data)

            },
            {
                onlyOnce: true,
            })
    }

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();

        LoadUser()

        //console.log(props.review)
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };
    return (
        <View style={styles.comment}>
            <View style={styles.avatar_view}>
                <Image
                    style={styles.image}
                    //source={{ uri: avatar }}
                    source={{ uri: avatar.toString() }}
                />
            </View>
            <View >
                <Text style={styles.user_name}>{name}</Text>
                <View style={styles.star} marginVertical={5}>
                    <Icon name={props.review.Rate >= 1 ? 'star' : 'star-o'} size={15} color={color.yellow_2} />
                    <Icon name={props.review.Rate >= 2 ? 'star' : 'star-o'} size={15} color={color.yellow_2} marginLeft={5} />
                    <Icon name={props.review.Rate >= 3 ? 'star' : 'star-o'} size={15} color={color.yellow_2} marginLeft={5} />
                    <Icon name={props.review.Rate >= 4 ? 'star' : 'star-o'} size={15} color={color.yellow_2} marginLeft={5} />
                    <Icon name={props.review.Rate >= 5 ? 'star' : 'star-o'} size={15} color={color.yellow_2} marginLeft={5} />
                </View>
                <Text style={styles.user_name}>{props.review.Detail}</Text>
                {props.review.thumbnail != "" && <View style={styles.image_review}>
                    <Image
                        style={styles.image2}
                        source={{ uri: props.review.thumbnail }}
                    />
                </View>}
            </View>
        </View>
    )
}

export default comment;

const styles = StyleSheet.create({
    comment: {
        marginVertical: 10,
        marginRight: 5,
        padding: 10,
        borderRadius: 10,
        borderColor: color.white,
        borderWidth: 1,
        backgroundColor: color.grey_A0,
        height: 'auto',
        width: 368,
        flexDirection: 'row'
    },
    avatar_view: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    user_name: {
        fontFamily: 'Inter_Medium',
        fontSize: 14,
        color: color.white,
    },
    star: {
        flexDirection: 'row',
    },
    image_review: {
        width: 107,
        height: 75,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: color.white,
        borderWidth: 2,
    },
    image2: {
        width: '100%',
        height: '100%',
    },
})