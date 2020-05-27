//Landing.js
//Écran de lancement

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, LayoutAnimation, StatusBar } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Style
import { buttons } from '../styles'

class Landing extends React.Component {

    render() {

        LayoutAnimation.easeInEaseOut

        return (
            <View style={styles.main_container}>

                <StatusBar barStyle="light-content"></StatusBar>

                <ResponsiveImage
                    source={require("../Images/banner_test_2.png")}
                    style={{marginTop: -80, marginBottom: 10}}
                    initWidth="600"
                    initHeight="287"
                />

                <View style={{ flex: 0.4 }}>
                    <ResponsiveImage
                            source={require("../Images/logo.png")}
                            style={styles.logo_img}
                            initWidth="180"
                            initHeight="180"
                    />
                </View>

                <View style={styles.cards_container}>
                    <View style={styles.contact_container}>
                        <Text style={styles.text}>Contact</Text>
                    </View>

                    <View style={[styles.container, { backgroundColor: '#3C5094' }]}>
                        <Text style={[styles.text, { color: 'white' }]}>{"Odyle Pérot & Éric Bittar"}  </Text>
                    </View>

                    <View style={[styles.container, { backgroundColor: '#51629A'}]}>
                        <Text style={[styles.text, { color: 'white' }]}>{"Au cœur de la Présence"}</Text>
                    </View>
                </View>

                <View style={{ alignSelf: 'flex-end' }}>
                    <TouchableOpacity style={[buttons.button, {marginRight: 20}]} onPress={() => this.props.navigation.navigate("Connexion")}>
                        <Text style={[buttons.button_text, { color: 'white', fontWeight: 'bold' }]}>Continuer</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        width: 327,
        //font-family à rajouter
        fontWeight: 'bold',
        fontSize: 36,
        color: '#414959',
        textAlign: 'center'
    },
    logo_img: {
        marginTop: 30,
        alignSelf: 'center',
        borderRadius: 112.5
    },
    logo_title: {
        position: 'absolute',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        fontSize: 48,
        textAlign: 'center',
        color: '#3373F0',
    },
    cards_container: {
        flex: 0.25,
        justifyContent: 'space-around',
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 30
    },
    contact_container: {
        position: 'absolute',
        flexDirection: 'row',
        //Pour le faire apparaître en premier avant les contacts
        transform: [{'translate': [0,0, 1]}],
        borderWidth: 1,
        borderColor: '#414959',
        width: 72,
        height: 72,
        backgroundColor: 'white',
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    text: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16
    },
    container: {
        flexDirection: 'row',
        width: 289,
        height: 68,
        borderRadius: 30,
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default Landing