//AraSound.js
//Écran d'accueil

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'
import *  as firebase from 'firebase'

class BlueAraSoundScreen extends React.Component {

    render() {

        return (
            <View style={styles.main_container}>
                <Text>Chant du Ara</Text>
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

export default BlueAraSoundScreen