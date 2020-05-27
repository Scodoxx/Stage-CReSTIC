//AppSettings.js
//L'utilisateur va pouvoir changer certains paramètres de l'application qui lui sont accessibles

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class AppSettings extends React.Component {

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName })
    }

    //Permet à l'utilisateur de se déconnecter (sera dans le menu déroulant plus tard)
    _signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        return(
            <View>
                <Text>Réglages de l'application</Text>

                <TouchableOpacity style={buttons.button}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>

                <TouchableOpacity style={buttons.button} onPress={this._signOutUser}>
                    <Text style={buttons.button_text}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default AppSettings