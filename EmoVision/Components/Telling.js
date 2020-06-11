//Telling.js
//L'utilisateur va raconter ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Redux
import { connect } from 'react-redux'

class Telling extends React.Component {

    state = {
        temoignage: "" //Témoignage de l'utilisateur
    }

    _buttonIsPressed = () => {
        const action = { type: 'GET_TEMOIGNAGE', value: this.state.temoignage }
        this.props.dispatch(action)
        this.props.navigation.navigate("Votre témoignage")
    }

    render() {
        return(
            <View style={styles.main_container}>

                <Text>Que s'est-il passé ?</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={temoignage => this.setState({ temoignage })}
                    value={this.state.temoignage}
                    multiline={true}
                    blurOnSubmit={true}>
                </TextInput>
                <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={this._buttonIsPressed}>
                    <Text style={buttons.button_text}>J'y vais</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: '50%',
        borderRadius: 7
    }
})

const mapStateToProps = (state) => {
    return {
        temoignage: state.getTemoignage.temoignage
    }
}
export default connect(mapStateToProps)(Telling)