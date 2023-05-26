import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

import { db, ref, set, child, get, onValue, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../DAL/Database'
import { connectStorageEmulator } from 'firebase/storage';

export var User = undefined;
export var liked = [];
export var brand = []
export let Carts = []
export var CartProduct = [];



export function reload(id){
  const starCountRef = ref(db, "App_user/" + id);
  onValue(
    starCountRef,
    (snapshot) => {
      let loadUser = snapshot.val();
      User = loadUser;
      //console.log(loadUser)
    },
    {
      onlyOnce: true,
    }
  )
}

export function LoadLiked(id) {
  starCountRef = ref(db, "Liked/");
  onValue(
    starCountRef,
    (snapshot) => {
      liked = []
      snapshot.forEach((childSnapshot) => {
        let like = childSnapshot.val();
        if (like && like['user_ID'] == id) {
          liked.push(like)
        }
      })
    },
    {
      onlyOnce: true,
    }
  )
}

export default function Login() {


  const navigation = useNavigation();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Hide, setHide] = useState(true);

  const [test, setTest] = useState(Carts)

  const [product, setProduct] = useState([]);

  function HideAndShow(){
    setHide(!Hide);
  }

  function LoadCarts(ID) {
    const starCountRef = ref(db, "Cart/");
    console.log("Load carts ")
    console.log(ID)
    onValue(
      starCountRef,
      (snapshot) => {
        //Carts = []
        snapshot.forEach((childSnapshot) => {
          const cart = childSnapshot.val()
          //console.log(cart.user_ID)
          if (cart.order_ID == "" && cart.user_ID == ID) {
            setTest((pre) => [...pre, cart]);
            Carts.push(cart)

            // if(Carts.length > 1) {
            //   Carts.sort(function(a,b){return a.product_ID - b.product_ID})
            // }
          }

        });
      },
      {
        onlyOnce: true,
      }
    );
  }
 
  function LoadBrand() {
    //console.log("Load product")
    const starCountRef = ref(db, "Brand/");

    brand = []
    onValue(
      starCountRef,
      (snapshot) => {
        console.log(snapshot)
        snapshot.forEach((childSnapshot) => {
          brand.push(childSnapshot.val())
        });
      },
      {
        onlyOnce: true,
      }
    );
  }

  function CheckAccount(id){
    starCountRef = ref(db, "App_user/" + id);
    onValue(
      starCountRef,
      (snapshot) => {
        if(id == ""){
          snapshot.forEach((childSnapshot) => {
            let user = childSnapshot.val();
            if (user && user['email'] == Email && user['password'] == Password) {
              User = user;
              

              CartProduct = []
              Carts = []
              LoadCarts(user.ID)
              LoadLiked(user.ID)
              navigation.navigate('Tab_navigation')
            }
          })
        }
        else {

          let loadUser = snapshot.val();
          User = loadUser;
          CartProduct = []
          Carts = []
          LoadCarts(loadUser.ID)
          //LoadCarts(loadUser.ID)
          LoadLiked(loadUser.ID)
          navigation.navigate('Tab_navigation')
        }


      },
      {
        onlyOnce: true,
      }
    )
  }


  function CreateAccountWithEmail(){
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log("Create User")
        // Signed in 
        const user = userCredential.user;
        //console.log(user.uid)
        
        set(ref(db, 'App_user/' + user.uid), {
          ID: user.uid,
          avatar: "",
          email: Email,
          enabled: "",
          first_Name: "Nguyễn Văn",
          last_Name: "A",
          password: Password,
          phone: "",
          reset_password_token: "",
        }).then(() => {
          CheckAccount(user.uid)
          // starCountRef = ref(db, "App_user/" + user.uid);
          // onValue(
          //   starCountRef,
          //     (snapshot) => {
          //       let loadUser = snapshot.val();
          //       User = loadUser;
          //       console.log(loadUser)
          //       navigation.navigate('Tab_navigation')
              
          //   },
          //   {
          //     onlyOnce: true,
          //   }
          // )
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });


    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in 
        //console.log("Sign in")
        const user = userCredential.user;

        CheckAccount(user.uid)
        // starCountRef = ref(db, "App_user/" + user.uid);
        // onValue(
        //   starCountRef,
        //   (snapshot) => {
        //     let loadUser = snapshot.val();
        //     User = loadUser;
        //     console.log(loadUser)
        //     navigation.navigate('Tab_navigation')
        //   },
        //   {
        //     onlyOnce: true,
        //   }
        // )
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  function Login(){
    CheckAccount("");
    // starCountRef = ref(db, "App_user/");
    // onValue(
    //   starCountRef,
    //   (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       let user = childSnapshot.val();
    //       if (user && user['email'] == Email && user['password'] == Password) {
    //         User = user;
    //         navigation.navigate('Tab_navigation')
    //       }
    //     })
    //   },
    //   {
    //     onlyOnce: true,
    //   }
    // )

    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in 
        console.log("Sign in")
        const user = userCredential.user;

        CheckAccount(user.ID);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message; 
      });

    // const starCountRef = ref(db, "App_user/" + Email);
    // onValue(
    //   starCountRef,
    //   (snapshot) => {
    //     //console.log(snapshot)
    //     if(Email == "" || snapshot.size == 0)
    //       alert('Please, fill with correct Email');
    //     else{
    //       const user = snapshot.toJSON();
    //       if (Password == user.password && Email == user.username) {
    //         console.log("Login successfully")
    //         User = user;
    //         console.log(User);
    //         navigation.navigate('Tab_navigation')
    //       }
    //       else 
    //         alert("Wrong password")
    //     }
        
    //   },
    //   {
    //     onlyOnce: true,
    //   }
    // );

  }

  const { height, width } = Dimensions.get("window");
  const [fontsLoaded] = useFonts({
    Inter_SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    Inter_Medium: require('../../assets/fonts/Inter-Medium.ttf'),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();

    LoadBrand();
    navigation.addListener('focus', () => {

    });

  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  };
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width}>
          <Image
            href={require('../image/Login.png')}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <TextInput 
        style={styles.usernametext}
        placeholder="Email"
        placeholderTextColor={color.white}
        onChangeText={(email) => setEmail(email)}
        />
      <View style={styles.passtext}>
        <TextInput 
            style={styles.passhinttext}
            placeholder="Password"
            placeholderTextColor={color.white}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={Hide}
            />   
            <View style={StyleSheet.absoluteFill} marginLeft={280} marginTop={12}>
                <Svg height={40} width={40}  onPress={HideAndShow}>
                <Image 
                    href={require('../image/clarity_eye-show-line.png')} 
                    height={40} 
                    width={40}
                    preserveAspectRatio="xMidYMid slice"/>
            </Svg>
        </View> 
      </View>
      <Text style={styles.textForgot} onPress={() => alert("You can login with your email")}>Forgot Password?</Text>
      <View style={styles.button}>
          <Text style={styles.buttonText}
            onPress={() => Login()}>LOGIN</Text>
      </View>
      <View style={styles.IconConnect}>
        <View style={styles.Face}>
            <Svg height={35} width={35}  >
                    <Image 
                        href={require('../image/facebook.png')} 
                        height={35} 
                        width={35}
                        preserveAspectRatio="xMidYMid slice"/>
                </Svg>
        </View>
        <View style={styles.Mail}>
          <Svg height={35} width={35} onPress={CreateAccountWithEmail}>
                    <Image 
                        href={require('../image/email.png')} 
                        height={35} 
                        width={35}
                        preserveAspectRatio="xMidYMid slice"/>
                </Svg>
        </View>
      </View>
      <View style={styles.Textbottom}>
        <Text style={styles.text}>Not a member?</Text>
        <Text style={styles.SignUpChange} 
            onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: color.red,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 33,
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 28,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter_SemiBold',
  },
  usernametext: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 33,
    marginTop: 252,

    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '500',
    color: color.white,
    letterSpacing: 1,
    borderColor: color.white,
    borderRadius: 12,
    borderWidth: 3,
    padding: 23,
    fontFamily: 'Inter_Medium',
  },
  passtext: {
    flexDirection: 'row',
    height: 70,
    paddingLeft: 23,
    justifyContent: 'center',
    marginHorizontal: 33,
    marginVertical: 22,  

    borderColor: color.white,
    borderRadius: 12,
    borderWidth: 3,
    fontWeight: '500',
    fontFamily: 'Inter_Medium',
  },
  passhinttext: {
    flex: 1,
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '500',
    color: color.white,
    letterSpacing: 1,
    fontFamily: 'Inter_Medium',
  },
  textForgot: {
    marginLeft: 129,
    marginBottom: 125,
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontSize: 16,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter_Medium',
  },
  Textbottom: {
    flexDirection: 'row',
    marginTop: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter_Medium',
  },
  SignUpChange:{
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontSize: 16,
    color: color.red,
    letterSpacing: 1,
    textDecorationLine: 'underline',
    fontFamily: 'Inter_SemiBold',
  },
  IconConnect: {
    marginTop: 69,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  Face: {
    height: 50,
    width: 50,
    borderColor: color.white,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 37,
    justifyContent: 'center',
    alignItems:'center',
  },
  Mail: {
    height: 50,
    width: 50,
    borderColor: color.white,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems:'center',
  }
});
