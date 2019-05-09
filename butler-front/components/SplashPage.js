import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import styled from "styled-components/native";

const Title = styled.Text`
  color: #34b5ba;
  font-weight: bold;
  font-size: 80px;
  text-align: center;
  padding: 40px;
`;
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
const ButtonLogin = styled.Button`
  padding: 5%;
  width: 80%;
  height: 20%;
  color: red;
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
    borderWidth: 1 ,
    borderColor: '#34b5ba',
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  buttonContainer: {
    width: 300,
    backgroundColor: '#34b5ba',
    padding:10,
    borderRadius: 10,
    borderWidth: 1 ,
    borderColor: '#34b5ba',
  },
  buttonText: {
    color: "white",
    backgroundColor: '#34b5ba',
    textAlign: "center",
    fontWeight: "700"
  }
});

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      timePassed: false
    };
    this.send = false;
  }
  componentDidMount() {
    this.StartImageRotateFunction();
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 3000);
  }
  componentWillUnmount() {
    this.state.timePassed = true;
  }
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }).start(() => this.StartImageRotateFunction());
  }
  someFunction() {
    return true;
  }
  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

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
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email or Mobile Num"
            placeholderTextColor="rgba(225,225,225,0.7)"
          />

          <TextInput
            style={styles.input}
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => this.props.navigation.navigate("Main")}>
             <Text  style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity> 

        </Container>
      );
    }
  }
}
