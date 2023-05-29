import React, { Component } from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

import { ProductService } from '../components/connect_recommend/ProductService';
import { User } from '../components/screens/Login';

// import { setData } from '../components/connect_recommend/actions';
// import { connect } from 'react-redux';

export class Recommend_data extends React.Component {
    state = {
        data: [],
        product: [],
        rating: [],
    };
    componentDidMount() {
        const {movie} = this.props;
        const fetchData = async () => {
            const productService = new ProductService();
            const products = await productService.getProducts();
            const ratings = await productService.getRating();
            // const ratings = await productService.getRating();
            // Sử dụng dữ liệu sản phẩm ở đây
            const cur_user = {
              id: User.ID,
              movie: '',
            };
            if (movie != '') cur_user.movie = movie;
            this.setState({products: products, ratings: ratings, user: cur_user},  () => {
                axios.post('http://10.0.2.2:5000/sever/send-data', {
                  user: this.state.user,
                  rating: this.state.ratings,
                  product: this.state.products,
                })
                .then(response => {
                  console.log(response.data);
                  return fetch('http://10.0.2.2:5000/sever/get-data');
                })
                .then(response => response.json())
                .then(result => {
                  const parsedData = JSON.parse(result)
                  this.setState({ data: parsedData }, () => {
                    this.props.getDataArray(this.state.data);
                });
                })
                .catch(error => {
                  console.error(error);
                });
              });
              
          };
        fetchData();
    };

    getData = () => {
      return this.state.data;
    };

    
    render() {
        // const dataArray = Object.values(this.state.data);
        // this.props.getDataArray(dataArray);
        // const dataElements = dataArray.map((item, index) => (
        //     console.log(item)
        // ));
        return null;
  }
}

