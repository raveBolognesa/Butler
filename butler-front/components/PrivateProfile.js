import React, { Component } from "react";
import { Text, View, 
  TextInput,TouchableOpacity } from "react-native";
import { WebBrowser } from "expo";
import Touchable from "react-native-platform-touchable";
import Axios from "axios";

export default class PrivateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: undefined,
      bill: undefined
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
  
  pagar(){
    this.setState({...this.state,bill: "test"});
    var precio = this.state.price;
    Axios.post("https://butler-back.herokuapp.com/api/doPayment/",{
    amount: +precio,
    tokenId: "tok_visa"}).then(res=> this.setState({...this.state,bill: res.data.receipt_url}) ).catch(err => this.setState({...this.state, error: "Authentication error" }));

  };
  link(e){
    WebBrowser.openBrowserAsync(e);
  }
  componentDidMount() {
    this.cogerCervezas();
  }
  render() {
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
            onChangeText={text => this.setState({...this.state, price: text })}
            placeholder="money"
            placeholderTextColor="rgba(225,225,225,0.9)"
          />
          <Touchable
            onPress={() => this.pagar()}
          >
            <Text >Pagar</Text>
          </Touchable>

        <View>
          <Touchable onPress={()=>this.link(this.state.bill)}>
          <Text>factura {this.state.bill}</Text>
          </Touchable>
          <Text>precio {this.state.price}</Text>
          <Text>error {this.state.error}</Text>
        </View>
      </View>
    );
  }
  _handlePressSlack = () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };
  _hadleLogout = () =>    this.props.navigation.navigate("Signup");;
  
}
