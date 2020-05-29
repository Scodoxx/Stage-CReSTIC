//ProfileSettings.js
//L'utilisateur va pouvoir changer certaines informations de son profil

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Picker, StyleSheet } from 'react-native'
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
            that.setState({ firstname: json.prenom, name: json.nom, birthdate: json.dateNaissance, gender: json.genre, confidential: json.confidentialite })
        })
    }

    //Quand le genre est changé par l'utilisateur
    onDayValueChanged = (gender) => {
        this.setState({ gender: gender })
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
                    <Picker style={styles.dayPicker} selectedValue={this.state.gender} onValueChange={this.onDayValueChanged}>
                        <Picker.Item key={0} label={"Homme"} value="H"/>
                        <Picker.Item key={1} label="Femme" value="F"/>
                        <Picker.Item key={2} label="Je ne souhaite pas préciser" value="NP"/>
                    </Picker>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Adresse mail</Text>
                    <TouchableOpacity>
                        <Text style={[inputs.input, {color: 'blue'}]} onPress={() => this.props.navigation.navigate("Modifier l'adresse mail")}>
                            Modifier l'adresse mail
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={inputs.input_tilte}>Mot de passe</Text>
                    <TouchableOpacity>
                        <Text style={[inputs.input, {color: 'blue'}]} onPress={() => this.props.navigation.navigate("Modifier le mot de passe")}>
                            Modifier le mot de passe
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
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