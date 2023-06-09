import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import color from '../../contains/color';
import Product_bought from '../task/product_bought';

import { db, ref, set, child, get, onValue, auth } from '../DAL/Database'
import { User } from '../screens/Login'
import { getStorage, uploadBytes, ref as ref_storage, getMetadata, getDownloadURL } from "firebase/storage"

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function Rate({ route }) { // route.params.
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter_Light: require('../../assets/fonts/Inter-Light.ttf'),
    });

    const [RateStar, setStarRating] = useState(4)
    const [UserComment, setUserComment] = useState("")
    const [thumbnail, setThumbnail] = useState("")

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
        console.log(route.params.data)
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };

    function CreateComment(productID) {

        set(ref(db, 'User_comment/' + (User.ID + productID)), {
            ID: (User.ID + productID),
            Detail: UserComment,
            Product_ID: productID,
            Rate: RateStar,
            User_ID: User.ID,
            thumbnail: thumbnail
        }).catch((error) => {
            console.error(error);
        });
    }

    function RateProduct() {
        if (route.params.data.length > 0) {
            route.params.data.forEach((data) => {
                CreateComment(data.ID)
            })
        }

        navigation.navigate("Tab_navigation")
    }

    const pickImageFromLibrary = async () => {
        // await requestMediaLibraryPermission(); // Yêu cầu quyền truy cập vào thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            //setSelectedImage(result.assets);
            uploadImage(result.assets)
        }
    };

    const uploadImage = async (assets) => {

        const uploadUri = assets[0]['uri'];
        //console.log(uploadUri)

        const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        //console.log(fileName)
        try {
            // Upload File
            const storage = getStorage();
            const storageRef = ref_storage(storage, 'comments/' + fileName);

            //convert image to array of bytes
            const img = await fetch(assets[0]['uri']);
            const bytes = await img.blob();

            //console.log(assets)
            await uploadBytes(storageRef, bytes); //upload images


            // Get Source of File
            getMetadata(storageRef)
                .then(async (metadata) => {
                    // Metadata now contains the metadata for 'images/forest.jpg'
                    //console.log(metadata)
                    const imagePath = metadata.fullPath; // images/image-3920.jpeg
                    const url = await getDownloadURL(ref_storage(storage, imagePath))
                    //console.log(url)
                    setThumbnail(url)
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error)
                });

        } catch (e) {
            console.log(e)
        }




    };

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
                <Svg height={40} width={40}  >
                    <Image
                        onPress={() => navigation.navigate("Tab_navigation")}
                        href={require('../image/icon_back_white.png')}
                        height={40}
                        width={40}
                        preserveAspectRatio="xMidYMid slice" />
                </Svg>
            </View>
            <Text style={styles.title} marginLeft={132} marginTop={80}>Rate Product</Text>
            <Text style={styles.title2} marginLeft={37} marginTop={20}>Your rating will be displayed in the product's reviews</Text>
            <View style={styles.star} marginTop={30} marginLeft={70}>
                <Icon name={RateStar >= 1 ? 'star' : 'star-o'}
                    onPress={() => setStarRating(1)}
                    size={45} color={color.yellow_2} />
                <Icon name={RateStar >= 2 ? 'star' : 'star-o'}
                    onPress={() => setStarRating(2)}
                    size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name={RateStar >= 3 ? 'star' : 'star-o'}
                    onPress={() => setStarRating(3)}
                    size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name={RateStar >= 4 ? 'star' : 'star-o'}
                    onPress={() => setStarRating(4)}
                    size={45} color={color.yellow_2} marginLeft={15} />
                <Icon name={RateStar >= 5 ? 'star' : 'star-o'}
                    onPress={() => setStarRating(5)}
                    size={45} color={color.yellow_2} marginLeft={15} />
            </View>
            <View style={styles.camera}>
                <View style={StyleSheet.absoluteFill} marginLeft={30} marginTop={18}>
                    <Svg height={35} width={40} onPress={pickImageFromLibrary} >
                        <Image
                            //onPress={() => pickImageFromLibrary}
                            href={require('../image/ion_camera-sharp.png')}
                            height={40}
                            width={40}
                            preserveAspectRatio="xMidYMid slice" />
                    </Svg>
                </View>
            </View>
            <TextInput
                multiline={true}
                style={styles.usernametext}
                placeholder="Please share what you like about this product"
                placeholderTextColor={color.white}
                onChangeText={newText => setUserComment(newText)}
                defaultValue={UserComment}
            />
            <View style={styles.button2}>
                <Text style={styles.buttonText2} onPress={RateProduct}>Send</Text>
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
    title2: {
        width: 350,
        fontSize: 15,
        color: color.white,
        textAlign: 'center',
        fontFamily: 'Inter_SemiBold',
    },
    star: {
        flexDirection: 'row',
    },
    camera: {
        height: 80,
        width: 105,
        marginTop: 20,
        marginLeft: 150,
        borderColor: color.white,
        borderRadius: 10,
        borderWidth: 2,
    },
    usernametext: {
        height: 218,
        width: 345,
        borderRadius: 12,
        marginTop: 30,
        marginLeft: 35,

        textAlignVertical: 'top',  // Để hoder xuống dòng
        paddingLeft: 15,  // Để hoder cách lề trái
        paddingTop: 15,

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
    button2: {
        backgroundColor: color.red,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 50,
        marginHorizontal: 50,
    },
    buttonText2: {
        fontStyle: 'normal',
        fontSize: 25,
        color: 'white',
        letterSpacing: 1,
        fontFamily: 'Inter_SemiBold',
    },
})

