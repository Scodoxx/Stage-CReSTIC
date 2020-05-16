//Home.js
//Écran d'accueil

import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native'

//Pour connecter avec la base de données
import * as firebase from 'firebase'

class Home extends React.Component {

    //On enlève l'entête sur l'écran "Connexion"
    static navigationOptions = {
        headerShown: false
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

        LayoutAnimation.easeInEaseOut

        return (
            <View style={styles.main_container}>

                <Image
                    source={require("../Images/banner_test_2.png")}
                    style={{marginTop: -80}}
                ></Image>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.input_title}>Adresse mail</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.input_title}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            onChangeText={ password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate("Inscription")}>
                    <Text style={{ color: '#414959', fontSize: 14 }}>
                        Nouveau ? <Text style={{ fontWeight: '500', color: '#3F9BAF' }}>S'inscrire</Text>
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#414959', marginLeft: 70, marginRight: 10}} />
                    <View>
                        <Text style={{fontSize: 14, textAlign: 'center', color: '#414959'}}>ou</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: '#414959', marginRight: 70, marginLeft: 10}} />
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={{color: '#414959', fontSize: 14}}>Se connecter avec</Text>
                </View>

                <TouchableOpacity style={[styles.fb_gl_button, {marginTop: 15, backgroundColor: '#4267B2'}]}>
                    <Image
                        source={require("../Images/facebook.png")}
                        style={{width: 10, height: 20, alignSelf: 'center', marginRight: 16}}
                    />
                    <Text style={styles.button_text}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.fb_gl_button, {marginTop: 15, backgroundColor: '#FD183E'}]}>
                    <Image
                        source={require("../Images/google.png")}
                        style={{width: 17, height: 18, alignSelf: 'center', marginRight: 10}}
                    />
                    <Text style={styles.button_text}>Google</Text>
                </TouchableOpacity>
                
                <View style={{marginTop: 20}}>
                    <Text style={{color: '#414959', fontSize: 14}}>Comment ça marche ?</Text>
                </View>

                <TouchableOpacity style={[styles.video_button, {marginTop: 20}]}>
                    <Text style={styles.video_button_text}>Vidéo</Text>
                </TouchableOpacity>

                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: '#414959', fontSize: 45}}>Welcome</Text>
                    <Text style={{color: '#414959', fontSize: 16}}>to your World</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center'
    },
    form: {
        width: 236,
        marginBottom: 30,
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
        width: 118,
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontStyle: 'normal',
        color: 'white',
        alignSelf: 'center'
    },
    register_icon: {
        width: 38,
        height: 33,
        alignSelf: 'center'
    },
    login_icon: {
        width: 38,
        height: 33,
        alignSelf: 'center'
    },
    or_container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    fb_gl_button: {
        flexDirection: 'row',
        width: 246,
        height: 32,
        borderRadius: 20,
        paddingLeft: 10
    },
    video_button: {
        flexDirection: 'row',
        backgroundColor: '#E6A648',
        width: 86,
        height: 36,
        borderColor: '#C6A2A2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    video_button_text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default Home