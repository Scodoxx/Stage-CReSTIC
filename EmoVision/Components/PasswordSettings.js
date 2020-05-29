//PasswordSettings.js
//L'utilisateur va pouvoir changer son mot de passe

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons, inputs } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class PasswordSettings extends React.Component {

    state = {
        updated: false //le profil a été mis à jour au moins une fois
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

    //Empêche la déconexion après avoir changé un de ses log
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
                console.log("Le mot de passe a été mis à jour");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View>
                    <Text style={inputs.input_title}>Mot de passe actuel</Text>
                    <TextInput 
                        style={inputs.input}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ currentPassword: text })}
                        value={this.state.currentPassword}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_title}>Nouveau mot de passe</Text>
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