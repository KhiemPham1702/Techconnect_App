import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

export default function Login() {
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
        placeholderTextColor={color.white}/>
      <View style={styles.passtext}>
        <TextInput 
            style={styles.passhinttext}
            placeholder="Password"
            placeholderTextColor={color.white}/>   
            <View style={StyleSheet.absoluteFill} marginLeft={280} marginTop={12}>
                <Svg height={40} width={40}  >
                <Image 
                    href={require('../image/clarity_eye-show-line.png')} 
                    height={40} 
                    width={40}
                    preserveAspectRatio="xMidYMid slice"/>
            </Svg>
        </View> 
      </View>
      <Text style={styles.textForgot}>Forgot Password?</Text>
      <View style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
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
        <Svg height={35} width={35}  >
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
        <Text style={styles.SignUpChange}>SignUp</Text>
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
