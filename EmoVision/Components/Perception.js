//Perception.js
//L'utilisateur va sélectionner ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Perception extends React.Component {

    render() {
        return(
            <View>
                <Text>Je me sens ...</Text>
                <Text>Je raconte ...</Text>
                <Text>Je ressens ...</Text>

                <TouchableOpacity>
                    <Text>J'y vais</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Perception