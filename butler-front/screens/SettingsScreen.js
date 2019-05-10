import React from "react";
import { View, Text } from "react-native";
import PrivateProfile from "../components/PrivateProfile";
import Axios from "axios";
import Photo from "../components/Photo";


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  _hadleLogout = () =>{ this.props.navigation.navigate("Splash"); Axios.get("https://butler-back.herokuapp.com/api/auth/logout")};

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // {/* <ExpoConfigView /> */}
    return (
      <View>
        <PrivateProfile press={this._hadleLogout}/>
        <Photo style={{height:400}}/>
      </View>
    );
  }
}
