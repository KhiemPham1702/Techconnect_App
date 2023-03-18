import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, { Image } from "react-native-svg";
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect , useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

export default function SignUp() {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const [isChecked, setIsChecked] = useState(false);
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
            href={require('../image/SignUp.png')}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <View style={styles.NameView}>
            <TextInput 
                style={styles.FistName}
                placeholder="First Name"
                placeholderTextColor={color.white}/>
            <TextInput 
                style={styles.LastName}
                placeholder="Last Name"
                placeholderTextColor={color.white}/>
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
      <View style={styles.passContext} marginTop={22}>
        <TextInput 
            style={styles.passhinttext}
            placeholder="Confirm Password"
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
      <CheckBox 
        isChecked={isChecked}
        style={styles.checkbox} 
        onClick={()=>
            setIsChecked(!isChecked)}
        checkBoxColor={color.white}
          />
      <View style={styles.button}>
          <Text style={styles.buttonText}
            onPress={() => navigation.navigate('Verify')}>SIGN UP</Text>
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
        <Text style={styles.text}>You already a member?</Text>
        <Text style={styles.SignUpChange}
          onPress={() => navigation.navigate('Login')}>Login</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NameView: {
    marginTop: 186,
    marginHorizontal: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LastName:{
    height: 70,
    width: 159,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginLeft: 27,

    fontStyle: 'normal',
    fontSize: 20,
    color: color.white,
    letterSpacing: 1,
    borderColor: color.white,
    borderRadius: 12,
    borderWidth: 3,
    padding: 23,
    fontFamily: 'Inter_Medium',
  },
  FistName:{
    height: 70,
    width: 159,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,

    fontStyle: 'normal',
    fontSize: 20,
    color: color.white,
    letterSpacing: 1,
    borderColor: color.white,
    borderRadius: 12,
    borderWidth: 3,
    padding: 23,
    fontFamily: 'Inter_Medium',
  },
  button: {
    backgroundColor: color.red,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 33,
    marginTop: 29,
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
    marginTop: 22,

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
    paddingRight: 65,
    justifyContent: 'center',
    marginHorizontal: 33,
    marginTop: 22,  

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
  passContext: {
    flexDirection: 'row',
    height: 70,
    paddingLeft: 23,
    paddingRight: 65,
    justifyContent: 'center',
    marginHorizontal: 33,
    marginVertical: 22,  

    borderColor: color.white,
    borderRadius: 12,
    borderWidth: 3,
    fontWeight: '500',
    fontFamily: 'Inter_Medium',
  },
  checkbox: {
    marginLeft: 33,
    marginTop: 15,
  },
  Textbottom: {
    flexDirection: 'row',
    marginTop: 19,
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
    marginTop: 59,
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
