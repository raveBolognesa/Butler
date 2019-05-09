import React, { Component } from 'react';
import { Text,View } from 'react-native';

import Axios from 'axios';



export default class Chats extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      userlist:[],
      username: null,
      birras: undefined
    }

  }

  
  cogerCervezas() {
    Axios.get("http://localhost:3010/api/auth/currentuser").then(res => {
      const birra = res.data.username;
      const chates = res.data.chats;
      this.setState({
        ...this.state,
        birras: birra,
        chats: chates
      });
    });
  }
  componentDidMount() {
    this.cogerCervezas();
  }

  render(){
  
    return (
      <View>
        <Text>El Chat {this.state.birras}</Text>
        <Text>El Chat {this.state.chats}</Text>
      </View>
    );
  }
}