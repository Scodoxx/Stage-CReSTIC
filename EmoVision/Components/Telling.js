//Telling.js
//L'utilisateur va raconter ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

class Telling extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>

                
                <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]}>
                    <Text style={buttons.button_text}>J'y vais</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    perception_container: {
        flex: 1,
        width: "80%",
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Telling