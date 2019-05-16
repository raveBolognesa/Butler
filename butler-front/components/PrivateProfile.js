import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  CameraRoll
} from "react-native";
import { MapView } from "expo";
import { WebBrowser } from "expo";
import Touchable from "react-native-platform-touchable";
import Axios from "axios";
import Categorias from "../components/Categorias";
import utf8 from "utf8";
import base64 from 'base-64';
import api from './api';
import call from 'react-native-phone-call';
import { ImagePicker } from 'expo';



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

  buttonContainer4: {
    width: 300,
    backgroundColor: "#34b5ba",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderRadius: 65,
    borderColor: "#34b5ba",
    marginTop: 10
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
  buttonContainer3: {
    width: 300,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginTop: 10
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
    marginBottom: 10,
    marginTop: 10,
    color:"gray",
    fontWeight:"bold",
  },
  productoAuthor: {
    marginTop: 20
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
    width: 76,
    height: 76,
    borderWidth: 1,
    borderRadius: 38,
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
    backgroundColor: "#34b5ba",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 250,
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "800"
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
    borderRadius: 60,
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
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 350
  },
  newButtonContainer2: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginBottom: 20
  },
  titleItem: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  text: {
    fontSize: 28,
    margin: 20
  },
  text2: {
    fontSize: 20,
    margin: 10,
    color: "#34b5ba"
  },
  buttonText: {
    fontSize: 21
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba"
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
  containerPadre: {
    backgroundColor: "whitesmoke"
  },
  containerProfEditor: {
    backgroundColor: "#34b5ba",
    flex: 1,
    flexDirection: "column",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginTop: 40
  },
  cabeceraProfEditor: {
    padding: 5,
  },
  cuerpoProfEditor: {
    backgroundColor: "whitesmoke",
    padding: 10,
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  textCabeceraProfEditor: {
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  },
  imageBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  imagenProfEditor: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#34b5ba",
    marginBottom: 20
  },
  groupButtonProfEditor: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal:60
  },
  buttonProfEditor: {
    padding: 5,
    margin:5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  textPhotoEditor: {
    textAlign: "center",
    color: "black",
    padding: 5
  },
  textProfEditor: {
    textAlign: "center",
    color: "whitesmoke",
    fontSize: 20
  },
  groupInputProfEditor: {
    textAlign: "center",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  inputProfEditor: {
    marginBottom: 5,
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  buttonEditProfEditor: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "#34b5ba",
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
      campo: "products",
      imgProfile:
        "ZmlsZTovLy9kYXRhL3VzZXIvMC9ob3N0LmV4cC5leHBvbmVudC9jYWNoZS9FeHBlcmllbmNlRGF0YS8lMjU0MGFsZ29yaW5ldCUyNTJGYnV0bGVyLWZyb250L1JlYWN0TmF0aXZlLXNuYXBzaG90LWltYWdlNTE2NTQwNjMyMjY0MzQzNjgxMS5wbmc=",
      topText: "",
      bottomText: "",
      username: "",
      description: "",
      phone: "",
      buys:"buys",
          sells:"sells",
      imgProduct: "",
      cuantosprods: 0
    };
  }

  call (x)  {
    //handler to make a call
    let args = {
      number: x,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  traerProductos() {
    Axios.get("https://butler-back.herokuapp.com/api/products/misproductos").then(
      res => {
        const producto = res.data;
        this.setState({
          ...this.state,
          misproductos: producto,
          cuantosprods: producto.length
        });
      }
    ).catch(error=> console.log(error));
    
  }

  getUser() {
    this.traerProductos();
    console.log("entramos en getUser");
    Axios.get("https://butler-back.herokuapp.com/api/auth/currentuser")
      .then(res => {
        const buys = res.data.buys;
        const sells = res.data.sells;
        const username = res.data.username;
        const description = res.data.description;
        const email = res.data.email;
        const phone = res.data.phone;
        const imgProfile = res.data.imgProfile;

        console.log(res.data);
        this.setState({
          ...this.state,
          username: username,
          description: description,
          phone: phone,
          email: email,
          imgProfile: imgProfile,
          buys: buys,
          sells: sells
        });
      })
      .catch(err => this.setState({ ...this.state, error: "Error" }));
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
      date: this.state.date,
      imgProduct: this.state.base
    })
      .then(res =>
        this.setState({
          ...this.state,
          price: "",
          description: "",
          title: "",
          localization: "",
          date: "",
          vista: "perfilprivado",
          picture: ""
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
  editarPerfil() {
    Axios.post(
      `https://butler-back.herokuapp.com/api/auth/${this.state.username}/edit`,
      {
        username: this.state.username,
        description: this.state.description,
        email: this.state.email,
        phone: this.state.phone,
        imgProfile: this.state.base
      }
    )
      .then(res =>{
        this.setState({
          ...this.state,
          
          vista: "perfilprivado"
        });

    this.getUser()}
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
        imgProduct: res.data.product.imgProduct,
        date: res.data.product.date,
        createAt: res.data.product.created_at
      })
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64:true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({...this.state,base: result.base64,imgProfile:result.base64 });
    }
  };
  _pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64:true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({...this.state,base: result.base64 });
    }
  };

  _onChoosePic = async () => {
    const { cancelled, uri } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imgProfile: uri });
      // console.log(uri) // this logs correctly
      // TODO: why isn't this showing up inside the Image on screen?
    }
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const { cancelled, uri } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgProfile: uri });
    }
  };

  // When "Save" is pressed, we snapshot whatever is shown inside
  // of "this.imageView" and save it to the device's camera roll.
  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);
    // var bytes = utf8.encode(uri);
    // var encoded =base64.encode(bytes);
    this.setState({ ...this.state, imgProfile: uri });

    console.log(this.state.imgProfile);
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  };
  _onSaveProduct = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);
    // var bytes = utf8.encode(uri);
    // var encoded =base64.encode(bytes);
    this.setState({ ...this.state, imgProduct: uri})

    console.log(this.state.imgProduct)
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  };
  _onSave2 = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await api.addPicture(uri);

    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  };

  handleSubmit(e) {
    e.preventDefault();
    // Reuse of the method "addPicture" from the file '../api'
    debugger;
    api.addPicture(this.state.file).then(photoData => {
      debugger;
      let newPhotos = [...this.state.photos];
      newPhotos.push(photoData);

      this.setState({
        ...this.state,
        photos: newPhotos
      });
    });
  }

  componentDidMount() {
    console.log(this.state.imgProfile);
    this.traerProductos();

    this.getUser();
  }
  render() {
    const region = {
      latitude: 43,
      longitude: 3,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    };
    
    let busca =(x)=> x.length - 1;
    let busca2 =(x)=> x.length === undefined ? 0 : x.length;
    let decoder = (x)=> base64.decode(x);
    if (this.state.vista === "perfilprivado") {
      return (
        <ScrollView>
          <View style={{flex:1,justifyContent:"space-between",alignItems:"center", padding:20, marginTop:20}}>
            <View style={styles.cabecera}>
              <View>
                <Image
                  style={styles.imagenPerfil}
                  source={{ uri: `data:image/png;base64,${this.state.imgProfile}` }}
                />
              </View>
              <View style={styles.cabeceraDerecha}>
                <View style={styles.cabeceraStadisticas}>
                  <Text styles={styles.item}>{busca2(this.state.sells)}</Text>
                  <Text styles={styles.item}>{busca2(this.state.buys)}</Text>
                  <Text styles={styles.item}>{this.state.cuantosprods}</Text>
                </View>
                <View style={styles.cabeceraStadisticas}>
                  <Text styles={styles.item}>Sells</Text>
                  <Text styles={styles.item}>Buys</Text>
                  <Text styles={styles.item}>Prods</Text>
                </View>
                <View style={styles.buttonContainer2}>
                  <Touchable
                    onPress={() =>
                      this.setState({ ...this.state, vista: "editarPerfil" })
                    }
                  >
                    <View>
                      <Text style={styles.buttonText2}>Editar Perfil</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.usuario}>{this.state.username}</Text>
              <Text style={styles.descripcion}>{this.state.description ? this.state.description : "Add a description!!" }</Text>
            </View>
            <View style={styles.contacto}>
              <Text>{this.state.phone}</Text>
              <Text>{this.state.email}</Text>
            </View>
            <Categorias  openProduct={x => this.openProduct(x)} />
                    <View style={{flex:1}}>

            <Touchable
              onPress={() =>
                this.setState({ ...this.state, vista: "crearproducto" })
              }
            >
              <View style={styles.buttonContainer3}>
                <Text style={styles.buttonText2}>Ir a crear producto</Text>
              </View>
            </Touchable>
            <Touchable onPress={this.props.press}>
              <View style={styles.buttonContainer4}>
                <Text style={styles.newButtonText}>logout</Text>
              </View>
            </Touchable>
                    </View>
          </View>
        </ScrollView>
      );
    } else if (this.state.vista === "editarPerfil") {
      return (
        <ScrollView>
          <View style={styles.containerPadre}>
            <View style={styles.containerProfEditor}>
              <View style={styles.cabeceraProfEditor}>
                <Text style={styles.textCabeceraProfEditor}>
                  Profile Editor{this.state.error}
                </Text>
              </View>

              <View style={styles.cuerpoProfEditor}>
                <View style={styles.imageBody}>
                  <Image
                    ref={ref => (this.imageView = ref)}
                    style={styles.imagenProfEditor}
                    source={{ uri: `data:image/png;base64,${this.state.imgProfile}` }}
                  />
                </View>
                <View style={styles.groupButtonProfEditor}>
                  <TouchableOpacity
                    style={styles.buttonProfEditor}
                    onPress={this._pickImage}
                  >
                    <Text style={styles.textPhotoEditor}>Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonProfEditor}
                    onPress={this._onTakePic}
                  >
                    <Text style={styles.textPhotoEditor}>Camera</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.groupInputProfEditor}>
                  <TextInput
                    style={styles.inputProfEditor}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ username: text })}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder={this.state.username}
                    placeholderTextColor="rgba(225,225,225,0.9)"
                  />
                  <TextInput
                    style={styles.inputProfEditor}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ description: text })}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder={this.state.description}
                    placeholderTextColor="rgba(225,225,225,0.9)"
                  />

                  <TextInput
                    style={styles.inputProfEditor}
                    onChangeText={text => this.setState({ email: text })}
                    returnKeyType="next"
                    keyboardType="email-address"
                    placeholder={this.state.email}
                    placeholderTextColor="rgba(225,225,225,0.9)"
                  />
                  <TextInput
                    style={styles.inputProfEditor}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ phone: text })}
                    autoCorrect={false}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    placeholder={this.state.phone}
                    placeholderTextColor="rgba(225,225,225,0.9)"
                  />
                
                </View>

                <TouchableOpacity
                  style={styles.buttonEditProfEditor}
                  onPress={() => {this.editarPerfil()}}
                >
                  <Text style={styles.textProfEditor} >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.newButtonContainer2}
                  onPress={() =>
                    this.setState({ ...this.state, vista: "perfilprivado" })
                  }
                >
                  <Text style={styles.newButtonText2}>BACK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else if (this.state.vista === "crearproducto") {
      return (
        <ScrollView>
        <View style={styles.containerPadre}>
          <View style={styles.containerProfEditor}>
            <View style={styles.cabeceraProfEditor}>
              <Text style={styles.textCabeceraProfEditor}>
                Crear producto
              </Text>
            </View>
            <View style={styles.cuerpoProfEditor}>
                <View style={styles.imageBody}>
                  <Image
                    ref={ref => (this.imageView = ref)}
                    style={styles.imagenProfEditor}
                    source={{ uri: `data:image/png;base64,${this.state.base}` }}
                  />
                </View>
                <View style={styles.groupButtonProfEditor}>
                  <TouchableOpacity
                    style={styles.buttonProfEditor}
                    onPress={this._pickImage2}
                  >
                    <Text style={styles.textPhotoEditor}>Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonProfEditor}
                    onPress={this._onTakePic}
                  >
                    <Text style={styles.textPhotoEditor}>Camera</Text>
                  </TouchableOpacity>
                </View>
            <View style={styles.groupInputProfEditor}>
            <TextInput
              style={styles.inputProfEditor}
              autoCapitalize="none"
              onChangeText={text => this.setState({ price: text })}
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="Price"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />

            <TextInput
              style={styles.inputProfEditor}
              onChangeText={text => this.setState({ description: text })}
              returnKeyType="next"
              placeholder="Description"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.inputProfEditor}
              autoCapitalize="none"
              onChangeText={text => this.setState({ title: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Title"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.inputProfEditor}
              autoCapitalize="none"
              onChangeText={text => this.setState({ localization: text })}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Localization"
              placeholderTextColor="rgba(225,225,225,0.9)"
            />
            <TextInput
              style={styles.inputProfEditor}
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
                  style={styles.buttonEditProfEditor}
                  onPress={() => this.crearProducto()}
                >
                  <Text style={styles.textProfEditor} >
                    Crear
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.newButtonContainer2}
                  onPress={() =>
                    this.setState({ ...this.state, vista: "perfilprivado" })
                  }
                >
                  <Text style={styles.newButtonText2}>BACK</Text>
                </TouchableOpacity>
            </View>

         
         
        </View>
        </View>
        </ScrollView>
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
        <ScrollView>
    <View style={{flex: 1,
                  backgroundColor: "#fff",
                  padding: 10,
                  marginTop: 30,}}>

                  <View style={{backgroundColor:"#34b5ba",marginBottom:15,borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",}}>

                  <View style={{flex:1,flexDirection:"row",padding:10}}>

                        <View>

                              <Image
                                style={styles.imagenItem1}
                                source={{ uri:  `data:image/png;base64,${this.state.imgProduct}` }}
                                />
                          
                        </View>

                        <View>
                                    
                            <View style={{ flex:1, justifyContent:"space-around"}}>

                                  <Text style={styles.tituloBlanco}>{this.state.title}</Text>
                                  <Text style={styles.subtituloBlanco}>
                                    {this.state.price}
                                  </Text>
                                  <Text style={styles.subtituloBlanco}>
                                    {this.state.date}
                                  </Text>
                          
                            </View>
                        </View>

                    
                  </View>


                    <View style={{backgroundColor:"white",borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",}}>
                            <View  style={{height:100 , padding: 10}}>
                            <View style={{ flex:1, justifyContent:"space-between"}}>

            <Text numberOfLines={3}>{this.state.description}</Text>
            <Text  style={{fontSize:10,color:"grey"}}>{this.state.createAt}</Text>
                            </View>

                            </View>


                    </View>
                  </View>
                  
              <MapView
                style={styles.productoMapa}
                initialRegion={{
                  latitude: 40.25,
                  longitude: -3.7,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
                />


              <View  style={{flex:1,flexDirection:"row",padding:10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginTop:15}}>

                      <View>

                    <Image
                      source={require("../assets/images/icon.png")}
                      style={styles.imagenItem}
                      />
                      </View>


                  <View>
                    <View style={{flex:1,justifyContent:"space-around"}}>

                      <Text style={styles.itemTitle}>{this.state.author}</Text>
                      <TouchableOpacity
                    onPress={()=>{
                      this.call(this.state.phone)
                    }}
                    >
                    <Text style={styles.itemDescription}>
                      {this.state.phone}
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => 
                      WebBrowser.openBrowserAsync(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.state.email}&su=ButtlerApp`)}>

                    <Text style={styles.itemDescription}>
                      {this.state.email}
                    </Text>

                    </TouchableOpacity>
                    </View>

                  </View>

              </View>


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
