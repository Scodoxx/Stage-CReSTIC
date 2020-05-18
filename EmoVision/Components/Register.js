//Register.js
//Écran d'inscription

import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements'

//Îcones
import { Ionicons } from '@expo/vector-icons'

//Base de données
import *  as firebase from 'firebase'

//Calendrier
import BirthdayPicker from './BirthdayPicker';

//Récupérer la largeur de l'écran (utilisé dans le style de scrollview)
const screenWidth = Dimensions.get('window').width

class Register extends React.Component {

    //On enlève l'entête sur l'écran "Inscripton"
    static navigationOptions = {
        headerShown: false
    }

    state = {
        birthdayPickedIsPressed: false, //permet d'afficher ou non le sélecteur de la date
        surname: "",
        name: "",
        year: 2000, //année par défaut
        month: 0, //mois par défaut (0 = janvier)
        day: 1, //jour par défaut
        birthdate: new Date(),
        gender: null, //genre de la personne
        confidential: false, //l'utilisateur accepte ou non de partager ses données en lien avec l'application
        email: "",
        password: "",
        errorMessage: null,

        manChecked: false, //savoir si la checkBox "homme" a été coché
        womanChecked: false, //savoir si la checkBox "femme" a été coché
        otherChecked: false, //savoir si la checkBox "ne souhaite pas préciser" a été coché
        termsChecked: false //savoir si les conditions générales d'utilisation ont été coché
    }

    //Permet de s'inscrire et que les données soient enregistrées dans la base de données
    _handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.surname
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

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

    //Fonction appelée quand l'utilisateur change la date de naissance
    onBirthdayPickerValueChange = (year, month, day) => {
        this.setState({ year: year, month: month, day: day })
    }

    //Permet d'afficher la zone de sélection de la date de naissance quand on appuie sur le texte
    displayBirthdayPicker() {
        if(this.state.birthdayPickedIsPressed) {
            return (
                <BirthdayPicker
                    selectedYear={this.state.year}
                    selectedMonth={this.state.month}
                    selectedDay={this.state.day}
                    minYear={1900}

                    onValueChange={this.onBirthdayPickerValueChange}
                />
            )
        }
    }

    _birthdayPickerIsPressed = () => {
        if(!this.state.birthdayPickedIsPressed) {
            this.setState({birthdayPickedIsPressed: true})
        }
        else {
            this.setState({birthdayPickedIsPressed: false})
        }
    }

    //Affiche la date dans le formulaire (formatage pour avoir deux chiffres pour le jour et le mois)
    _displayDate = () => {
        var day = this.state.day
        var month = this.state.month + 1
        var year = this.state.year
        //Un peu compliqué comme méthode je n'ai trouvé que celle là pour l'instant
        if (day < 10 && month >= 10) {
            return (
                "0" + day + "/" + month + "/" + year
            )
        }
        if (month < 10 && day >= 10) {
            return (
                day + "/0" + month + "/" + year
            )
        }
        if (month < 10 && day < 10) {
            return (
                "0" + day + "/0" + month + "/" + year
            )
        }
        else {
            return (
                day + "/" + month + "/" + year
            )
        }
    }

    //Sélectionne "Homme"
    _toggleMan = () => {
        this.setState({ manChecked: true, womanChecked: false, otherChecked: false, gender: "H"})
    }

    //Sélectionne "Femme"
    _toggleWoman = () => {
        this.setState({ womanChecked: true, otherChecked: false, manChecked: false, gender: "F"})
    }

    //Sélectionne "Je ne souhaite pas préciser"
    _toggleOther = () => {
        this.setState({otherChecked: true, manChecked: false, womanChecked: false, gender: null})
    }

    _toggleConfidential = () => {
        if(!this.state.confidential) {
            this.setState({confidential: true})
        }
        else {
            this.setState({confidential: false})
        }
    }

    //coche ou décoche les conditions générales et désactive ou active le bouton d'inscription
    _toggleTerms = () => {
        if(!this.state.termsChecked) {
            this.setState({termsChecked: true})
        }
        else {
            this.setState({termsChecked: false})
        }
    }

