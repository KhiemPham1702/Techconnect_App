import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import { db, ref, set, child, get, onValue } from '../DAL/Database'

import { getStorage, uploadBytes, ref as ref_storage, getMetadata, getDownloadURL } from "firebase/storage"

import { User, reload } from '../screens/Login'
import { AddressObj, LoadAddress } from '../screens/Profile';


import { launchImageLibrary } from 'react-native-image-picker';
// import { check, PERMISSIONS, request } from 'react-native-permissions';
// import ImagePicker from 'react-native-image-crop-picker';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { refFromURL } from 'firebase/database';


export default function Edit_profile({route}) {
    const [first_Name, setfirst_Name] = useState(User.first_Name)
    const [last_Name, setlast_Name] = useState(User.last_Name)
    const [selectedImage, setSelectedImage] = useState(() => {
        if(route.params.avatar)
            return route.params.avatar
    })
    //const [Email, setEmail] = useState(User.email)
    const [Phone, setPhone] = useState(User.phone)
    const [Address, setAddress] = useState(() => {
        if (AddressObj != undefined)
            return AddressObj.address
        return ""
    })

    // useEffect(() => {
    //     starCountRef = ref(db, "Address/");  
    //     onValue(
    //         starCountRef,
    //         (snapshot) => {
    //             setAddressObj([])
    //             setAddress("");
    //             snapshot.forEach((childSnapshot) => { 
    //                 let da = childSnapshot.toJSON();
    //                 //da = childSnapshot.toJSON();
    //                 const a = childSnapshot.val().address
    //                 if (da && da.user_ID == User.ID) { 
    //                     setAddressObj((pre) => [...pre, da]) 
    //                     setAddress((pre) => [...pre, da.address]) 
    //                     console.log(Address); 
    //                 } 
    //             })
    //         },
    //         {
    //             onlyOnce: true,
    //         }
    //     )
    // }, []);

    function ChangeInformation() {
        //console.log(User.Information)

        set(ref(db, 'App_user/' + User.ID), {
            ID: User.ID,
            avatar: User.avatar,
            email: User.email,
            enabled: User.enabled,
            first_Name: first_Name,
            last_Name: last_Name,
            password: User.password,
            phone: Phone,
            reset_password_token: User.reset_password_token,
        }).catch((error) => {
            console.error(error);
        });

        User.first_Name = first_Name;
        User.last_Name = last_Name;
        User.phone = Phone;

        const id = AddressObj != null ? AddressObj.id : User.ID;
        set(ref(db, 'Address/' + id), {
            id: id,
            user_ID: User.ID,
            address: Address,
        }).catch((error) => {
            console.error(error);
        });

        console.log(User);
        navigation.navigate('Tab_navigation')
    }

    function ChangeAvatar(fileName) {
        set(ref(db, 'App_user/' + User.ID), {
            ID: User.ID,
            avatar: fileName,
            email: User.email,
            enabled: User.enabled,
            first_Name: first_Name,
            last_Name: last_Name,
            password: User.password,
            phone: Phone,
            reset_password_token: User.reset_password_token,
        }).catch((error) => {
            console.error(error);
        });
    }

    const navigation = useNavigation();
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

    // const ImagePicker_Check = () => {
    //     check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    //     .then((result) => {
    //         if (result === 'granted') {
    //             pickImage();
    //         } else {
    //         // Quyền chưa được cấp, bạn cần yêu cầu quyền truy cập
    //         request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((permissionResult) => {
    //             if (permissionResult === 'granted') {
    //                 pickImage();
    //             } else {
    //                 alert('Can not access to upload pictures!!!');
    //             }
    //         });
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    // const pickImage = () => {
    //     const options = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 200,
    //         maxWidth: 200,
    //       };

    //     launchImageLibrary(options, (response) => {
    //     if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //         setSelectedImage(response.uri);
    //     }
    //     });

    //     // launchImageLibrary(options, response => {
    //     //     console.log(response);
    //     //     if (response.uri) {
    //     //       setSelectedImage(response.uri);
    //     //     }
    //     //   });

    //     // ImagePicker.openPicker({
    //     //     width: 300,
    //     //     height: 400,
    //     //     cropping: true
    //     //   }).then(image => {
    //     //     console.log(image);
    //     //   }).catch(error => {
    //     //     console.log(error);
    //     //   });
    //     // alert('hello');
    // };

    const requestMediaLibraryPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
            alert('Quyền truy cập vào thư viện ảnh không được cấp!');
        }
    };

    const requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Quyền truy cập vào camera không được cấp!');
        }
    };

    //   const pickImageFromLibrary = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    //     if (status === 'granted') {
    //       const result = await ImagePicker.launchImageLibraryAsync();
    //       if (!result.cancelled) {
    //         // Xử lý ảnh được chọn ở đây
    //       }
    //     } else {
    //       alert('Quyền truy cập vào thư viện ảnh không được cấp!');
    //     }
    //   };

    const pickImageFromLibrary = async () => {
        // await requestMediaLibraryPermission(); // Yêu cầu quyền truy cập vào thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setSelectedImage(result.assets);
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
            const storageRef = ref_storage(storage, 'images/' + fileName);

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
                    setSelectedImage(url)
                    ChangeAvatar(url)
                    User.avatar = url
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error)
                });

        } catch(e) {
            console.log(e)
        }

        
        

    };


    return (
        <View style={styles.container}>
            <Icon2 name='arrow-left' size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.navigate('Tab_navigation')} />{/*navigation.goBack()}/>*/}
            <Text style={styles.title} marginLeft={142} marginTop={-35}>Edit Profile</Text>
            <View padding={30}>
                <View style={styles.view_ava}>
                    <View style={styles.avatar_view}>
                        {selectedImage && <Image
                            style={styles.image}
                            //source={selectedImage}
                            source={{ uri: selectedImage }}
                        />}
                    </View>
                    <TouchableOpacity onPress={pickImageFromLibrary}>
                        <View style={styles.avatar_view2}>
                            <Image
                                style={styles.image2}
                                source={require('../image/camera.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View marginTop={20}>
                    <Text style={styles.address} marginTop={15}>Public Information</Text>
                    <TextInput
                        style={styles.usernametext}
                        placeholder="First Name"
                        value={first_Name}
                        onChangeText={setfirst_Name}
                        placeholderTextColor={color.white} />
                    <TextInput
                        style={styles.usernametext}
                        placeholder="Last Name"
                        value={last_Name}
                        onChangeText={setlast_Name}
                        placeholderTextColor={color.white} />
                    <TextInput
                        style={styles.usernametext}
                        placeholder="Phone"
                        value={Phone}
                        onChangeText={setPhone}
                        placeholderTextColor={color.white} />
                    <TextInput
                        style={styles.usernametext}
                        placeholder="Address"
                        value={Address}
                        onChangeText={setAddress}
                        placeholderTextColor={color.white} />
                </View>
                <TouchableOpacity onPress={ChangeInformation}>
                    <View style={styles.button2} >
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