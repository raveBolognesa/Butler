import React, { Component } from "react";
import Axios from "axios";
import {
  SectionList,
  FlatList,
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
    width: 220
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
  itemHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  itemPrice: {
    color: "#969696",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: []
    };
  }
  borrar(x) {
    Axios.post(
      `https://butler-back.herokuapp.com/api/products/${x}/delete`,
      x
    ).then(res => this.traerProductos());
  }

  traerProductos() {
    Axios.get("https://butler-back.herokuapp.com/api/products/losproductos").then(
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
    return (
        <ScrollView style={{padding:10}}>
          <SectionList
            sections={[
              {
                data: datos
              }
            ]}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>this.props.openProduct(item._id)} >
              <View style={styles.titleItem}>
                  <View style={styles.item}>
                    <Image
                  source={{ uri: item.imgProduct }}
                  style={styles.imagenItem}
                    />
                  </View>
                  <View style={styles.item}>
                    <View style={styles.itemHeader}>
                    <View>

                      <Text style={styles.itemTitle}>
                        {item.title.length > 14
                          ? item.title.substring(0, 14 - 3) + "..."
                          : item.title}
                      </Text>
                    </View>
                      <View>

                      <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
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
    );
  }
}
