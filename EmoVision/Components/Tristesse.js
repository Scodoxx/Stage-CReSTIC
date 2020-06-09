//Tristesse.js
//Émotions de la famille de la tristesse

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Les différents types d'émotions
import EmotionItem from './EmotionItem'

class Tristesse extends React.Component {

    //Le indexEmotion du component EmotionItem correspond à l'index de la famille d'émotion
    render() {
        return(
            <View style={styles.main_container}>
                <EmotionItem indexEmotion={3}/>
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

export default Tristesse