//Meditation.js
//Les audios de la méditation

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Media Player
import MediaPlayer from './MediaPlayer'

//On récupère la piste de tout les audios dans le fichier pistesAudio.js à la racine du projet
import { audioMeditation } from '../pistesAudio'

//Style
import { buttons, inputs } from '../styles'

class Meditation extends React.Component {

    state = {
        audio: audioMeditation
    }

    render() {
        return(
            <View style={styles.main_container}>

                <View style={{backgroundColor: 'blue', borderRadius: 20, width: 20, height: 20}}/>

                <MediaPlayer audio={this.state.audio}></MediaPlayer>

                <TouchableOpacity style={buttons.button}>
                    <Text style={buttons.button_text} onPress={() => this.props.navigation.navigate("") }>Suivant</Text>
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
    }
})

export default Meditation