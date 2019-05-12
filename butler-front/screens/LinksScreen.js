import React from 'react';
import { Text,View ,TextInput,TouchableOpacity,ScrollView, StyleSheet } from 'react-native';
import Chats from "../components/Chats";
import Chat from '../components/Chat';
import Axios from "axios";

export default class LinksScreen extends React.Component {
  constructor(props){
    
    super(props)
    this.chatArea = ""
    this.state = {
      chat:"zz",
      message: "m",
      time:1
    }}
    static navigationOptions = {
      header: null
    };
  mandarMensaje(){
    this.setState({...this.state,chat: this.state.message})
  }
  componentDidMount(){
    
    setInterval(()=>{
      Axios.get("http://localhost:3010/allRooms").then(res =>this.setState({...this.state,chat: Object.keys(res.data),time: this.state.time +=1}));


    },1000)
  }

  render() {
    if(this.state.chat.includes(this.state.message)){
      return(
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        
        <Chat chat={this.state.chat}/>
        <Text >chat: {this.state.chat}</Text>
        <Text >message: {this.state.message}</Text>
        <Text >time: {this.state.time}</Text>
        <TouchableOpacity onPress={(text)=>this.setState({...this.state,message: "fuera"}) }>
          <Text>adios</Text>
        </TouchableOpacity>
      </ScrollView>
      )}else{
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Chats/>
        
        <TextInput
          onChangeText={(text)=>this.setState({...this.state,message: text}) }
          placeholder="Password"
          
        />
    <TouchableOpacity
      onPress={() => this.mandarMensaje()}
    >
      <Text >chat: {this.state.chat}</Text>
      <Text >message: {this.state.message}</Text>        
      <Text >time: {this.state.time}</Text>

    </TouchableOpacity>
      </ScrollView>
    );}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
