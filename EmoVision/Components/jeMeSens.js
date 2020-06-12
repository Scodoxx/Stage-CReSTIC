//jeMeSens.js
//L'utilisateur va choisir sur une échelle de 1 à 10 la sensation ressentie

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Style
import { buttons, titles } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class jeMeSens extends React.Component {

    state = {
        emotionFinale: this.props.emotionFinale, //émotion finale ressentie par l'utilisateur
        sliderEmotion: 0 //valeur du slider pour l'émotion
    }

    _sliderIsChanged = (values) => {
        this.setState({ sliderEmotion: values })
    }

    _sliderIsChangedFinish = () => {
        this.setState({ isChanged: true })
    }

    _moodIsSet() {
        if(this.state.isChanged) {
            return (
                <TouchableOpacity style={buttons.button} onPress={this._buttonIsPressed}>
                        <Text style={buttons.button_text}>OK</Text>
                </TouchableOpacity>
            )
        }
    }

    //Appelée quand on appuie sur le bouton pour passer à la page suivante
    _buttonIsPressed = () => {
        const action = { type: 'GET_DEGRE_EMOTION', value: this.state.sliderEmotion }
        this.props.dispatch(action)
        this.props.navigation.navigate("Perception")
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {
        return(
            <View style={styles.main_container}>
                <Text style={titles.title_2}>{this.state.emotionFinale}</Text>

                <View>
                    <Text>{this.state.sliderEmotion}</Text>
                    <MultiSlider
                        trackWidth = {300}
                        vertical={true}
                        value={this.state.sliderEmotion}
                        min={0}
                        max={10}
                        step={1}
                        defaultTrackColor = {'#3F9BAF'}
                        onValuesChange = {(values) => this._sliderIsChanged(values)}
                        onValuesChangeFinish = {this._sliderIsChangedFinish}
                    />
                </View>

                <View>
                    {this._moodIsSet()}
                </View>

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
        emotionFinale: state.toggleEmotion.emotionFinale,
        sliderEmotion: state.getSliderValue.sliderEmotion,
        emotions: state.toggleEmotion.emotions
    }
}
export default connect(mapStateToProps)(jeMeSens)