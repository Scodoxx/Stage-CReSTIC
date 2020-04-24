//LoginScreen.js
//Écran d'authentification

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Authentification</Text>
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

export default LoginScreen