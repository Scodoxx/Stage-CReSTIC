//QuellEmotion.js
//L'utilisateur doit choisir entre les différentes émotions qu'il a pu sélectionner

import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Checkbox from './Checkbox'
import { connect } from 'react-redux'

//Style
import { buttons } from '../styles'

class QuelleEmotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            emotions: this.props.emotions, //Tableau des émotions sélectionnées auparavant
            emotionFinale: ""
        }
    }

    _chooseEmotion = (index) => {
        this.state.emotions.map((emotion, index) => {
            emotion.checkAtTheEnd = false
        })
        this.state.emotions[index].checkAtTheEnd = !this.state.emotions[index].checkAtTheEnd
        this.setState({emotionFinale: this.state.emotions[index].libelle})
    }

    //L'utilisateur appuie sur le bouton
    _buttonIsPressed = () => {
        const action = { type: 'GET_EMOTION_FINALE', value: this.state.emotionFinale }
        this.props.dispatch(action)
        this.props.navigation.navigate("Je me sens")
    }

    render() {
        console.log(this.props.emotions)
        let selectedEmotions = this.state.emotions.map((emotion, index) => {
            return  <Checkbox
                        key={index}
                        label={emotion.libelle}
                        checked={emotion.checkAtTheEnd}
                        onPress={() => this._chooseEmotion(index)}
                    />
        })
        return(
            <View style={styles.main_container}>
                <ScrollView>
                    <Text>Quelle émotion est la plus présente ?</Text>
                    {selectedEmotions}
                    <TouchableOpacity style={buttons.button} onPress={this._buttonIsPressed}>
                        <Text style={buttons.button_text}>Ok</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        emotions: state.toggleEmotion.emotions
    }
}

export default connect(mapStateToProps)(QuelleEmotion)