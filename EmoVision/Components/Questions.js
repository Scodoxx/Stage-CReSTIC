//Questions.js
//Si l'utilisateur dit 'avoir déjà ressenti cette sensation il va en renseigner les informations

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native'

//Îcones
import { Ionicons } from '@expo/vector-icons'

//Choisir la date de naissance
import { TextInputMask } from 'react-native-masked-text'

//Style
import { buttons, inputs } from '../styles'

//Récupérer la largeur de l'écran (utilisé dans le style de scrollview)
const screenWidth = Dimensions.get('window').width

class Questions extends React.Component {

    state = {
        reponses: [], //tableau des différentes réponses
        numberOfQuestions: 1, //nombre de questions
        questionAdded: false, //savoir si une question doit être ajoutée
    }

    _onWhereChanged(where) {

    }

    _addQuestion() {
        var questions = (
            <View style={{ flexDirection: 'row ', justifyContent: "space-around" }}>
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
                        value={this.state.questionDate}
                        onChangeText={text => {
                            this.setState({
                            questionDate: text
                            })
                        }}
                    />
                </View>
            </View>
        )
        for(var i=0; i < this.state.numberOfQuestions; i++) {
            return(
                questions   
            )
        }
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
                                value={this.state.questionDate}
                                onChangeText={text => {
                                    this.setState({
                                    questionDate: text
                                    })
                                }}
                            />
                        </View>
                    </View>

                    {this._addQuestion()}

                    <TouchableOpacity style={styles.back} onPress={() => this.setState({ numberOfQuestions: this.state.numberOfQuestions+1 })}>
                        <Ionicons name="md-add-circle-outline" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={() => this.props.navigation.navigate("Méditation") }>Suivant</Text>
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

export default Questions