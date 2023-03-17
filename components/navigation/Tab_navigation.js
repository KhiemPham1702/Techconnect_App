import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import List_product from '../screens/List_product';
import My_cart from '../screens/My_cart';
import Discount from '../screens/Discount';
import Profile from '../screens/Profile';
import Tabbar_custom from './Tabbar_custom';

const Tab = createBottomTabNavigator();

const Tab_navigation = () => {
    return (
        <Tab.Navigator 
            tabBar={props => <Tabbar_custom {...props}/>}
            screenOptions={{
                headerShown: false,
              }}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="List_product" component={List_product} />
            <Tab.Screen name="Discount" component={Discount} />
            <Tab.Screen name="My_cart" component={My_cart} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Tab_navigation;
