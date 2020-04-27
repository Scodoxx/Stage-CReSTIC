//LoadingScreen.js
//Écran d'inscription

import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import *  as firebase from 'firebase'

class RegisterScreen extends React.Component {

    //On enlève l'entête sur l'écran "Inscripton"
    static navigationOptions = {
        headerShown: false
    }

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    //Permet de s'inscrire et que les données soient enregistrées dans la base de données
    _handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={styles.main_container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../Images/headerAuth.png")}
                    style={{marginTop: -70}}
                ></Image>

                <Image
                    source={require("../Images/headerAuth.png")}
                    style={{position: "absolute"}}
                ></Image>

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <View style={styles.cadre}>
                    <Text style={styles.welcome}>{"Pas encore inscrit ? C'est par ici !"}</Text>
                </View>

                <View style={styles.error_message}>
                    {this.state.errorMessage && <Text style={styles.error}></Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.input_title}>Nom</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.input_title}>Adresse mail</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.input_title}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={ password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this._handleSignUp}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>S'inscrire</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Connexion")}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Déjà inscrit ? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Connecte toi</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    cadre: {
        backgroundColor: "rgba(255,255,255,0.7)",
        width: "50%",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 20
    },
    welcome: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        padding: 5
    },
    error_message: {
        height: 72,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 45,
        marginHorizontal: 30
    },
    input_title: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: "absolute",
        top: 48,
        left: 28,
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: "rgba(21, 22, 48, 0.7)",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default RegisterScreen