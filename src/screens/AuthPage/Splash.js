/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';

class SplashScreen extends Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
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
      <View style={styles.container}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <ImageBackground
          source={require('../../assets/background-img1.jpg')}
          style={styles.imageBackground}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoSplash}
            />
            <Text style={styles.title}>chat.io</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ecf4f3',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  logoSplash: {
    width: 300,
    height: 300,
  },
  title: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 8,
    fontStyle: 'italic',
    marginTop: -50,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
