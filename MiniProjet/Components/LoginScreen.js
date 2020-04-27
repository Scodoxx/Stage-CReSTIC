//LoginScreen.js
//Écran d'authentification

import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'
import * as firebase from 'firebase'

//Rendu de l'écran de connexion
class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    //Permet de s'identifier en appuyant sur le bouton "Se connecter"
    _handleLogin = () => {
        const {email, password} = this.state

        //Tester la correspondance des identifiants avec la base de données
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({errorMessage: error.message}))
    }

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

                <Image
                    source={require("../Images/logo.png")}
                    style={styles.logo}
                ></Image>
                
                <View style={styles.cadre_welcome}>
                    <Text style={styles.welcome_back}>{"Bonjour.\nRavi de vous revoir !"}</Text>
                </View>

                <View style={styles.error_message}>
                    {this.state.errorMessage && <Text style={styles.error}></Text>}
                </View>

                <View style={styles.form}>
                    <View>
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

                <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Inscription")}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Nouveau ? <Text style={{ fontWeight: '500', color: '#E9446A' }}>S'inscrire</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}


//Styles
const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    cadre_welcome: {
        marginTop: 32,
        backgroundColor: "rgba(255,255,255,0.7)",
        width: "50%",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 20
    },
    welcome_back: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        padding: 5
    },
    logo: {
        borderRadius: 24,
        marginTop: -120,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.75,
        shadowRadius: 10
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
    }
})

export default LoginScreen