import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SectionList,
  Image
} from "react-native";
import Chats from "../components/Chats";
import Chat from "../components/Chat";
import Axios from "axios";
import io from 'socket.io-client';

import styled from "styled-components/native";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.chatArea = ""
    this.state = {
      height: 40,
      soy: "x",
          jamon:{
            message:""
          },
      // chat:"zz",
      // message: "m",
      // time:1
      products: [],
      mensaje: ""
    };

    /** 2. connect to server **/
    this.socket = io("https://butler-back.herokuapp.com/" + this.state.id)
  }
  static navigationOptions = {
    header: null
  };
  // mandarMensaje(){
  //   this.setState({...this.state,chat: this.state.message})
  // }

  traerProductos(x) {

    Axios.get("https://butler-back.herokuapp.com/api/auth/currentuser")
      .then(miau=>{
        const birra = miau.data.username;

        Axios.get("https://butler-back.herokuapp.com/sock/allchats")
          .then(
          res => {
            const producto = res.data;
            this.setState({
              ...this.state,
              products: producto,
              id: x,
              soy: birra,
              jamon:{
                message:""
              }
            });
          }
        );
    });
  }

  cargarUnChat(x){
    Axios.get(`https://butler-back.herokuapp.com/sock/${x}/oneChat`).then(
      res => {
        const producto = res.data;
        this.setState({
          ...this.state,
          jamon: producto,
          id: x
        });
      }
    );
  }
  cargarUnChat2(x){
    Axios.get(`https://butler-back.herokuapp.com/sock/${x}/oneChat`).then(
      res => {
        const producto = res.data;
        this.setState({
          ...this.state,
          jamon: producto
        });
      }
    );
  }
  mandarUnMensaje(x){
    Axios.post(`https://butler-back.herokuapp.com/sock/chat/${x}/addmesage`,{newmesage:{elmensaje:this.state.mensaje,lomando: this.state.soy}}).then(res=>{
      const producto = res.data;
      this.socket.emit("messageSent", "mensaje");

        this.setState({
          ...this.state,
          jamon: producto,
          id: x});
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    var itemId = navigation.getParam("id");
    if(itemId){
      this.crearUnChat(itemId)
    }
    if(this.state.counter === "a"){
      itemId = "";
    }

    this.traerProductos(itemId);

    this.socket.on("newMessage", message =>{
      this.cargarUnChat(this.state.id);message;
    });

    // setInterval(()=>{
    //   Axios.get("https://butler-back.herokuapp.com/allRooms").then(res =>this.setState({...this.state,chat: Object.keys(res.data),time: this.state.time +=1}));
    // },1000)
  }
  componentDidUpdate(){

  }
  componentWillReceiveProps(){

    const { navigation } = this.props;
    var itemId = navigation.getParam("id");
    if(itemId){
      this.crearUnChat(itemId);
      this.traerProductos(itemId);
      this.cargarUnChat(itemId);

    }


    this.socket.on("newMessage", message =>{
      this.cargarUnChat(this.state.id);
    });
  }

  changeHeight(x) {
    const altura = this.state.mensaje.length;
    altura > 30
      ? this.setState({ ...this.state, height: 80, mensaje: x })
      : this.setState({ ...this.state, height: 40, mensaje: x });
  }
  crearUnChat(x){
    Axios.post("https://butler-back.herokuapp.com/sock/newRoom",{message:["Escribe"] , speaker: "otro", product: x})
      .then(res=> Promise.resolve(res.data.chatData._id))
      .then(id => this.setState({
        ...this.state,
        id: id
      }), ()=>{this.cargarUnChat(id)})
  }

  render() {
    
    const mismensajes = this.state.jamon.message;
    const datos = this.state.products;
    console.log(this.state.id)
    if (this.state.id) {
      this.cargarUnChat2(this.state.id);
      return (
                      <ScrollView style={{ flex:1}}>
        <View style={styles.superpadre}>

          <View
            style={{
              backgroundColor: "#34b5ba",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#34b5ba",

            }}
          >
              <View>
              <View style={styles.mensajes}>
                  <View  style={{ width: 300, height: 20 ,paddingLeft:5}}>
                    <Text style={{color:"white",fontWeight:"bold"}}>{this.state.id}</Text>
                  </View>
                  <View  style={{ width: 40, height: 20,paddingRight:5 }}>
                    <TouchableOpacity
                      style={{ width: 40, height: 40 }}
                      onPress={() =>
                        this.setState({ ...this.state, id: ""})
                      }
                    >
                      <Text>Exit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            <View style={styles.padre}>
                      <View style={{ backgroundColor: "white",padding:5 ,borderRadius: 20,
                    borderWidth: 1,
                    height:550,
                    borderColor: "#34b5ba",}}>

              <ScrollView style={{ flex:1}}>
              <SectionList
                  sections={[
                    {
                      data: mismensajes
                    }
                  ]}
                  renderItem={({ item }) => {
                    var x = item.lomando;
                    if(x === this.state.soy){
                      return(
                        <Text style={styles.mensajesDerecha}>{item.elmensaje}</Text>
                        )
                        
                      }else{
                        return(
                          <Text style={styles.mensajesIzquierda}>{item.elmensaje}</Text>

                      )
                    }
                    }}
                  keyExtractor={(item, index) => index}
                />

                
              </ScrollView>
                      </View>
            </View>
            <View style={{marginBottom:40}}>
              <View style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,

              }}>
                <TextInput
                  multiline
                  style={{
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#34b5ba",
                    marginBottom: 10,
                    padding: 10,
                    color: "black",
                    maxWidth: 270
                  }}
                  autoCapitalize="none"
                  onChangeText={text => {
                    this.changeHeight(text);
                  }}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  placeholder="Mensaje                                                ."
                  placeholderTextColor="rgba(225,225,225,0.9)"
                  maxLength={100}
                />

                <TouchableOpacity style={styles.buttonContainer}
                onPress={()=>this.mandarUnMensaje(this.state.id)}
                >
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        </ScrollView >

      );
    } else {
      return (
        <View style={styles.container3}>
          <View style={styles.containerProducts3}>
            <Text style={styles.productsTitle3}>Chats</Text>
            <View style={styles.viewProducts}>
              <ScrollView>
                <SectionList
                  sections={[
                    {
                      data: datos
                    }
                  ]}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.cargarUnChat(item._id)
                      }
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
                          <Text
                            style={styles.itemDescription}
                            numberOfLines={3}
                          >
                            {item.message[item.message.length]}
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
        </View>
      );
    }

    //   if(this.state.chat.includes(this.state.message)){
    //     return(
    //     <ScrollView style={styles.container}>
    //       {/* Go ahead and delete ExpoLinksView and replace it with your
    //          * content, we just wanted to provide you with some helpful links */}

    //       <Chat chat={this.state.chat}/>
    //       <Text >chat: {this.state.chat}</Text>
    //       <Text >message: {this.state.message}</Text>
    //       <Text >time: {this.state.time}</Text>
    //       <TouchableOpacity onPress={(text)=>this.setState({...this.state,message: "fuera"}) }>
    //         <Text>adios</Text>
    //       </TouchableOpacity>
    //     </ScrollView>
    //     )}else{
    //   return (
    //     <ScrollView style={styles.container}>
    //       {/* Go ahead and delete ExpoLinksView and replace it with your
    //          * content, we just wanted to provide you with some helpful links */}
    //       <Chats/>

    //       <TextInput
    //         onChangeText={(text)=>this.setState({...this.state,message: text}) }
    //         placeholder="Password"

    //       />
    //   <TouchableOpacity
    //     onPress={() => this.mandarMensaje()}
    //   >
    //     <Text >chat: {this.state.chat}</Text>
    //     <Text >message: {this.state.message}</Text>
    //     <Text >time: {this.state.time}</Text>

    //   </TouchableOpacity>
    //     </ScrollView>
    //   );}
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  cabeceraChats: {},
  container3: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    marginBottom: 80
  },
  superpadre: {
    padding: 10,
    flex: 1,
    paddingTop: 40,
  },
  padre: {},
  containerProducts3: {
    backgroundColor: "#34b5ba",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  productsTitle3: {
    color: "whitesmoke",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold"
  },
  mensajes: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20
  },
  mensajes2: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20
  },
  containerprincipal: {
    padding: 20,
    marginTop: 10
  },

  containerProducts: {
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
    fontWeight: "bold"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  ScrollView: {
    backgroundColor: "whitesmoke",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  ScrollView3: {
    marginTop: 40,
    height: 450,
    backgroundColor: "whitesmoke",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34b5ba"
  },
  cabeceraMensajes: {
    flex: 1,
    flexDirection: "row",
    width: 370,
    height: 40,
    justifyContent: "space-around",
    alignItems: "center"
  },
  titleMensajes: {
    fontSize: 20,
    color: "whitesmoke",
    fontWeight: "bold"
  },
  mensajesDerecha: {
    color: "#34b5ba",
    padding: 5,
    textAlign: "right"
  },
  mensajesIzquierda: {
    padding: 5,
    textAlign: "left"
  },
  buttonContainer: {
    height: 40,
    marginLeft: 20,
    backgroundColor: "#34b5ba",
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
  altura: {
    height: 520,
    marginTop: 10
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
    width: 200
  },
  itemPrice: {
    marginLeft: 20,
    color: "#969696",
    fontSize: 15,
    fontWeight: "bold"
  }
});

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #34b5ba;
  border: 1px solid #34b5ba;
  border-radius: 20px;
`;
