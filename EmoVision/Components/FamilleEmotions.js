//FamilleEmotion.js
//L'utilisateur va pouvoir sélectionner une famille d'émotion qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

class FamilleEmotions extends React.Component {

    state = {
        tableauDesFamilles: [], //tableau qui comprends toutes les familles d'émotions
        nombreEmotions: 0
    }

    //Permet de récupérer les informations de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const familles = firebase.database().ref('familles')

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, qu'on va ensuite faire correspondre aux states du component
        familles.on("value", function(snapshot) {
            var json = snapshot.toJSON()
            var nombreEmotions = Object.keys(json).length
            that.setState({ nombreEmotions: nombreEmotions })
        })

        for(var i = 0; i < 6; i++) {
            firebase.database().ref(`familles/${i}`).on("value", function(snapshot) {
                var json = snapshot.toJSON()
                that.state.tableauDesFamilles.push(json.libelle)
            })
        }

    }

    render() {
        let familles = this.state.tableauDesFamilles.map((famille, i) => {
            return  <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate(famille)}>
                        <Text>{famille}</Text>
                    </TouchableOpacity>
        })
        return(
            <View style={styles.main_container}>
                {familles}
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

export default FamilleEmotions