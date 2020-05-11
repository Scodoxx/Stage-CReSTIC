//Home.js
//Écran d'accueil

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

class Home extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>{"Bienvenue\nsur"}</Text>
                <View style={styles.logo}>
                    <Image
                        source={require("../Images/logoEmovisionBlue.jpg")}
                        style={styles.logo_img}
                    ></Image>
                    <Text style={styles.logo_title}>EmoVision</Text>
                </View>
                <View style={styles.contact_container}>
                    <Text style={styles.contact_text}>{"Contact"}</Text>
                </View>

                <View style={styles.names_container}>
                    <Text style={styles.names_text}>{"Odyle Pérot & Éric Bittar"}  </Text>
                </View>

                <View style={styles.slogan_container}>
                    <Text style={styles.slogan_text}>{"Au cœur de la Présence"}</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Continuer</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#BCF8A2' //en attendant le linear-gradient
    },
    title: {
        position: 'absolute',
        width: 327,
        height: 118,
        left: 24,
        top: 80,
        //font-family à rajouter
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 48,
        lineHeight: 59,
        textAlign: 'center'
    },
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: 206,
    },
    logo_img: {
        width: 225,
        height: 230.4,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 112.5
    },
    logo_title: {
        top: 171,
        alignItems: 'flex-end',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 48,
        lineHeight: 59,
        textAlign: 'center',
        color: '#3373F0',
    },
    contact_container: {
        //Pour le faire apparaître en premier avant les contacts
        transform: [{'translate': [0,0, 1]}],
        position: 'absolute',
        width: 72,
        height: 72,
        left: 15,
        top: 517,
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center'
    },
    contact_text: {
        width: 68,
        height: 20,
        top: 24,
        textAlign: 'center',
        //font-family à rajouter
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
        color: 'black'
    },
    names_container: {
        position: 'absolute',
        width: 289,
        height: 68,
        left: 43,
        top: 566,
        backgroundColor: '#3C5094',
        borderRadius: 30,
        alignItems: 'center'
    },
    names_text: {
        position: 'absolute',
        width: 196,
        height: 40,
        textAlign: 'center',
        top: 23,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'center',
        color: 'white'
    },
    slogan_container: {
        position: 'absolute',
        width: 289,
        height: 68,
        left: 43,
        top: 642,
        backgroundColor: '#3C5094',
        borderRadius: 30,
        alignItems: 'center'
    },
    slogan_text: {
        position: 'absolute',
        width: 196,
        height: 40,
        textAlign: 'center',
        top: 23,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'center',
        color: 'white'
    },
    button: {
        position: 'absolute',
        width: 118,
        height: 30,
        left: 227,
        top: 758,
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'center'
    },
    button_text: {
        position: 'absolute',
        width: 144.21,
        height: 16.96,
        top: 6,
        //font-family à rajouter
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
        color: 'white'
    }
})

export default Home