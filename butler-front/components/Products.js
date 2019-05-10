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
    margin: 5,
    paddingVertical: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba",
    backgroundColor: "#34b5ba"
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
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    paddingVertical: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba",
    backgroundColor: "whitesmoke",
    fontSize: 40,
    fontWeight: "bold"
  },
  itemDescription: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "#34b5ba"
  },
  item: {
    width: 75,
    height: 75
  }
});

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: []
    };
  }
  borrar(x){
    Axios.post(`https://butler-back.herokuapp.com/api/products/${x}/delete`,x).then(res=>  this.traerProductos()  )
  }

  traerProductos() {
    Axios.get("https://butler-back.herokuapp.com/api/products/all").then(res => {
      const producto = res.data;
      this.setState({
        ...this.state,
        productos: producto
      });
    });
  }
  componentDidMount() {
    this.traerProductos();
  }

  render() {
    const datos = this.state.productos;
    return (
      <ScrollView>
        <View style={styles.viewProducts}>
          <SectionList
            sections={[
              {
                data: datos
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.viewItem}>
              <Text>Hola</Text>
                <View style={styles.titleItem}>
                  <Image
                    style={styles.item}
                    source={require("../assets/images/icon.png")}
                  />
                  <Text style={styles.item}>{item.price}</Text>
                  <Text style={styles.item}>{item.title}</Text>
                  <TouchableOpacity onPress={()=>this.borrar(item._id)}><Text>borrar{item._id}</Text></TouchableOpacity>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    );
  }
}
