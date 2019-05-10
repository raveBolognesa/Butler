import React from 'react';
import { Button, Image, View,Text } from 'react-native';
import { ImagePicker,Permissions } from 'expo';


import {PermissionsAndroid} from 'react-native';



export default class Photo extends React.Component {
  state = {
    image: null,
  };
  jamon(){
    async function checkMultiPermissions() {
        const { Permissions } = Expo;
        const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
        if (status !== 'granted') {
          alert('Hey! You heve not enabled selected permissions');
        }
      }
      checkMultiPermissions()
    }
    componentDidMount(){
        this.jamon()
    }

  render() {
    let { image } = this.state;

    return (
      <View style={{width: 400, height: 400  }}>
      <Text>hola foto</Text>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
          />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <Text>hola foto</Text>
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}