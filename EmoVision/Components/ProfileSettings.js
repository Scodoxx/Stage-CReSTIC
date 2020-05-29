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
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        this.setState({ email: utilisateur.email, uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, qu'on va ensuite faire correspondre aux states du component
        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre })
        })
    }

    _updateProfile = () => {
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

                <TouchableOpacity style={buttons.button} onPress={this._updateProfile}>
                    <Text style={buttons.button_text}>Valider les changements</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.5,
        padding: 10,
        justifyContent: 'space-around'
    }
})

export default ProfileSettings