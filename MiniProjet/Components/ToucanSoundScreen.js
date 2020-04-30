//AraSound.js
//Écran d'accueil

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
//Pour le lecteur de son
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit'
//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

//On récupère l'audio du chant
const getAudio = require("../Audio/Toucan.mp3")

class ToucanSoundScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        };
    }

    /*
    //On lance l'audio quand la personne clique sur le bouton
    _onPress() {
        // Disable button while recording and playing back
        this.setState({disabled: true});

        // Start recording
        let rec = new Recorder(getAudio).record();

        // Stop recording after approximately 3 seconds
        setTimeout(() => {
            rec.stop((err) => {
                // NOTE: In a real situation, handle possible errors here

                // Play the file after recording has stopped
                new Player(getAudio)
                .play()
                .on('ended', () => {
                    // Enable button again after playback finishes
                    this.setState({disabled: false});
            });
            });
        }, 3000);
    }
    */

    render() {

        return (
            <View style={styles.main_container}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <TouchableHighlight disabled={this.state.disabled} onPress={() => this._onPress()}>
                    <Text>
                        Press me!
                    </Text>
                </TouchableHighlight>
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

export default ToucanSoundScreen