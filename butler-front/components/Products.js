import React, { Component } from 'react'
import { Text } from 'react-native';
import Axios from 'axios';


export default class Products extends Component {

  state = {
    birras: []
  };

  cogerCervezas() {
    Axios.get("http://127.0.0.1:3010/api/auth/currentuser").then(res => {
      const birra = res.data.username;
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