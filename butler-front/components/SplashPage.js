import React, { Component } from "react";
import { Text, View ,Image, Button} from "react-native";
import styled from "styled-components/native";

const Title = styled.Text`
  color: palevioletred;
  font-weight: bold;
  font-size: 80px;
  text-align:center
`;

const StyledView = styled.View`
  padding: 5%;
`;



export default class SplashPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }
  componentWillMount(){

    setTimeout(()=>{this.setState({timePassed: true})}, 3000);
  }
  componentWillUnmount(){
    this.state.timePassed = true

  }
  render() {
    if (!this.state.timePassed){
      return (
        <StyledView>
          <Title>BUTLER</Title>
          <Image
            source={require('../assets/images/butlerIcon.png')}
          />
          
        </StyledView>
     
     );
    }else{
      return (
        <View>
          
      <StyledView>
        <Title>LOGIN</Title>
      </StyledView>
        <Button title="login" onPress={()=> this.props.navigation.navigate("Main")}/>
        </View>
      );
    }
  }
  
}



