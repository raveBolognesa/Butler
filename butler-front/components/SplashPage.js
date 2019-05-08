import React, { Component } from "react";
import { Text, View ,Image} from "react-native";
import styled from "styled-components/native";

const Title = styled.Text`
  color: palevioletred;
  font-weight: bold;
  font-size: 80px;
`;

const StyledView = styled.View`
  padding: 5%;
`;

export default class SplashPage extends Component {
  render() {
    return (
      <StyledView>
        <Title>BUTLER</Title>
        <Image
          source={require('../assets/images/butlerIcon.png')}
        />
        
      </StyledView>
   
    );
  }
}


