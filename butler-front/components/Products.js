import React, { Component } from 'react'
import { Text } from 'react-native';
import Axios from 'axios';


export default class Products extends Component {

  state = {
    birras: []
  };

  cogerCervezas() {
    Axios.get("https://api.punkapi.com/v2/beers").then(res => {
      const birra = res.data[0].name;
      this.setState({
        ...this.state,
        birras: birra
      });
    });
  }
  componentDidMount() {
    this.cogerCervezas();
  }
  render() {
    return (
        <Text>Products Page {this.state.birras}</Text>
    )
  }
}