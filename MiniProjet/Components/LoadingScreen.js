//LoadingScreen.js
//Écran de chargement

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Chargement</Text>
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

export default LoadingScreen