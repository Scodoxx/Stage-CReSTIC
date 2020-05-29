//Profile.js
//L'utilisateur va pouvoir visualiser ses informations

import React, { useReducer } from 'react'
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
        gender: '', //genre
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre })
            //this.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre })
        })
    }

    _getCivilite(genre) {
        if (genre === 'H') {
            return 'Mr'
        }
        if (genre === 'F') {
            return 'Mme'
        }
        else {
            return;
        }
    }

    render() {
        return(
            <View>
                <View>
                    <Text>Identité</Text>
                    <Text>{this._getCivilite(this.state.gender)} {this.state.firstname} {this.state.name}</Text>
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