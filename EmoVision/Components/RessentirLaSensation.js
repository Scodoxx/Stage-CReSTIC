//RessentirLaSensation.js
//On demande l'utilisateur si il a déjà ressenti la sensation qu'il a renseigné avant

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Redux
import { connect } from 'react-redux'

//Style
import { buttons } from '../styles'

class RessentirLaSensation extends React.Component {

    state= {
        dejaRessenti: false //l'utilisateur a déjà ressentie ou non cette sensation
    }

    //Si l'utilisateur appuie sur le bouton "Non", dejaRessenti est égal a false et sera stocké dans le store
    _noIsPressed = () => {
        this.setState({dejaRessenti: false})
        const action = { type: 'SET_DEJA_RESSENTI', value: this.state.dejaRessenti }
        this.props.dispatch(action)
        this.props.navigation.navigate("Perception")
    }

    _noIsPressed = () => {
        this.setState({dejaRessenti: true})
        const action = { type: 'SET_DEJA_RESSENTI', value: this.state.dejaRessenti }
        this.props.dispatch(action)
        this.props.navigation.navigate("Perception")
    }

    render() {
        return(
            <View style={styles.main_container}>
                
                <Text>Repensez à la situation qui a fait émerger cette émotion :</Text>
                <Text>Ressentez la sensation corporelle qu'elle sucite</Text>
                <Text>Avez-vous déjà ressenti cette sensation corporelle avant aujourd'hui ?</Text>

                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={() => this.props.navigation.navigate("Question") }>Oui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={this._noIsPressed}>Non</Text>
                    </TouchableOpacity>
                </View>

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

const mapStateToProps = state => {
    return {
        dejaRessenti: state.getQuestion.dejaRessenti
    }
}

export default connect(mapStateToProps)(RessentirLaSensation)