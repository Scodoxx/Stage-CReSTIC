//Player.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Player extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Media player</Text>
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

export default Player