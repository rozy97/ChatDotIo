import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Item, Input } from 'native-base'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

class EditScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: props.navigation.getParam('display'),
            item: props.navigation.getParam('item'),
            value: props.navigation.getParam('value'),
            uid: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        await AsyncStorage.getItem('uid')
        .then( (value) => {
            this.setState( { uid: value} )
        })
    } 

    handleSave = async () => {
        this.state.item == 'fullname' ?
        await firebase.database().ref('users/' + this.state.uid).update({  fullname: this.state.value })
            .then( () => this.props.navigation.navigate('Profile') )
        :
        await firebase.database().ref('users/' + this.state.uid).update({  statusmessage: this.state.value })
            .then( () => this.props.navigation.navigate('Profile') )
    }

    render() {

        return(
            <View style={{flex: 1}}>
                <View style={{height: 52, backgroundColor: '#353839', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15, fontFamily: 'Roboto', marginLeft: 10}}>{this.state.display}</Text>
                </View>
                <View style={{flex: 1, marginTop: 60}}>
                    <Item regular style={{ width: 380, marginLeft:15, }}>
                        <Input defaultValue={this.state.value} onChangeText={ (value) => this.setState({ value: value })} />
                    </Item>
                    <TouchableOpacity onPress={ () => this.handleSave() } style={{ height: 45, width: 380, justifyContent: 'center', alignItems: 'center', borderRadius:2 , marginTop: 20, marginLeft: 15, backgroundColor: "#207561" }} activeOpacity={0.9} >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default EditScreen