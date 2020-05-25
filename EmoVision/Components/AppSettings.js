//AppSettings.js
//L'utilisateur va pouvoir changer certains paramètres de l'application qui lui sont accessibles

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class AppSettings extends React.Component {

    //Permet à l'utilisateur de se déconnecter (sera dans le menu déroulant plus tard)
    _signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        return(
            <View>
                <Text>Réglages de l'application</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Valider les changements</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this._signOutUser}>
                    <Text style={styles.button_text}>Se déconnecter</Text>
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
    },
    button: {
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontStyle: 'normal',
        color: 'white',
        alignSelf: 'center'
    }
})

export default AppSettings