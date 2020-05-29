//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons, inputs } from '../styles'

//Choisir la date de naissance
import { TextInputMask } from 'react-native-masked-text'

//Base de données
import *  as firebase from 'firebase'

class ProfileSettings extends React.Component {

    state = {
        uid: '', //id unique de firebase
        firstname: '', //prénom
        name: '', //nom
        email: '', //mail
        birthdate: '', //date de naissance
        gender: '', //genre
        updated: false //le profil a été mis à jour au moins une fois
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        console.log(utilisateur)
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, qu'on va ensuite faire correspondre aux states du component
        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre })
        })
    }

    //L'interface informe que les données ont été mises à jour
    _hasBeenUpdated() {
        if(this.state.updated) {
            return(
                <Text style={{ color: '#3C7F3A' }}>Les données ont bien été mises à jour !</Text>
            )
        }
        else {
            return;
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }


    //Mettre à jour le et mot de passe
    changePassword(currentPassword, newPassword) {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }
    
    //Mettre à jour le et mot de passe
    changeEmail(currentPassword, newEmail) {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }

    //Les données sont mises à jour dans Firebase
    _updateProfile = () => {
        //utilisateur connecté
        const utilisateur = firebase.auth().currentUser

        this.changeEmail(currentPassword, newEmail)

        this.setState({ updated: true })
        //mettre à jour uniquement les informations de la table "utilisateurs"
        firebase
            .database().
            ref(`utilisateurs/${this.state.uid}`)
            .update({
                prenom: this.state.firstname,
                nom: this.state.name,
                dateNaissance: this.state.birthdate,
                genre: this.state.gender
            })
    }

    render() {
        console.log(this.state.currentPassword)
        return(
            <View style={styles.main_container}>
                <View>
                    <Text style={inputs.input_tilte}>Prénom</Text>
                    <TextInput 
                        style={inputs.input}
                        onChangeText={firstname => this.setState({ firstname })}
                        value={this.state.firstname}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Nom</Text>
                    <TextInput 
                        style={inputs.input}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Date de naissance</Text>
                    <TextInputMask
                        type={'datetime'}
                        style={inputs.input}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={this.state.birthdate}
                        onChangeText={text => {
                            this.setState({
                            birthdate: text
                            })
                        }}
                    />
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Genre</Text>
                    <TextInput 
                        style={inputs.input}
                        onChangeText={gender => this.setState({ gender })}
                        value={this.state.gender}
                    ></TextInput>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Adresse mail</Text>
                    <TouchableOpacity>
                        <Text style={{color: 'blue'}} onPress={() => this.props.navigation.navigate("Modifier l'adresse mail")}>
                            Modifier l'adresse mail
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Mot de passe</Text>
                    <TouchableOpacity>
                        <Text style={{color: 'blue'}} onPress={() => this.props.navigation.navigate("Modifier le mot de passe")}>
                            Modifier le mot de passe
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={buttons.button} onPress={this._updateProfile}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>
                {this._hasBeenUpdated()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.8,
        padding: 10,
        justifyContent: 'space-around'
    }
})

export default ProfileSettings