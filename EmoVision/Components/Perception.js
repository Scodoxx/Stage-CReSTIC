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

                <View style={styles.perception_container}>
                    <TouchableOpacity style={buttons.perception_button}>
                        <Text style={buttons.button_text}>Je me sens ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                                source={require("../Images/im_feeling_person.png")}
                                initWidth="95"
                                initHeight="145"
                    />
                </View>

                <View style={styles.perception_container}>
                    <TouchableOpacity style={buttons.perception_button}>
                        <Text style={buttons.button_text}>Je raconte ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                                source={require("../Images/telling_person.png")}
                                initWidth="95"
                                initHeight="145"
                    />
                </View>

                <View style={styles.perception_container}>
                    <TouchableOpacity style={buttons.perception_button}>
                        <Text style={buttons.button_text}>Je ressens ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                            source={require("../Images/feelings_person.png")}
                            initWidth="95"
                            initHeight="145"
                    />
                </View>

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

export default Perception