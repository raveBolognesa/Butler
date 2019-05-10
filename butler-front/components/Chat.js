import React, { Component } from 'react';
import { Text,View ,TextInput,TouchableOpacity} from 'react-native';
/** 1. import socket client **/
import io from 'socket.io-client';
import Axios from 'axios';


export default class Chat extends Component {
  
  constructor(props){
    
    super(props)
    this.chatArea = ""
    this.state = {
      users:[],
      messagesList: [],
      message: "",
      string:undefined
    }

    /** 2. connect to server **/
    this.socket = io("http://localhost:3010/" + this.props.chat)
  }

  mandarMensaje(){
    const mensajes = [...this.state.messagesList];
    mensajes.push(this.state.message);
    const mandar ={
      message: this.state.message
    };

    this.socket.emit("messageSent", mandar.message)
    this.setState({...this.state,messagesList: mensajes});
  }

  componentDidMount(){
    Axios.get("https://butler-back.herokuapp.com/api/auth/currentuser").then(res => {
      const birra = res.data.username;
      const usuarios = [...this.state.users]
      usuarios.push(birra)
      this.setState({
        ...this.state,
        users: usuarios
      });
    });
    this.socket.on("newMessage", message =>{
      const cosita = [...this.state.messagesList]
      cosita.push(message)
      this.setState({
        ...this.state,
        messagesList: cosita
      })
    });

  }


  render() {

    return (
      <View>
        <Text>{this.state.string}</Text>
        <Text>{this.state.messagesList}</Text>
        <Text>{this.state.message}</Text>
      <TextInput
      onChangeText={(text)=>this.setState({message: text}) }
      placeholder="Password"
      
    />
    <TouchableOpacity
      onPress={() => this.mandarMensaje()}
    >
      <Text >LOGIN</Text>
    </TouchableOpacity>
      <Text>{this.state.error}</Text>
      </View>
    )
  }
}