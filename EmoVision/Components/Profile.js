//Profile.js
//L'utilisateur va pouvoir visualiser ses informations

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

class Profile extends React.Component {

    render() {
        return(
            <View>
                <Text>Profil</Text>

                <TouchableOpacity style={buttons.button} onPress={() => this.props.navigation.navigate("Modifier le profil")}>
                    <Text style={buttons.button_text}>Modifier des informations</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default Profile