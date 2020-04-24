//HomeScreen.js
//Écran d'accueil

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import *  as firebase from 'firebase'

class HomeScreen extends React.Component {

    //Email et nom de l'utilisateur
    state = {
        email: "",
        displayName: ""
    }

    //Permet de récupérer le nom et le mail de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName })
    }

    //Permet à l'utilisateur de se déconnecter
    _signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Bonjour {this.state.email}</Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this._signOutUser}>
                    <Text>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen