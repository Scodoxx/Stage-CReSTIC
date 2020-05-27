//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

class ProfileSettings extends React.Component {

    render() {
        return(
            <View>
                <Text>Modification de vos informations</Text>

                <TouchableOpacity style={buttons.button}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default ProfileSettings