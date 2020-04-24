//LoadingScreen.js
//Écran d'inscription

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Inscription</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default RegisterScreen