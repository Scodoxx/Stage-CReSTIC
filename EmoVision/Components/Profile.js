//Profile.js
//L'utilisateur va pouvoir visualiser ses informations

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class Profile extends React.Component {

    state = {
        uid: '', //id unique de firebase
        firstname: '', //prénom
        name: '', //nom
        email: '', //mail
        birthdate: '', //date de naissance
        genre: '', //genre
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const utilisateur = firebase.auth().currentUser
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })

        console.log(utilisateur)
    }

    render() {
        return(
            <View>
                <View>
                    <Text>Identité</Text>
                    <Text></Text>
                </View>

                <View>
                    <Text>Date de naissance</Text>
                    <Text>{this.state.birthdate}</Text>
                </View>

                <View>
                    <Text>Email</Text>
                    <Text>{this.state.email}</Text>
                </View>

                <TouchableOpacity style={buttons.button} onPress={() => this.props.navigation.navigate("Modifier le profil")}>
                    <Text style={buttons.button_text}>Modifier des informations</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default Profile