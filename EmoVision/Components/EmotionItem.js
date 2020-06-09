//EmotionItem.js
//Différents types d'émotions

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class EmotionItem extends React.Component {

    state = {
        tableauDesEmotions: [], //tableau qui comprends toutes les familles d'émotions
        nombreEmotions: 0,
        indexEmotion: this.props.indexEmotion //Correspond a une famille d'émotion (0: joie, 1: colère, 2: peur, 3: tristesse, 4: dégout, 5: surprise)
    }

    //Permet de récupérer les informations de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const emotions = firebase.database().ref(`familles/${this.state.indexEmotion}/emotions`)

        //On lance une promesse pour que les émotions soient récupérées seulement quand on connait leurs nombre total
        var promise = new Promise((resolve) => {
            emotions.on("value", function(snapshot) {
                var json = snapshot.toJSON()
                var nombreEmotions = Object.keys(json).length
                that.setState({ nombreEmotions: nombreEmotions })
                resolve(that.state.nombreEmotions)
            })
        })
            
        //On récupère toutes les émotions pour la famille correspondante
        promise.then(() => {
            const tableauDesEmotions = []
            for(var i = 0; i < this.state.nombreEmotions; i++) {
                firebase.database().ref(`familles/${this.state.indexEmotion}/emotions/${i}`).on("value", function(snapshot) {
                    var json = snapshot.toJSON()
                    tableauDesEmotions.push(json.libelle)
                })
            }
            //On rempli le tableau et cela va actualiser le render
            that.setState({ tableauDesEmotions: tableauDesEmotions })
        })

    }

    render() {
        let emotions = this.state.tableauDesEmotions.map((emotion, i) => {
            return  <View key={i}>
                        <Text>{emotion}</Text>
                    </View>
        })
        return(
            <View style={styles.main_container}>
                {emotions}
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

export default EmotionItem