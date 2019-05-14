import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { MapView} from 'expo';
import { WebBrowser } from "expo";
import Touchable from "react-native-platform-touchable";
import Axios from "axios";
import Categorias from "../components/Categorias";

import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
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
    padding: 10,
    marginTop: 20
  },
  imagenPerfil: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 65,
    borderColor: "#34b5ba",
    marginRight: 20
  },
  cabecera: {
    flex: 1,

    flexDirection: "row",
    width: 350,
    marginTop: 20
  },
  item: {
    width: 80
  },
  cabeceraDerecha: {
    paddingTop: 10
  },
  cabeceraStadisticas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  contacto: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    width: 350,
    marginBottom: 10
  },

  buttonContainer: {
    width: 300,
    backgroundColor: "#34b5ba",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 65,
    borderColor: "#34b5ba",
    marginRight: 20
  },
  buttonContainer2: {
    width: 200,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  buttonText: {
    color: "white",
    backgroundColor: "#34b5ba",
    textAlign: "center",
    fontWeight: "700"
  },
  buttonText2: {
    textAlign: "center",
    fontWeight: "700"
  },
  subHeader: {
    width: 350,
    height: 20
  },
  usuario: {
    width: 350,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10
  },
  descripcion: {
    marginBottom: 10
  },
  productoAuthor: {
    marginTop: 20,
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  itemHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200
  },
  barradetitulo: {
    height: 40
  },
  botonCabron: {
    marginTop: 5
  },
  buttonX: {
    backgroundColor: "whitesmoke",
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#34b5ba",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  itemDescription: {
    width: 250
  },
  imagenItem: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#34b5ba",
    marginRight: 20
  },
  itemTitle: {
    color: "#34b5ba",
    fontWeight: "bold",
    fontSize: 20
  },
  subtituloBlanco: {
    color: "whitesmoke",
    fontSize: 15,
    fontWeight: "bold"
  },
  tituloDerecha: {
    flex: 1,
    flexDirection: "column"
  },
  productoMapa: {
    backgroundColor: "#34b5ba",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 350
  },
  mapaBorde: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 350
  },
  productHeader: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    padding: 10,
    marginBottom: 5
  },
  fondoblanco: {
    backgroundColor: "whitesmoke",
    padding: 5,
    borderColor: "#34b5ba",
    borderRadius: 20,
    borderWidth: 1,
    height: 200
  },
  tituloBlanco: {
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "bold"
  },
  containerProduct: {
    backgroundColor: "#34b5ba",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 350,
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "800"
  },
  imagenItem1: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 75,
    borderColor: "whitesmoke",
    backgroundColor: "whitesmoke",
    marginRight: 20
  },
  newButtonText: {
    color: "white",
    backgroundColor: "#34b5ba",
    textAlign: "center",
    fontWeight: "700"
  },
  newButtonText2: {
    color: "black",
    textAlign: "center",
    fontWeight: "700"
  },
  newButtonContainer: {
    marginTop: 15,
    backgroundColor: "#34b5ba",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  newButtonContainer2: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginBottom: 20
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
      date: "String",
      campo: "products"
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
      .then(res =>
        this.setState({
          ...this.state,
          price: "",
          description: "",
          title: "",
          localization: "",
          date: "",
          vista: "perfilprivado"
        })
      )
      .catch(err => this.setState({ ...this.state, error: "Error" }));
  }

  editarProducto() {
    Axios.post(
      `https://butler-back.herokuapp.com/api/products/${
        this.state.paraeditar
      }/edit`,
      {
        price: this.state.price,
        description: this.state.description,
        title: this.state.title,
        localization: this.state.localization,
        date: this.state.date
      }
    )
      .then(res =>
        this.setState({
          ...this.state,
          price: "",
          description: "",
          title: "",
          localization: "",
          date: "",
          vista: "perfilprivado"
        })
      )
      .catch(err => this.setState({ ...this.state, error: "Error" }));
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

  openProduct(x) {
    this.setState({ ...this.state, product: x, vista: "product" });
    Axios.get(
      `https://butler-back.herokuapp.com/api/products/${x}/oneproduct`
    ).then(res =>
      this.setState({
        ...this.state,
        title: res.data.product.title,
        author: res.data.product.author.username,
        phone: res.data.product.author.phone,
        email: res.data.product.author.email,
        description: res.data.product.description,
        price: res.data.product.price,
        localization: res.data.product.localization,
        date: res.data.product.date,
        createAt: res.data.product.created_at
      })
    );
  }

  componentDidMount() {
    this.cogerCervezas();
  }
  render() {
    const region = {
      latitude: 43,
      longitude: 3,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    };
    if (this.state.vista === "perfilprivado") {
      return (
        <ScrollView>
          <Container>
            <View style={styles.cabecera}>
              <View>
                <Image
                  style={styles.imagenPerfil}
                  source={require("../assets/images/icon.png")}
                />
              </View>
              <View style={styles.cabeceraDerecha}>
                <View style={styles.cabeceraStadisticas}>
                  <Text styles={styles.item}>9</Text>
                  <Text styles={styles.item}>4</Text>
                  <Text styles={styles.item}>12</Text>
                </View>
                <View style={styles.cabeceraStadisticas}>
                  <Text styles={styles.item}>Rating</Text>
                  <Text styles={styles.item}>buys</Text>
                  <Text styles={styles.item}>products</Text>
                </View>
                <View style={styles.buttonContainer2}>
                  <Text style={styles.buttonText2}>boton</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.usuario}> usuario {this.state.usuario}</Text>
              <Text style={styles.descripcion}>Description:</Text>
            </View>
            <View style={styles.contacto}>
              <Text>Phone:</Text>
              <Text>Email:</Text>
              <Text>Chat</Text>
            </View>
            <Categorias openProduct={x => this.openProduct(x)} />
            <Text>Products</Text>

            <Touchable
              onPress={() =>
                this.setState({ ...this.state, vista: "crearproducto" })
              }
            >
              <View>
                <Text>Ir a crear producto</Text>
              </View>
            </Touchable>
            <Touchable onPress={this.props.press}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>logout</Text>
              </View>
            </Touchable>
          </Container>
        </ScrollView>
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
            <Text style={styles.buttonText}>
              Mandar formulario e ir a perfil privado
            </Text>
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
            onChangeText={text =>
              this.setState({ ...this.state, paraeditar: text })
            }
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
            <Text style={styles.buttonText}>
              Mandar formulario e ir a perfil privado
            </Text>
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
    } else if (this.state.vista === "product") {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.containerProduct}>
              <View style={styles.productHeader}>
                <View>
                  <Image
                    style={styles.imagenItem1}
                    source={require("../assets/images/icon.png")}
                  />
                </View>
                <View style={styles.tituloDerecha}>
                  <View style={styles.barradetitulo}>
                    <Text style={styles.tituloBlanco}>{this.state.title}</Text>
                  </View>
                  <View>
                    <Text style={styles.subtituloBlanco}>
                      {this.state.price}
                    </Text>
                    <Text style={styles.subtituloBlanco}>
                      {this.state.date}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.botonCabron}>
                      <Text style={styles.buttonX}>BUY</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.fondoblanco}>
                <Text>{this.state.createAt}</Text>
                <Text numberOfLines={3}>{this.state.description}</Text>
              </View>
            </View>
            <View style={styles.mapaBorde}>
              <MapView
                style={styles.productoMapa}
                initialRegion={{
                  latitude: 40.25,
                  longitude: -3.7,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
              />
            </View>
            <View style={styles.productoAuthor}>
              <TouchableOpacity onPress={() => this.props.openProduct(x)}>
                <View style={styles.titleItem}>
                  <View style={styles.item}>
                    <Image
                      source={require("../assets/images/icon.png")}
                      style={styles.imagenItem}
                    />
                  </View>
                  <View style={styles.item}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{this.state.author}</Text>
                    </View>
                    <Text style={styles.itemDescription}>
                      {this.state.phone}
                    </Text>
                    <Text style={styles.itemDescription}>
                      {this.state.email}
                    </Text>
                    {/* <TouchableOpacity onPress={() => this.borrar(item._id)}>
                    <Text>borrar</Text>
                  </TouchableOpacity> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.newButtonContainer}>
                <Text style={styles.newButtonText}>CHAT</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.newButtonContainer2}
                onPress={() =>
                  this.setState({ ...this.state, vista: "perfilprivado" })
                }
              >
                <Text style={styles.newButtonText2}>BACK</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
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
