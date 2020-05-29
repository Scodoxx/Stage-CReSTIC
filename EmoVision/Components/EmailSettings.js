//EmailSettings.js
//L'utilisateur va pouvoir changer son adresse email

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'

//Style
import { buttons, inputs } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class EmailSettings extends React.Component {

    state = {
        currentPassword: '' //mot de passe actuel
    }

    //L'interface alrte l'utilisateur que l'adresse mail sera mise à jour et demande confirmation
    _updateConfirm = () => {
        return(
            Alert.alert(
                "Attention",
                "Votre adresse mail va être modifiée, vous ne serez pas déconnecté",
                [
                    {
                        text: "Annuler",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Continuer", onPress: this.onChangeEmailPress }
                ],
                { cancelable: false })
        )
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    
    //Mettre à jour l'adresse mail
    onChangeEmailPress = (currentPassword, newEmail) => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                console.log("Le mail a été mis à jour");
                this.props.navigation.goBack()
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View>
                    <Text style={inputs.input_title}>Nouvelle adresse mail</Text>
                    <TextInput 
                        style={inputs.input}
                        keyboardType="email-address"
                        onChangeText={(text) => this.setState({ newEmail: text })}
                        value={this.state.newEmail}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_title}>Mot de passe actuel</Text>
                    <TextInput 
                        style={inputs.input}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ currentPassword: text })}
                        value={this.state.currentPassword}
                    ></TextInput>
                </View>

                <TouchableOpacity style={buttons.button} onPress={this._updateConfirm}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>
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

export default EmailSettings