    //a voir comment griser le bouton d'incription
    _registerDisabled = () => {
        if(this.state.termsChecked) {
            return {
                
            }
        }
        else {
            styles.conditionsG.backgroundColor = 'red'
        }
    }

    render() {

        return (
            <View style={styles.main_container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../Images/banner_test_2.png")}
                    style={{marginTop: -80, marginBottom: -70}}
                ></Image>

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <ScrollView style={styles.scrollview}> 
                    <View style={styles.error_message}>
                        {this.state.errorMessage && <Text style={styles.error}></Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.input_title}>Prénom</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={surname => this.setState({ surname })}
                                value={this.state.surname}
                            ></TextInput>
                        </View>

                        <View style={{marginTop: 32}}>
                            <Text style={styles.input_title}>Nom</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            ></TextInput>
                        </View>

                        <View style={{marginTop: 32}}>
                            <Text style={styles.input_title}>Date de naissance</Text>
                            <TouchableOpacity style={[styles.input, {paddingTop: 9}]} onPress={this._birthdayPickerIsPressed}>
                                <Text style={styles.input}>
                                    {this._displayDate()}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>{this.displayBirthdayPicker()}</View>

                        <View style={{marginTop: 32}}>
                            <Text style={styles.input_title}>Genre</Text>
                            <View style={[styles.genre, {borderBottomColor: '#8A8F9E', borderBottomWidth: StyleSheet.hairlineWidth}]}>
                                <View style={{flexDirection: 'column'}}>
                                    <CheckBox
                                        center
                                        title='Homme'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        containerStyle={[styles.radioButton, {width: 93}]}
                                        textStyle={{fontSize: 14, fontWeight: 'normal'}}
                                        checked={this.state.manChecked}
                                        onPress={this._toggleMan}
                                    />

                                    <CheckBox
                                        center
                                        title='Femme'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        containerStyle={[styles.radioButton, {width: 90}]}
                                        textStyle={{fontSize: 14, fontWeight: 'normal'}}
                                        checked={this.state.womanChecked}
                                        onPress={this._toggleWoman}
                                    />
                                </View>

                                <CheckBox
                                    center
                                    title='Je ne souhaite pas préciser'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    containerStyle={[styles.radioButton, {width: 150}]}
                                    textStyle={{fontSize: 14, fontWeight: 'normal', textAlign: 'center'}}
                                    checked={this.state.otherChecked}
                                    onPress={this._toggleOther}
                                />
                            </View>
                        </View>

                        <View style={{marginTop: 32}}>
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

                        <View style={{marginTop: 32}}>
                            <Text style={styles.input_title}>Confirmez votre mot de passe</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.conditionsG}>
                        <Text style={{textAlign: 'center'}}>
                            En cochant cette case vous acceptez de partager vos données
                        </Text>
                        <CheckBox
                            center
                            checked={this.state.confidential}
                            onPress={this._toggleConfidential}
                        />
                    </View>

                    <View style={styles.conditionsG}>
                        <Text style={{textAlign: 'center', flex: 3}}>
                            J'ai lu et accepte les conditions générales d'utilisation
                        </Text>
                        <CheckBox
                            center
                            checked={this.state.termsChecked}
                            onPress={this._toggleTerms}
                        />
                    </View>

                    <TouchableOpacity disabled={!this.state.termsChecked} style={styles.button} onPress={this._handleSignUp}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 32, paddingBottom: 30 }}
                        onPress={() => this.props.navigation.navigate("Connexion")}>
                        <Text style={{ color: '#414959', fontSize: 13 }}>
                            Déjà inscrit ? <Text style={{ fontWeight: '500', color: '#3F9BAF' }}>Connecte toi</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center'
    },
    scrollview: {
        width: screenWidth
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
        width: 236,
        marginBottom: 30,
        marginHorizontal: 30,
        alignSelf: 'center'
    },
    genre: {
        width: 236,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    radioButton: {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
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
    conditionsG: {
        flexDirection: 'row',
        flex: 1,
        width: 300,
        alignSelf: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 30,
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: '#3F9BAF',
        width: 236,
        height: 52,
        alignSelf: 'center',
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

export default Register