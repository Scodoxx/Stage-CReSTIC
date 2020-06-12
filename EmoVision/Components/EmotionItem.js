//EmotionItem.js
//Différents types d'émotions

import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Checkbox from './Checkbox'

//Style
import { buttons } from '../styles'

//Base de données
import *  as firebase from 'firebase'

//Redux
import { connect } from 'react-redux'

class EmotionItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableauDesEmotions: [], //tableau qui comprends toutes les familles d'émotions
            nombreEmotions: 0,
            check: false, //L'élément est coché de base ou pas
            indexEmotion: this.props.indexEmotion //Correspond a une famille d'émotion (0: joie, 1: colère, 2: peur, 3: tristesse, 4: dégout, 5: surprise)
        }
    }

    //Permet de récupérer les informations de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const emotionIndex = this.props.emotions.findIndex(item => item.id === this.state.tableauDesEmotions.id)
        if (emotionIndex !== -1) {
            console.log(emotionIndex)
            this.setState({
                emotion: this.props.emotions[emotionIndex]
            })
            return
        }

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
                    //Ici je multiplie par 100 l'index pour qu'il ait au plus 100 possibilités d'émotions pour chaque famille
                    var idEmotion = 100*that.state.indexEmotion + i
                    //On va mapper le tableau des émotions choisies, si l'un des id correspond a un des id construit dans la liste, le "check" est marqué a vrai et on ne fait plus rien de le arrayMap
                    var isBroken = false
                    that.props.emotions.map((emotion, index) => {
                        if(!isBroken) {
                            var id = emotion.id
                            if(id === idEmotion) {
                                that.setState({check: true})
                                isBroken = true
                            }
                            else{
                                that.setState({check: false})
                            }
                        }
                    })
                    tableauDesEmotions.push({id: idEmotion, libelle: json.libelle, checked: that.state.check, checkAtTheEnd: false})
                })
            }
            //On rempli le tableau et cela va actualiser le render
            that.setState({ tableauDesEmotions: tableauDesEmotions })
        })

    }

    _toggleEmotion = (index) => {
        this.state.tableauDesEmotions[index].checked = !this.state.tableauDesEmotions[index].checked
        const action = { type: "TOGGLE_EMOTION", value: this.state.tableauDesEmotions[index] }
        this.props.dispatch(action)
    }

    render() {
        console.log(this.props.emotions)
        let emotions = this.state.tableauDesEmotions.map((emotion, index) => {
            return  <Checkbox
                        key={index}
                        label={emotion.libelle}
                        checked={emotion.checked}
                        onPress={() => this._toggleEmotion(index)}
                    />
        })
        return(
            <View style={styles.main_container}>
                <ScrollView>
                    {emotions}
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

const mapStateToProps = (state) => {
    return {
        emotions: state.toggleEmotion.emotions
    }
}
export default connect(mapStateToProps)(EmotionItem)