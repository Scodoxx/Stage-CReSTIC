//Telling.js
//L'utilisateur va raconter ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

class Telling extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>

                <Text>Que s'est-il passé ?</Text>
                <TextInput style={styles.input} multiline={true} blurOnSubmit={true}></TextInput>
                <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={() => this.props.navigation.navigate("Audio")}>
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
        borderRadius: 20
    }
})

export default Telling