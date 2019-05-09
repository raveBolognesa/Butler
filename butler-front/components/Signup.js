import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
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
  signupContainer: {
    width: 300,
    padding: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "#34b5ba",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      email: undefined,
      phone: undefined,
      error: undefined
    };
  }

  Signup() {
    axios
      .post("http://192.168.43.228:3010/api/auth/signup", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(response => {
        response.data;
        this.props.navigation.navigate("Main");
      })
      .catch(err => this.setState({ error: "Authentication error" }));
  }

  render() {
    return (
      <View>
        <ScrollView  style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Container>
            <Image
              style={{
                marginTop: 11,
                width: 300,
                height: 400
              }}
              source={require("../assets/images/icon.png")}
            />

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Username"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ password: text })}
              returnKeyType="next"
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.9)"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="youremail@email.com"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ phone: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Phone number"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.Signup()}
            >
              <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>
            <Text>{this.state.error}</Text>
          </Container>
        </ScrollView>
      </View>
    );
  }
}
