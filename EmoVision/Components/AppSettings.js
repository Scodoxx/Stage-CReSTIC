//AppSettings.js
//L'utilisateur va pouvoir changer certains paramètres de l'application qui lui sont accessibles

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class AppSettings extends React.Component {

    render() {
        return(
            <View>
                <Text>Réglages de l'application</Text>

                <TouchableOpacity>
                    <Text>Valider les changements</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AppSettings