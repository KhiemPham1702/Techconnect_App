import { StyleSheet, Text, View } from "react-native";
import React, { useEffect , useState} from "react";
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';;

import color from "../../contains/color";
import Home from "../screens/Home";
import List_product from "../screens/List_product";
import My_cart from "../screens/My_cart";
import Discount from "../screens/Discount";
import Profile from "../screens/Profile";

const Tabbar_custom = ({ state , navigation }) => {
    const tabs = [
        {
          name: '',
          index: 0,
          key: 'Home',
          activeIcon: <Icon name="home-variant" color="#fff" size={30} />,
          inactiveIcon: <Icon name="home-variant-outline" color="#4d4d4d" size={30} />
        },
        {
          name: '',
          index: 1,
          key: 'List_product',
          activeIcon: <Icon2 name="search" color="#fff" size={30} />,
          inactiveIcon: <Icon2 name="search" color="#4d4d4d" size={30} />
        },
        {
          name: '',
          index: 2,
          key: 'My_cart',
          activeIcon: <Icon name="cart" color="#fff" size={30} />,
          inactiveIcon: <Icon name="cart-outline" color="#4d4d4d" size={30} />
        },
        {
          name: '',
          index: 3,
          key: 'Discount',
          activeIcon: <Icon name="ticket-percent" color="#fff" size={30} />,
          inactiveIcon: <Icon name="ticket-percent-outline" color="#4d4d4d" size={30} />
        },
        {
          name: '',
          index: 4,
          key: 'Profile',
          activeIcon: <Icon name="account" color="#fff" size={30} />,
          inactiveIcon: <Icon name="account-outline" color="#4d4d4d" size={30} />
        },
      
      ];
      const handlePress = (activeTab) => {
        navigation.navigate(activeTab);
      };
    return (
      <Tabbar
        tabs={tabs}
        tabBarContainerBackground={color.white}
        tabBarBackground={color.background}
        activeTabBackground={color.red}
        transitionSpeed={200}
        labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 10 }}
        onTabChange={(item) => handlePress(item.key)}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        justifyContent: 'center',
    }
})

export default Tabbar_custom;