import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';
import { db, ref, set, child, get, onValue } from '../DAL/Database'
import { User, reload } from '../screens/Login'


export default function Edit_profile() {
    const [first_Name, setfirst_Name] = useState(User.first_Name)
    const [last_Name, setlast_Name] = useState(User.last_Name)
    //const [Email, setEmail] = useState(User.email)
    const [Phone, setPhone] = useState(User.phone)
    const [AddressObj, setAddressObj] = useState([])
    const [Address, setAddress] = useState(() => {
        starCountRef = ref(db, "Address/");
        let a;
        onValue(
            starCountRef,
            (snapshot) => {
                setAddressObj([])
                snapshot.forEach((childSnapshot) => {
                    let da = childSnapshot.val();
                    a = childSnapshot.val().address
                    if (da && da['user_ID'] == User.ID) {
                        setAddressObj((pre) => [...pre, da])
                        console.log(a);
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )

        return a;
    })

    useEffect(() => {
        starCountRef = ref(db, "Address/");  
        onValue(
            starCountRef,
            (snapshot) => {
                setAddressObj([])
                snapshot.forEach((childSnapshot) => { 
                    let da = childSnapshot.val();
                    const a = childSnapshot.val().address
                    if (da && da['user_ID'] == User.ID) { 
                        setAddressObj((pre) => [...pre, da]) 

                        //setAddress((pre) => [...pre, a]) 
                        //console.log(a);
                    } 
                })
            },
            {
                onlyOnce: true,
            }
        )
    }, []);

    function ChangeInformation(){
        console.log(User.Information)
        
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

        set(ref(db, 'Address/' + AddressObj != null ? AddressObj.id : User.ID), {
            id: AddressObj != null ? AddressObj.id : User.ID,
            user_ID: User.ID, 
            address: Address,
        }).catch((error) => {
            console.error(error);
        });

        reload(User.ID)

        console.log(User);
        navigation.navigate('Profile')
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

  return (
    <View style={styles.container}>
          <Icon2 name='arrow-left' size={35} color={color.white} marginLeft={15} marginTop={30} onPress={() => navigation.navigate('Profile')}/>{/*navigation.goBack()}/>*/}
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
                    value={first_Name}
                    onChangeText={setfirst_Name}
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Last Name"
                    value={last_Name}
                    onChangeText={setlast_Name}
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Phone"
                    value={Phone}
                    onChangeText={setPhone}
                    placeholderTextColor={color.white}/>
                <TextInput 
                    style={styles.usernametext}
                    placeholder="Address"
                    value={Address}
                    onChangeText={setAddress}
                    placeholderTextColor={color.white}/>
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
