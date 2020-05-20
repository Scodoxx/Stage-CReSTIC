//Home.js
//Écran une fois que l'utilisateur est connecté

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Base de données
import *  as firebase from 'firebase'

class Home extends React.Component {

    //Prénom de l'utilisateur
    state = {
        displayName: "A",
        setSliderOneChanging: false,
        sliderOneValue: [5],
        multiSliderValue: [3, 7]
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName })
    }

    sliderOneValuesChangeStart = () => this.setState({ sliderOneChanging: true })

    sliderOneValuesChange = values => this.setState({ sliderOneValue: values })

    sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    //Permet à l'utilisateur de se déconnecter (sera dans le menu déroulant plus tard)
    _signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        console.log(firebase.auth().currentUser)
        return(
            <View style={styles.main_container}>
                <Text>Bonjour {this.state.displayName}</Text>
                <Text>Comment allez vous ?</Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this._signOutUser}>
                    <Text>Se déconnecter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>OK</Text>
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
    button: {
        width: 50,
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontStyle: 'normal',
        color: 'white',
        alignSelf: 'center'
    }
})

export default Home