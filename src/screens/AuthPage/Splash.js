/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  ImageBackground,
  StyleSheet,
  StatusBar,
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
      // <View style={styles.viewStyles}>
      //   <ImageBackground
      //     source={require('../../assets/background-img2.jpg')}
      //     style={{width: '100%', height: '100%'}}>
      //     <Image
      //       source={require('../../assets/logo.png')}
      //       style={{width: 150, height: 150, marginBottom: 10}}
      //     />
      //     <Text style={{color: '#d0d0d0', fontSize: 25, fontWeight: 'bold'}}>
      //       chat.io
      //     </Text>
      //   </ImageBackground>
      // </View>

      <View style={styles.container}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <ImageBackground
          source={require('../assets/background-splash.png')}
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

// const styles = {
//   viewStyles: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#207561',
//   },
//   textStyles: {
//     color: 'white',
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
// };

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
    color: 'black',
    opacity: 0.6,
    fontSize: 40,
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 5,
    fontStyle: 'italic',
  },
});

export default SplashScreen;
