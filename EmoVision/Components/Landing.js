//Landing.js
//Écran de lancement

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native'

class Landing extends React.Component {

    render() {

        LayoutAnimation.easeInEaseOut

        return (
            <View style={styles.main_container}>

                <Image
                    source={require("../Images/banner_test_2.png")}
                    style={{marginTop: -80, marginBottom: -60}}
                ></Image>

                <Text style={[styles.title, { marginTop: 40}]}>Bienvenue</Text>
                <Text style={styles.title}>dans le monde</Text>
                <Image
                        source={require("../Images/logo.png")}
                        style={styles.logo_img}
                ></Image>

                <View style={[styles.cards_container, { marginTop: 40 }]}>
                    <View style={styles.contact_container}>
                        <Text style={styles.text}>Contact</Text>
                    </View>

                    <View style={[styles.container, { backgroundColor: '#3C5094' }]}>
                        <Text style={[styles.text, { color: 'white' }]}>{"Odyle Pérot & Éric Bittar"}  </Text>
                    </View>

                    <View style={[styles.container, { backgroundColor: '#51629A', marginTop: 10 }]}>
                        <Text style={[styles.text, { color: 'white' }]}>{"Au cœur de la Présence"}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Connexion")}>
                    <Text style={[styles.text, { color: 'white', fontWeight: 'bold' }]}>Continuer</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
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
        width: 180,
        height: 180,
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
    },
    button: {
        marginTop: 40,
        marginRight: 20,
        width: 118,
        height: 30,
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    }
})

export default Landing