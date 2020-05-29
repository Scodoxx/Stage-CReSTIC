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
        console.log(utilisateur)
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, qu'on va ensuite faire correspondre aux states du component
        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre })
        })
    }

    //On récupère le genre de la personne pour mettre la civilité à Monsieur, Madame ou vide
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
            <View style={styles.main_container}>
                <View>
                    <Text>Identité</Text>
                    <Text>{this._getCivilite(this.state.gender)} {this.state.firstname} {this.state.name.toUpperCase()}</Text>
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
    main_container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default Profile