//RessentirLaSensation.js
//On demande l'utilisateur si il a déjà ressenti la sensation qu'il a renseigné avant

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

class RessentirLaSensation extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>
                
                <Text>Repensez à la situation qui a fait émerger cette émotion :</Text>
                <Text>Ressentez la sensation corporelle qu'elle sucite</Text>
                <Text>Avez-vous déjà ressenti cette sensation corporelle avant aujourd'hui ?</Text>

                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={() => this.props.navigation.navigate("Questions") }>Oui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text} onPress={() => this.props.navigation.navigate("Méditation") }>Non</Text>
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

export default RessentirLaSensation