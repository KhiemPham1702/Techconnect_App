import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Start from './components/screens/Start';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import EmailConfirm from './components/screens/EmailConfirm';
import Verify from './components/screens/Verify';
import NewPass from './components/screens/NewPass';
import Home from './components/screens/Home';
import List_product from './components/screens/List_product';
import Product_detail from './components/screens/Product_detail';
import My_cart from './components/screens/My_cart';
import Payment from './components/screens/Payment';
import New_address from './components/screens/New_address';
import Edit_profile from './components/screens/Edit_profile';
import Discount from './components/screens/Discount';
import Profile from './components/screens/Profile';
import Liked from './components/screens/Liked';
import My_discount from './components/screens/My_discount';
import My_assessment from './components/screens/My_assessment';
import Histoty from './components/screens/History';
import Tab_navigation from './components/navigation/Tab_navigation';
import Rate from './components/screens/Rate';

const App = () => {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EmailConfirm" component={EmailConfirm}/>
        <Stack.Screen name="Verify" component={Verify}/>
        <Stack.Screen name="NewPass" component={NewPass}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="List_product" component={List_product}/>
        <Stack.Screen name="Product_detail" component={Product_detail}/>
        <Stack.Screen name="My_cart" component={My_cart}/>
        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="New_address" component={New_address}/>
        <Stack.Screen name="Edit_profile" component={Edit_profile}/>
        <Stack.Screen name="Discount" component={Discount}/>
        <Stack.Screen name="My_discount" component={My_discount}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Liked" component={Liked}/>
        <Stack.Screen name="My_assessment" component={My_assessment}/>
        <Stack.Screen name="History" component={Histoty}/>
        <Stack.Screen name="Tab_navigation" component={Tab_navigation}/>
        <Stack.Screen name="Rate" component={Rate}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
