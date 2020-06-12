//FamilleEmotion.js
//L'utilisateur va pouvoir sélectionner une famille d'émotion qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'

//Style
import { buttons } from '../styles'

//Redux
import { connect } from 'react-redux'

//On récupère la largeur de l'écran
const windowWidth = Dimensions.get('window').width;

//Base de données
import *  as firebase from 'firebase'

class FamilleEmotions extends React.Component {

    state = {
        tableauDesFamilles: [], //tableau qui comprends toutes les familles d'émotions
        nombreFamilles: 0,
        emotions: this.props.emotions //émotions sélectionnées
    }

    //Permet de récupérer les informations de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const familles = firebase.database().ref('familles')

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, qu'on va ensuite faire correspondre aux states du component
        var promise = new Promise((resolve) => {
            familles.on("value", function(snapshot) {
                var json = snapshot.toJSON()
                var nombreFamilles = Object.keys(json).length
                that.setState({ nombreFamilles: nombreFamilles })
                resolve(that.state.nombreFamilles)
            })
        })

        promise.then(() => {
            const tableauDesFamilles = []
            for(var i = 0; i < this.state.nombreFamilles; i++) {
                firebase.database().ref(`familles/${i}`).on("value", function(snapshot) {
                    var json = snapshot.toJSON()
                    tableauDesFamilles.push(json.libelle)
                })
            }
            //On rempli le tableau et cela va actualiser le render
            that.setState({ tableauDesFamilles: tableauDesFamilles })
        })

    }

    _emotionIsSet() {
        if (typeof this.props.emotions === 'undefined') {
            var nombreEmotionsChoisies = 0
        }
        else{
            var nombreEmotionsChoisies = Object.keys(this.props.emotions).length
        }
        if(nombreEmotionsChoisies > 0) {
            return(
                <TouchableOpacity style={[buttons.button, {alignSelf: 'flex-end', marginBottom: 20, marginRight: 20}]} onPress={() => this.props.navigation.navigate("Quelle émotion ?")}>
                    <Text style={buttons.button_text}>Ok</Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <Text style={{alignSelf: 'flex-start', marginLeft: 20, width: '70%'}}>Veuillez sélectionner au moins une émotions parmis les différentes familles ci-dessus.</Text>
            )
        }
    }

    render() {
        let familles = this.state.tableauDesFamilles.map((famille, i) => {
            return  <TouchableOpacity style={[buttons.famille_button, {marginBottom: 30}]} key={i} onPress={() => this.props.navigation.navigate(famille)}>
                        <Text style={buttons.button_text}>{famille}</Text>
                    </TouchableOpacity>
        })
        return(
            <View style={[styles.main_container, {marginTop: 20}]}>
                <ScrollView style={{width: '100%'}}>
                    {familles}
                    {this._emotionIsSet()}
                </ScrollView>
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

const mapStateToProps = state => {
    return {
        emotions: state.toggleEmotion.emotions
    }
}

export default connect(mapStateToProps)(FamilleEmotions)