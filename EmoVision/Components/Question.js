//Question.js
//Si l'utilisateur dit 'avoir déjà ressenti cette sensation il va en renseigner les informations

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native'

//Redux
import { connect } from 'react-redux'

//Choisir la date de naissance
import { TextInputMask } from 'react-native-masked-text'

//Style
import { buttons, inputs } from '../styles'

//Récupérer la largeur de l'écran (utilisé dans le style de scrollview)
const screenWidth = Dimensions.get('window').width

class Question extends React.Component {

    state = {
        where: "", //Réponse de l'utilisateur
        when: "", //Date de la réponse de l'utilisateur
    }

    //Déclenché quand le bouton "Suivant" est cliqué
    _buttonIsPressed = () => {
        const action = { type: 'GET_QUESTION', value: {where: this.state.where, when: this.state.when} }
        this.props.dispatch(action)
        this.props.navigation.navigate("Perception")
    }

    render() {
        return(
            <View style={styles.main_container}>
                
                <ScrollView style={styles.scrollview}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                        <View>
                            <Text style={inputs.input_title}>Où / Avec qui ?</Text>
                            <TextInput 
                                style={inputs.input}
                                onChangeText={where => this.setState({ where })}
                                value={this.state.where}
                            />
                        </View>
                        <View>
                            <Text style={inputs.input_title}>Quand ?</Text>
                            <TextInputMask
                                type={'datetime'}
                                style={inputs.input}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                value={this.state.when}
                                onChangeText={text => {
                                    this.setState({
                                    when: text
                                    })
                                }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={this._buttonIsPressed}>Suivant</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.7,
        alignItems: 'center'
    },
    scrollview: {
        width: screenWidth
    }
})

const mapStateToProps = (state) => {
    return {
        where: state.getQuestion.where,
        when: state.getQuestion.when
    }
}
export default connect(mapStateToProps)(Question)