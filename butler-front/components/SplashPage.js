import React, { Component } from "react";
import {
  Text,
  Image,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import styled from "styled-components/native";
import axios from "axios";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Container2 = styled.View`
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  container2: {
    padding: 20
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  buttonContainer: {
    width: 300,
    backgroundColor: "#34b5ba",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  buttonText: {
    color: "white",
    backgroundColor: "#34b5ba",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      timePassed: false,
      password: "undefinasdaed",
      username: undefined,
      error: undefined
    };
    this.send = false;
  }

  login() {
    axios.post("http://localhost:3010/api/auth/login",{username: this.state.username, password: this.state.password})
    .then(response =>{ response.data;
      this.props.navigation.navigate("Main");

    }).catch((err)=>this.setState({error: "Mal Mal"}))
    
  }

  componentDidMount() {}

  componentWillMount() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 3000);
  }

  componentWillUnmount() {
    this.state.timePassed = true;
  }

  render() {
    if (!this.state.timePassed) {
      return (
        <Container2>
          <Image
            style={{
              width: 400,
              height: 700
            }}
            source={require("../assets/images/ezgif.com-video-to-gif.gif")}
          />
        </Container2>
      );
    } else {
      return (
        <Container>
          <Image
            style={{
              marginTop: 80,
              width: 300,
              height: 400
            }}
            source={require("../assets/images/icon.png")}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(text)=>this.setState({username: text}) }
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email or Mobile Num"
            placeholderTextColor="rgba(225,225,225,0.7)"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text)=>this.setState({password: text}) }
            returnKeyType="go"
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.login()}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
            <Text>{this.state.error}</Text>
        </Container>
      );
    }
  }
}
