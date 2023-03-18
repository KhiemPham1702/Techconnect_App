import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, { Image } from "react-native-svg";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import color from '../../contains/color';

export default function NewPass() {
  const navigation = useNavigation();
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
            href={require('../image/NewPass.png')}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <View style={StyleSheet.absoluteFill} marginLeft={14} marginTop={30}>
                <Svg height={40} width={40}  >
                <Image 
                    onPress={() => navigation.goBack()}
                    href={require('../image/icon_back_white.png')} 
                    height={40} 
                    width={40}
                    preserveAspectRatio="xMidYMid slice"/>
            </Svg>
        </View> 
        <View style={styles.passtext} marginTop={403}>
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
      <View style={styles.passtext} marginTop={30}>
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
      <View style={styles.button}>
          <Text style={styles.buttonText}
            onPress={() => navigation.navigate('Home')}>RESET PASS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passtext: {
    flexDirection: 'row',
    height: 70,
    paddingLeft: 23,
    justifyContent: 'center',
    marginHorizontal: 33,  

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
  button: {
    backgroundColor: color.red,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 33,
    marginVertical: 94,
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Inter_SemiBold',
  }
});
