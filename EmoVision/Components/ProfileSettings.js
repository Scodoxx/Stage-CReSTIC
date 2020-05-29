//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Picker, ScrollView, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'

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
        confidential: false, //confidentialitéa acceptée ou non
        updated: false, //le profil a été mis à jour au moins une fois
        genderIsPressed: false //le picker pour les genres est affiché ou non
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
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre, confidential: json.confidentialite })
        })
    }

    //Récupère le genre pour l'afficher plus correctement (ex: H = Homme)
    _getGender() {
        if(this.state.gender === "H") {
            return("Homme")
        }
        if(this.state.gender === "F") {
            return("Femme")
        }
        else{
            return("Non précisé")
        }
    }

    //Est appelée quand on clique sur le genre pour l'éditer
    _genderIsPressed = () => {
        if(this.state.genderIsPressed === true) {
            this.setState({ genderIsPressed: false })
        }
        if(this.state.genderIsPressed === false) {
            this.setState({ genderIsPressed: true })
        }
    }

    //Appelée à chaque fois que le genre est changé et va modifier le state gender
    onGenderValueChanged = (gender) => {
        this.setState({ gender: gender })
    }

    //Afficher le sélecteur de genres
    _displayGenderPicker() {
        if(this.state.genderIsPressed === true) {
            return(
                <Picker selectedValue={this.state.gender} onValueChange={this.onGenderValueChanged}>
                            <Picker.Item key={0} label="Homme" value="H"/>
                            <Picker.Item key={1} label="Femme" value="F"/>
                            <Picker.Item key={2} label="Je ne souhaite pas préciser" value="NP"/>
                </Picker>
            )
        }
        else{
            return;
        }
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

    //Les données sont mises à jour dans Firebase
    _updateProfile = () => {
        this.setState({ updated: true })
        //mettre à jour uniquement les informations de la table "utilisateurs"
        firebase
            .database().
            ref(`utilisateurs/${this.state.uid}`)
            .update({
                prenom: this.state.firstname,
                nom: this.state.name,
                dateNaissance: this.state.birthdate,
                genre: this.state.gender,
                confidentialite: this.state.confidential
            })
    }

    _toggleConfidential = () => {
        if(!this.state.confidential) {
            this.setState({confidential: true})
        }
        else {
            this.setState({confidential: false})
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                <ScrollView style={styles.scrollview}>
                    <View style={{marginTop: 10}}>
                        <Text style={inputs.input_title}>Prénom</Text>
                        <TextInput 
                            style={inputs.input}
                            onChangeText={firstname => this.setState({ firstname })}
                            placeholder={this.state.firstname}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={inputs.input_title}>Nom</Text>
                        <TextInput 
                            style={inputs.input}
                            onChangeText={name => this.setState({ name })}
                            placeholder={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={inputs.input_title}>Date de naissance</Text>
                        <TextInputMask
                            type={'datetime'}
                            style={inputs.input}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            placeholder={this.state.birthdate}
                            onChangeText={text => {
                                this.setState({
                                birthdate: text
                                })
                            }}
                        />
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={inputs.input_title}>Genre</Text>
                        <TouchableOpacity style={[inputs.input, {marginTop: 10}]} onPress={this._genderIsPressed}>
                            <Text style={{ fontSize: 15, color: "#B6B6B6" }}>{this._getGender()}</Text>
                        </TouchableOpacity>
                    </View>
                    {this._displayGenderPicker()}

                    <View style={{marginTop: 32}}>
                        <Text style={inputs.input_title}>Adresse mail</Text>
                        <TouchableOpacity style={[inputs.input, {marginTop: 10}]}>
                            <Text style={[inputs.input, {color: 'blue'}]} onPress={() => this.props.navigation.navigate("Modifier l'adresse mail")}>
                                Modifier l'adresse mail
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={inputs.input_title}>Mot de passe</Text>
                        <TouchableOpacity style={[inputs.input, {marginTop: 10}]}>
                            <Text style={[inputs.input, {color: 'blue'}]} onPress={() => this.props.navigation.navigate("Modifier le mot de passe")}>
                                Modifier le mot de passe
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 32, flexDirection: 'row', alignItems: 'center'  }}>
                        <Text>
                            J'accepte de partager mes données
                        </Text>
                        <CheckBox
                            containerStyle={{padding: 0}}
                            iconRight={true}
                            right
                            checked={this.state.confidential}
                            onPress={this._toggleConfidential}
                        />
                    </View>

                    <TouchableOpacity style={[buttons.button, { marginBottom: 20, marginTop: 32 }]} onPress={this._updateProfile}>
                        <Text style={buttons.button_text}>Valider les changements</Text>
                    </TouchableOpacity>
                    {this._hasBeenUpdated()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-around'
    }
})

export default ProfileSettings