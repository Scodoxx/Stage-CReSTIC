//Perception.js
//L'utilisateur va sélectionner ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Images responsives
import ResponsiveImage from 'react-native-responsive-image'

class Perception extends React.Component {

    state = {
        tellingIsPressed: false, //redirige ou pas vers "je raconte"
        imFeelingIsPressed: false, //redirige ou pas vers "je me sens"
        feelingsIsPressed: false //redirige ou pas vers "je ressens"
    }

    _buttonIsPressed() {
        if(this.state.tellingIsPressed) {
            return (
                <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={() => this.props.navigation.navigate("Je raconte") }>
                    <Text style={buttons.button_text}>J'y vais</Text>
                </TouchableOpacity>
            )
        }
        if(this.state.feelingsIsPressed) {
            return (
                <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={() => this.props.navigation.navigate("Sensation physique") }>
                    <Text style={buttons.button_text}>J'y vais</Text>
                </TouchableOpacity>
            )
        }
    }

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
                    <TouchableOpacity style={buttons.perception_button} onPress={() => this.setState({ tellingIsPressed: true, imFeelingIsPressed: false, feelingsIsPressed: false })}>
                        <Text style={buttons.button_text}>Je raconte ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                                source={require("../Images/telling_person.png")}
                                initWidth="95"
                                initHeight="145"
                    />
                </View>

                <View style={styles.perception_container}>
                <TouchableOpacity style={buttons.perception_button} onPress={() => this.setState({ feelingsIsPressed: true, imFeelingIsPressed: false, tellingIsPressed: false })}>
                        <Text style={buttons.button_text}>Je ressens ...</Text>
                    </TouchableOpacity>
                    <ResponsiveImage
                            source={require("../Images/feelings_person.png")}
                            initWidth="95"
                            initHeight="145"
                    />
                </View>

                <View>
                    {this._buttonIsPressed()}
                </View>

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