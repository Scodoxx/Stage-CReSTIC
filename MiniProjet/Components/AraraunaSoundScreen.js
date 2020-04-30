//AraraunaSound.js
//Écran d'accueil

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
//Pour le lecteur de son
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit'
//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

class AraraunaSoundScreen extends React.Component {

    render() {

        return (

            <View style={styles.main_container}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <Text>Chant de l'Ararauna</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        position: "absolute",
        top: 48,
        left: 28,
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: "rgba(21, 22, 48, 0.7)",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default AraraunaSoundScreen