//Loading.js
//Écran de chargement

import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

class Loading extends React.Component {
    
    //Une fois le chargement fini l'utilisateur est ramené vers l'authentification ou l'accueil si il est déjà connecté
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Chargement...</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading