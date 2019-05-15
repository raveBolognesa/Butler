import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from "react-native";
import { WebBrowser,  Constants, MapView, Location, Permissions } from "expo";
import call from 'react-native-phone-call';


import { MonoText } from "../components/StyledText";
import Products from "../components/Products";
import Axios from "axios";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      prodId:"",
      imgProduct: "",

      title: undefined,
      product: undefined,
      author: "",
      phone: "",
      description: "",
      price: undefined,
      localization: undefined,
      date: undefined,
      createAt: undefined,
      picture: undefined,

      mapRegion: {
        latitude: 40.39,
        longitude: -3.69,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: null,
      location: { coords: { latitude: 40.39, longitude: -3.69 } }
    };
  }

  comprarProducto(){
    Axios.post(`https://butler-back.herokuapp.com/api/products/${this.state.prodId}/comprar`)
    

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  call (x)  {
    //handler to make a call
    let args = {
      number: x,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  openProduct(x) {
    this.setState({ ...this.state, product: x });
    Axios.get(
      `https://butler-back.herokuapp.com/api/products/${x}/oneproduct`
    ).then(res =>{
      console.log(res.data.product);
      this.setState({
        ...this.state,
        prodId: res.data.product._id,
        title: res.data.product.title,
        author: res.data.product.author.username,
        authorImg: res.data.product.author.imgProfile,
        img: res.data.product.imgProduct,
        phone: res.data.product.author.phone,
        email: res.data.product.author.email,
        description: res.data.product.description,
        price: res.data.product.price,
        localization: res.data.product.localization,
        date: res.data.product.date,
        createAt: res.data.product.created_at
      })}
    );
  }

  crearUnChat(x,y){
    const { navigate } = this.props.navigation;

    Axios.post("https://butler-back.herokuapp.com/sock/newRoom",{message:[] , speaker: x, product: y})
      .then(res=> Promise.resolve(res.data.chatData._id))
      .then(id => navigate("Links", { speaker: this.state.author,id:id }) )
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.product === undefined) {
      return (
        <View style={styles.container}>
          <View style={styles.containerProducts}>
            <Text style={styles.productsTitle}>
              Productos {this.state.product}
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                borderColor: "#34b5ba",
                borderWidth: 1
              }}
            >
              <Products openProduct={x => this.openProduct(x)} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView>
        <View style={styles.containerOneProduct}>
          <View style={styles.containerProduct}>
            <View style={styles.productHeader}>
              <View>
                <Image
                  style={styles.imagenItem1}
                  source={{ uri: this.state.imgProduct }}
                />
              </View>
              <View style={styles.tituloDerecha}>
                <View style={styles.barradetitulo}>
                  <Text style={styles.tituloBlanco}>{this.state.title}</Text>
                </View>
                <View>
                  <Text style={styles.subtituloBlanco}>Price: {this.state.price / 100} €</Text>
                  <Text style={styles.subtituloBlanco}>About dates... {this.state.date}</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.botonCabron}
                  onPress={()=> {this.comprarProducto(); this.setState({ ...this.state, product: undefined });navigate("Settings"); }}
                  >
                    <Text style={styles.buttonX}>BUY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.fondoblanco}>
              <Text numberOfLines={3} style={{height: 70}}>
                {this.state.description.length > 170
                  ? this.state.description.substring(0, 170 - 3) + "..."
                  : this.state.description}
              </Text>
                  <Text style={{fontSize:10,color:"grey"}}>{this.state.createAt}</Text>
            </View>
          </View>
          <View style={styles.mapaBorde}>
            <MapView
              style={styles.productoMapa}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
            </View>
            <View style={styles.productoAuthor}>
                <View style={styles.titleItem}>
                  <View style={styles.item}>
                    <Image
                  source={{ uri: this.state.authorImg }}
                  style={styles.imagenItem}
                    />
                  </View>
                  <View style={styles.item}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>
                        {this.state.author.length > 20
                          ? this.state.author.substring(0, 20 - 3) + "..."
                          : this.state.author}
                      </Text>
                    </View>
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
                    {/* <TouchableOpacity onPress={() => this.borrar(item._id)}>
                    <Text>borrar</Text>
                  </TouchableOpacity> */}
                  </View>
                </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.crearUnChat(this.state.author,this.state.title)  }
              >
                <Text style={styles.buttonText}>CHAT</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonContainer2}
                onPress={() =>
                  this.setState({ ...this.state, product: undefined })
                }
              >
                <Text style={styles.buttonText2}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30
  },
  containerOneProduct: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 30,
  },
  containerProducts: {
    flex: 1,
    backgroundColor: "#34b5ba",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  productsTitle: {
    color: "whitesmoke",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold"
  },

  containerProduct: {
    backgroundColor: "#34b5ba",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 250,
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
    padding: 10,
    borderColor: "#34b5ba",
    borderRadius: 20,
    borderWidth: 1,
    height: 100
  },
  tituloBlanco: {
    color: "whitesmoke",
    fontSize: 20,
    fontWeight: "bold"
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
  titleItem: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    padding: 10,
    marginBottom: 5
  },
  itemDescription: {
    width: 250
  },
  imagenItem: {
    width: 78,
    height: 78,
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
    marginTop: 5,
    backgroundColor: "whitesmoke",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#34b5ba"
  },
  buttonX: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  productoAuthor: {
    marginTop: 20
  },
  buttonContainer: {
    marginTop: 15,
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
  buttonContainer2: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginBottom: 10
  },
  buttonText2: {
    color: "black",
    textAlign: "center",
    fontWeight: "700"
  }
});
