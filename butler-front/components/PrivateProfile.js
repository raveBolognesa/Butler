import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { WebBrowser } from "expo";
import Touchable from "react-native-platform-touchable";
import Axios from "axios";

import styled from "styled-components/native";


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
    padding: 10,
  },
  buttonText: {
    color: "white",
    backgroundColor: "#34b5ba",
    textAlign: "center",
    fontWeight: "700"
  },container: {
    padding: 20
  }
});

export default class PrivateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: undefined,
      bill: undefined,
      vista: "perfilprivado",
      price: "String",
    description: "String",
    title: "String",
    localization: "String",
    date: "String"
    };
  }

  cogerCervezas() {
    Axios.get("https://butler-back.herokuapp.com/api/auth/currentuser").then(
      res => {
        const birra = res.data.username;
        this.setState({
          ...this.state,
          usuario: birra
        });
      }
    );
  }
  create() {
    return this.props.navigation.navigate("ProductCreate");
  }

  crearProducto() {
    Axios.post("https://butler-back.herokuapp.com/api/products/newproduct", {
      price: this.state.price,
      description: this.state.description,
      title: this.state.title,
      localization: this.state.localization,
      date: this.state.date
    })
    .then(res => this.setState({...this.state,price:'',description:'',title:'',localization:'',date:'',vista:"perfilprivado"}))
    .catch(err => 
      this.setState({...this.state, error: "Error"})
      )
  }

  editarProducto() {
    Axios.post(`https://butler-back.herokuapp.com/api/products/${this.state.paraeditar}/edit`, {
      price: this.state.price,
      description: this.state.description,
      title: this.state.title,
      localization: this.state.localization,
      date: this.state.date
    })
    .then(res => this.setState({...this.state,price:'',description:'',title:'',localization:'',date:'',vista:"perfilprivado"}))
    .catch(err => 
      this.setState({...this.state, error: "Error"})
      )
  }

  pagar() {
    this.setState({ ...this.state, bill: "test" });
    var precio = this.state.price;
    Axios.post("https://butler-back.herokuapp.com/api/doPayment/", {
      amount: +precio,
      tokenId: "tok_visa"
    })
      .then(res => this.setState({ ...this.state, bill: res.data.receipt_url }))
      .catch(err =>
        this.setState({ ...this.state, error: "Authentication error" })
      );
  }
  link(e) {
    WebBrowser.openBrowserAsync(e);
  }
  componentDidMount() {
    this.cogerCervezas();
  }
  render() {
    if (this.state.vista === "perfilprivado") {
      return (
        <View>
          <Text>Vista de perfil</Text>
          <Text> usuario {this.state.usuario}</Text>
          <Touchable
            onPress={() => this.setState({ ...this.state, vista: "crearproducto" })}
          >
            <View>
              <Text>Ir a crear producto</Text>
            </View>
          </Touchable>
        </View>
      );
    } else if (this.state.vista === "crearproducto") {
      return (
        <Container>
          <Text>Vista de crear producto</Text>
          <View>


          <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ price: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Price"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ description: text })}
              returnKeyType="next"
              placeholder="Description"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ title: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Title"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ localization: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Localization"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
                <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ date: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Date"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />


          </View>



          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.crearProducto()}
          >
          
              <Text  style={styles.buttonText}>Mandar formulario e ir a perfil privado</Text>
            
          </TouchableOpacity>
          <Touchable
            onPress={() => this.setState({ ...this.state, vista: "editar" })}
          >
            <View>
              <Text>ir a otras vistas</Text>
            </View>
          </Touchable>
        </Container>
      );
    } else if (this.state.vista === "editar") {
      return (
        <Container>
          <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({...this.state, paraeditar: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Price"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
          <Text>Vista de crear producto</Text>
          <View>


          <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ price: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Price"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ description: text })}
              returnKeyType="next"
              placeholder="Description"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ title: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Title"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ localization: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Localization"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
                <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={text => this.setState({ date: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Date"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />


          </View>



          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.editarProducto()}
          >
          
              <Text  style={styles.buttonText}>Mandar formulario e ir a perfil privado</Text>
            
          </TouchableOpacity>
          <Touchable
            onPress={() => this.setState({ ...this.state, vista: "d" })}
          >
            <View>
              <Text>ir a otras vistas</Text>
            </View>
          </Touchable>
        </Container>
      );
    } else {
      return (
        <View>
          <Text>Private Profile</Text>
          <Touchable onPress={this._handlePressSlack}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text>Ask a question on the Expo forums</Text>
              </View>
            </View>
          </Touchable>
          <View>
            <Text>{this.state.usuario}</Text>
          </View>
          <Touchable onPress={this.props.press}>
            <View>
              <Text>logout</Text>
            </View>
          </Touchable>

          <TextInput
            onChangeText={text => this.setState({ ...this.state, price: text })}
            placeholder="money"
            placeholderTextColor="rgba(225,225,225,0.9)"
          />
          <Touchable onPress={() => this.pagar()}>
            <Text>Pagar</Text>
          </Touchable>

          <View>
            <Touchable onPress={() => this.link(this.state.bill)}>
              <Text>factura {this.state.bill}</Text>
            </Touchable>
            <Text>precio {this.state.price}</Text>
            <Text>error {this.state.error}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
              <Text>Create Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  _handlePressSlack = () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };
  _hadleLogout = () => this.props.navigation.navigate("Signup");
}
