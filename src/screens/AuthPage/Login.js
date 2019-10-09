/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { Button, Toast } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            invalidEmailError: false,
            userNotFoundError: false,
            wrongPasswordError: false,
            isLoading: false,
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = async () => {
        this.setState({isLoading: true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( async (result) =>{
                await firebase.database().ref('users/' + result.user.uid).update({ status: 'online' })
                AsyncStorage.setItem('uid', result.user.uid)
                AsyncStorage.setItem('name', result.user.displayName)
                AsyncStorage.setItem('image', result.user.image)
                this.setState({isLoading: false})
                this.props.navigation.navigate('Tabs')
            })
            .catch(error => {
                this.setState({isLoading: false})
                console.log(error)
                // this.setState({ errorMessage: JSON.stringify(error) })
                if(error.code == 'auth/invalid-email'){
                    this.setState({ invalidEmailError: true })
                } else if(error.code == 'auth/user-not-found'){
                    this.setState({ userNotFoundError: true })
                } else if(error.code == 'auth/wrong-password'){
                    this.setState({ wrongPasswordError: true })
                }
            })
    }

    render() {
        return(
            <View behavior="padding" style={styles.Wrapper}>
                <View style={styles.bodyWrapper}>
                    <View >
                        <Text style={styles.SignInTitle}>Welcome to{'\n'}MaChat!</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='Email'
                            keyboardType='email-address'
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            value={this.state.phone}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'email', text )}
                        />
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            value={this.state.name}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'password', text )}
                        />
                        {
                            this.state.invalidEmailError ? <Text>Please input right email!</Text> :
                            this.state.wrongPasswordError ? <Text>Email/Password is wrong!</Text> :
                            this.state.userNotFoundError ? <Text>User doesn't exist! please register first!</Text> : <Text></Text>
                        }
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button style={styles.SignInButton} dark title='Login' onPress={() => this.handleSubmit()} >
                        {this.state.isLoading?
                            <ActivityIndicator color='white' />
                        :
                            <Text style={{color:'white'}}>Login</Text>
                        }
                        </Button>
                    </View>
                    
                </View>
                <View style={styles.footerWrapper}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'black'}} >Don't have an account? </Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')} activeOpacity={0.85} >
                            <Text style={styles.text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    Wrapper : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#207561'
    },
    bodyWrapper: {
        flex: 6,
        justifyContent: 'center',
    },
    footerWrapper: {
        display: 'flex',
        flex: 1,
        // flexDirection: 'row',
    },
    SignInTitle: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#e3dac9',
        paddingBottom: 50
    },
    inputField: {
        width: 280,
        color: 'white',
        borderColor: 'white',
        marginTop: 5
    },
    SignInButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:5,
        backgroundColor: "#e6a400",
    },
    text :{
        color: '#e3dac9',
        fontSize: 13,
    },
})

export default LoginScreen