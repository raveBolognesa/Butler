import React, { Component } from "react";

import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import styled from "styled-components/native";
import Axios from "axios";

const Title = styled.Text`
  color: palevioletred;
  font-weight: bold;
  font-size: 20px;
`;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const StyledView = styled.View`
  padding: 5%;
`;

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Title>LOGIN</Title>
        <Image
          style={{
            width: 300,
            height: 400
          }}
          source={require("../assets/images/icon.png")}
        />
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={someFunction} />
        <FormValidationMessage>Error message</FormValidationMessage>
      </Container>
    );
  }
}
