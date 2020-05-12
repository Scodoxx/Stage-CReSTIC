//Home.js
//Écran d'accueil

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

class Home extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>

                <TouchableOpacity style={[styles.register_login_button, {marginTop: 300}]} onPress={() => this.props.navigation.navigate("Connexion")}>
                    <Text style={styles.button_text}>Créer un compte</Text>
                    <Image
                        source={require("../Images/register.png")}
                        style={styles.register_icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.register_login_button, {marginTop: 10}]} onPress={() => this.props.navigation.navigate("Inscription")}>
                    <Text style={styles.button_text}>Se connecter</Text>
                    <Image
                        source={require("../Images/login.png")}
                        style={styles.login_icon}
                    />
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white', marginLeft: 70, marginRight: 10}} />
                    <View>
                        <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>ou</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white', marginRight: 70, marginLeft: 10}} />
                </View>

                <View style={[styles.contact_container, {marginTop: 20}]}>
                    <Text style={{color: 'white', fontSize: 20}}>{"Se connecter avec"}</Text>
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
                    <Text style={{color: 'white', fontSize: 20}}>{"Comment ça marche ?"}</Text>
                </View>

                <TouchableOpacity style={[styles.video_button, {marginTop: 20}]}>
                    <Text style={styles.video_button_text}>Vidéo</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 45}}>Welcome</Text>
                    <Text style={{color: 'white', fontSize: 16}}>to your World</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#BCF8A2', //en attendant le linear-gradient
        alignItems: 'center'
    },
    register_login_button: {
        flexDirection: 'row',
        width: 236,
        height: 42,
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        justifyContent: 'space-around',
        borderRadius: 8
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
        alignSelf: 'center',
        fontWeight: 'bold'
    }
})

export default Home