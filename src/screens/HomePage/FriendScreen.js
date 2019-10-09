/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'native-base';

class FriendScreen extends Component {

    state = {
        users: [],
        currentUser: {},
        uid: '',
        friendDropdown: true,
    }

    UNSAFE_componentWillMount = async () => {
        await AsyncStorage.getItem('uid').then(
            (uid) => this.setState({
                uid: uid
            })
        )

        firebase.database().ref('users/' + this.state.uid)
            .on('value', (value) => {
            this.setState({
                currentUser: value.val()
            })
        })

        let dbRef = firebase.database().ref('users')
        await dbRef.on('child_added', ( value ) => {
            let person = value.val()
            person.uid = value.key
            this.setState(( prevState ) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })
    }

    _renderRow = ({item}) => {
        if (item.uid != this.state.uid ){
            return (
                <TouchableOpacity style={styles.friendListContainer} onPress={ () => this.props.navigation.navigate('FriendProfile', {item: item}) } activeOpacity={0.5}>
                    <Image source={{uri: item.photo}} style={styles.friendImage} />
                    <View style={{paddingLeft: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 324}}>
                            <Text style={styles.friendName}>{item.fullname}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {
                                    item.status == 'online'? 
                                    <View style={styles.friendOnline}></View>:
                                    <View style={styles.friendOffline}></View>
                                }
                                <Text style={styles.friendStatus}>{item.status}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#ffffff40', fontSize:12}}>{item.statusmessage}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        let currentUser = this.state.currentUser
        return(
            <SafeAreaView style={styles.container}>
                <View style={{height: 52, backgroundColor: '#353839', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'Roboto', marginLeft: 10}}>Friends {this.state.users.length - 1}</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity style={styles.friendListContainer} onPress={ () => this.props.navigation.navigate('UserProfile', {item: currentUser}) } activeOpacity={0.5}>
                        <Image source={{uri: currentUser.photo}} style={styles.userImage} />
                        <View style={{paddingLeft: 10, paddingTop: 10 }}>
                            <Text style={styles.friendName}>{currentUser.fullname}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{ color: '#ffffff40', fontSize:11}}>{currentUser.statusmessage}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={ () => {this.setState({ friendDropdown: !this.state.friendDropdown })}}>
                        <View style={{ height: 27, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center'}}>
                            <Text style={{fontSize: 15, color: 'grey', paddingLeft: 12,}}>Friends {this.state.users.length - 1}</Text>
                            { !this.state.friendDropdown ? 
                                <Icon type='Ionicons' name='ios-arrow-down' style={{ color: 'grey', fontSize: 18, paddingRight: 11}} />
                                :
                                <Icon type='Ionicons' name='ios-arrow-up' style={{ color: 'grey', fontSize: 18, paddingRight: 11}} />
                            }
                        </View>
                    </TouchableOpacity>
                    {this.state.friendDropdown ?
                        <FlatList 
                            data={this.state.users}
                            renderItem={this._renderRow}
                            keyExtractor={ (item) => item.username }
                        />
                        :
                        <Text></Text>
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#353839',
        flex: 1,
        flexDirection: 'column'
    },
    searchInput: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 40,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    inputContainer: {
        backgroundColor: '#E5E6EE20',
        height: 31,
    },
    friendListContainer: {
        // padding: 10,
        paddingBottom: 15,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50
    },
    friendImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    friendName: {
        fontSize: 13,
        color: 'white',
    },
    friendOnline: {
        height: 7,
        width: 7,
        backgroundColor: '#207561',
        borderRadius: 50,
    },
    friendOffline: {
        height: 7,
        width: 7,
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    friendStatus: {
        fontSize: 12,
        color: 'grey',
        paddingLeft: 5,
    },
})

export default FriendScreen