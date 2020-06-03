//Home.js
//Écran une fois que l'utilisateur est connecté

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Media Player
import MediaPlayer from './MediaPlayer'

import { audioRessentir } from '../pistesAudio'

class Home extends React.Component {

    state = {
        audio: audioRessentir
    }

    render() {
        return(
            <View style={styles.main_container}>
                
                <Text>Ressentez l'impact que cette situation émotionnelle a dans votre corps.</Text>

                <MediaPlayer currentIndex={0} audio={this.state.audio}></MediaPlayer>

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

export default Home