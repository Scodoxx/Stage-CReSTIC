//BirdsScreen.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class BirdsScreen extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Oiseaux</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default BirdsScreen