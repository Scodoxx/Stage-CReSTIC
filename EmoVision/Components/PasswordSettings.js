//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons, inputs } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class PasswordSettings extends React.Component {

    state = {
        uid: '', //id unique de firebase
        updated: false //le profil a été mis à jour au moins une fois
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })
    }

    //L'interface informe que les données ont été mises à jour
    _hasBeenUpdated() {
        if(this.state.updated) {
            return(
                <Text style={{ color: '#3C7F3A' }}>Les données ont bien été mises à jour !</Text>
            )
        }
        else {
            return;
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }


    //Mettre à jour le et mot de passe
    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }
    
    //Mettre à jour le et mot de passe
    changeEmail(currentPassword, newEmail) {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
            }).catch((error) => { error.message });
        }).catch((error) => { error.message });
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View>
                    <Text style={inputs.input_tilte}>Mot de passe actuel</Text>
                    <TextInput 
                        style={inputs.input}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ currentPassword: text })}
                        value={this.state.currentPassword}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Nouveau mot de passe</Text>
                    <TextInput 
                        style={inputs.input}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                        value={this.state.newPassword}
                    ></TextInput>
                </View>

                <TouchableOpacity style={buttons.button} onPress={this.onChangePasswordPress}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>
                {this._hasBeenUpdated()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.5,
        padding: 10,
        justifyContent: 'space-around'
    }
})

export default PasswordSettings