//Perception.js
//L'utilisateur va sélectionner ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Images responsives
import ResponsiveImage from 'react-native-responsive-image'

class Perception extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>
                <TouchableOpacity style={buttons.perception_button}>
                    <Text style={buttons.button_text}>Je me sens ...</Text>
                </TouchableOpacity>

                <TouchableOpacity style={buttons.perception_button}>
                    <Text style={buttons.button_text}>Je raconte ...</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={buttons.perception_button}>
                        <Text style={buttons.button_text}>Je ressens ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                            source={require("../Images/feelings_person.png")}
                            initWidth="95"
                            initHeight="145"
                    />
                </View>

                <TouchableOpacity style={buttons.button}>
                    <Text style={buttons.button_text}>J'y vais</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default Perception