//Joie.js
//Éùotions de la famille de la joie

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class Joie extends React.Component {

    state = {
        tableauDesEmotions: [], //tableau qui comprends toutes les familles d'émotions
        nombreEmotions: 0,
        indexEmotion: 0 //Correspond a la joie
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

export default Joie