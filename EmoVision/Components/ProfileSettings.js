//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class ProfileSettings extends React.Component {

    render() {
        return(
            <View>
                <Text>Modification de vos informations</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Valider les changements</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontStyle: 'normal',
        color: 'white',
        alignSelf: 'center'
    }
})

export default ProfileSettings