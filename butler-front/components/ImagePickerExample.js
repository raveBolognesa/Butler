import React from 'react';
import { Button, Image, View,Text } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>base---{this.state.base}</Text>
      <Text>url---{this.state.image}</Text>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: `data:image/png;base64,${this.state.base}` }} style={{ width: 200, height: 200 }} />}
      </View>
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
      this.setState({...this.state, image: result.uri,base: result.base64 });
    }
  };
}