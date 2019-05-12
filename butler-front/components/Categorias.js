import React, { Component } from "react";
import {
  SectionList,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

const jamon = StyleSheet.create({
  categorias: {
    backgroundColor: "#34b5ba",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    height: 320
  },
  fondoblanco: {
    backgroundColor: "whitesmoke",
    height: 270,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    padding: 10
  },
  cambio: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#34b5ba",
    padding: 10,
    marginBottom: 5,
    marginLeft: 40,
    width: 320
  },
  items: {
    width: 106,
    height: 30,
    marginBottom: 5
  },
  producto: {},
  imagenProduto: {
    width: 75,
    height: 75
  },
  textoProduto: {}
});


const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    container2: {
      padding: 20
    },
    containerProduct: {
      width: 300,
      backgroundColor: "green",
      flex: 1,
      justifyContent: "center"
    },
    input: {
      width: 250,
      height: 40,
      backgroundColor: "rgba(225,225,225,0.2)",
      borderRadius: 20,
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
    },
    viewProducts: {
      marginTop: 5,
      paddingVertical: 10,
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#34b5ba",
      backgroundColor: "whitesmoke"
    },
    viewItem: {
      textAlign: "center",
      margin: 2,
      paddingVertical: 10,
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#34b5ba",
      backgroundColor: "whitesmoke"
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
    itemHeader: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      width: 200
    },
    itemPrice: {
      marginLeft: 20,
      color: "#969696",
      fontSize: 15,
      fontWeight: "bold"
    }
  });

export default class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campo: "products",
      productos: "m"
    };
  }

  traerProductos() {
    Axios.get("https://butler-back.herokuapp.com/api/products/all").then(
      res => {
        const producto = res.data;
        this.setState({
          ...this.state,
          productos: producto
        });
      }
    );
  }
  componentDidMount() {
    this.traerProductos();
  }

  render() {
    const datos = this.state.productos;

    if (this.state.campo === "products") {
      return (
        <View style={jamon.categorias}>
          <View style={jamon.cambio}>
            <TouchableOpacity
              style={jamon.items}
              onPress={() =>
                this.setState({ ...this.state, campo: "products" })
              }
            >
              <Text>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "buys" })}
            >
              <Text>buys</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "rating" })}
            >
              <Text>rating</Text>
            </TouchableOpacity>
          </View>
          <View style={jamon.fondoblanco}>
            <ScrollView>
              <SectionList
                sections={[
                  {
                    data: datos
                  }
                ]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.props.openProduct(item._id)}
                  >
                    <View style={styles.titleItem}>
                      <View style={styles.item}>
                        <Image
                          source={require("../assets/images/icon.png")}
                          style={styles.imagenItem}
                        />
                      </View>
                      <View style={styles.item}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.itemTitle}>
                            {item.title.length > 20
                              ? item.title.substring(0, 20 - 3) + "..."
                              : item.title}
                          </Text>

                          <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        <Text style={styles.itemDescription} numberOfLines={3}>
                          {item.description.length > 100
                            ? item.description.substring(0, 100 - 3) + "..."
                            : item.description}
                        </Text>
                        {/* <TouchableOpacity onPress={() => this.borrar(item._id)}>
                    <Text>borrar</Text>
                  </TouchableOpacity> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </View>
        </View>
      );
    } else if (this.state.campo === "buys") {
      return (
        <View style={jamon.categorias}>
          <View style={jamon.cambio}>
            <TouchableOpacity
              style={jamon.items}
              onPress={() =>
                this.setState({ ...this.state, campo: "products" })
              }
            >
              <Text>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "buys" })}
            >
              <Text>buys</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "rating" })}
            >
              <Text>rating</Text>
            </TouchableOpacity>
          </View>
          <View style={jamon.fondoblanco}>
            <ScrollView>
              <Text>buys</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={jamon.categorias}>
          <View style={jamon.cambio}>
            <TouchableOpacity
              style={jamon.items}
              onPress={() =>
                this.setState({ ...this.state, campo: "products" })
              }
            >
              <Text>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "buys" })}
            >
              <Text>buys</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={jamon.items}
              onPress={() => this.setState({ ...this.state, campo: "rating" })}
            >
              <Text>rating</Text>
            </TouchableOpacity>
          </View>
          <View style={jamon.fondoblanco}>
            <ScrollView>
              <Text>rating</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
              <Text>Productos</Text>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}
