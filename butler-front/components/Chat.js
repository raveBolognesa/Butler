import React, { Component } from 'react';
import { Text } from 'react-native';
import io from "socket.io-client";

this.SocketIO.emit("newUser")

export default class Chat extends Component {
  componentDidMount(){
    this.socket.on("addUser", user=>{
      
    })
  }
  render() {
    return (
        <Text>Chat Page</Text>
    )
  }
}