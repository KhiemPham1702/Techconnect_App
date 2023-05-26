import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { getDatabase} from "firebase/database";
import { db, ref, set, child, get, onValue } from '../DAL/Database'
import { liked, User, brand, Carts, CartProduct } from '../screens/Login';

export class ProductService extends React.Component {
    getProducts = async () => {
      return new Promise((resolve, reject) => {
        onValue(
          ref(db, "Product/"),
          (snapshot) => {
            let data = [];
            snapshot.forEach((childSnapshot) => {
              let item = childSnapshot.val();
              data.push({
                Id_product: item.ID,
                Name_product: item.name,
                Brand: item.brand_ID,
              });
            });
            resolve(data);
          },
          {
            onlyOnce: true,
          }
        );
      });
    };

    getRating = async () => {
      return new Promise((resolve, reject) => { 
        onValue(
          ref(db, "User_comment/"),
          (snapshot) => {
            let data = [];
            snapshot.forEach((childSnapshot) => {
              let item = childSnapshot.val();
              data.push({
                Id_user: item.User_ID,
                Id_product: item.Product_ID,
                Rating: item.Rate,
              });
            });
            resolve(data);
          },
          {
            onlyOnce: true,
          }
        );
      })
    };

    

  }
  