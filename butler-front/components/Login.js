import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import styled from "styled-components/native";
import Axios from "axios";

const Title = styled.Text`
  color: palevioletred;
  font-weight: bold;
  font-size: 20px;
`;

const StyledView = styled.View`
  padding: 5%;
`;

export default class Login extends Component {
  render() {
    return (
      <StyledView>
        <Title>LOGIN</Title>
      </StyledView>
    );
  }
}
