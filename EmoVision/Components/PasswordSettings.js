//PasswordSettings.js
//L'utilisateur va pouvoir changer son mot de passe

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'

//Style
import { buttons, inputs } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class PasswordSettings extends React.Component {

    state = {
        currentPassword: '', //mot de passe actuel
        newPassword: '' //mot de pass qui va être renseigné
    }

    //L'interface informe que le mot de passe sera mit à jour et demande confirmation
    _updateConfirm = () => {
        return(
            Alert.alert(
                "Attention",
                "Votre mot de passe va être modifié, vous ne serez pas déconnecté",
                [
                    {
                        text: "Annuler",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Continuer", onPress: this.onChangePasswordPress }
                ],
                { cancelable: false })
        )
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
                this.props.navigation.goBack()
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

export default PasswordSettings