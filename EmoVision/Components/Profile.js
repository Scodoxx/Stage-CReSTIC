//Profile.js
//L'utilisateur va pouvoir visualiser ses informations

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class Profile extends React.Component {

    render() {
        return(
            <View>
                <Text>Profil</Text>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Modifier le profil")}>
                    <Text style={styles.button_text}>Modifier des informations</Text>
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

export default Profile