/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  ImageBackground,
} from 'react-native';

class SplashScreen extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 20000),
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('AuthLoading');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <ImageBackground source={require('../../assets/background-img2.jpg')} style={{width:'100%',height:'100%'}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 150, height: 150, marginBottom: 10}}
          />
          <Text style={{color: '#d0d0d0', fontSize: 25, fontWeight: 'bold'}}>
            chat.io
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#207561',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
