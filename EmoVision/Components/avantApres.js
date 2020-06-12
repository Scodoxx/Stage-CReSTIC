//avantApres.js
//Écran qui affiche le degré de "bien être" au début et a la fin

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Base de données
import *  as firebase from 'firebase'

//Style
import { buttons } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class avantApres extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: '', //id unique de firebase
            confidentialite: false, //Est-ce les données sont envoyées à la base de données ou non (par défaut à false)
            sliderValueBefore: this.props.sliderValueBefore, //Valeur du slider avant
            sliderValueAfter: this.props.sliderValueAfter, //Valeur du slider après
            temoignage: this.props.temoignage, //Témoignage de l'utilisateur
            sensation: this.props.sensation, //Sensation ressentie par l'utilisateur
            localisation: this.props.localisation, //Localisation de la douleur
            dejaRessenti: this.props.dejaRessenti, //boolean si la personne avait déjà ressenti cette sensation
            where: this.props.where, //Si la personne a déjà ressentie cette sensation, où ça et avec qui?
            when: this.props.when, //Si la personne a déjà ressentie cette sensation, quand?
            emotionFinale: this.props.emotionFinale, //Emotion la plus forte ressentie par l'utilisateur
            sliderEmotion: this.props.sliderEmotion //Degré de ressentie de l'émotion la plus forte
        }
    }

    //Permet de récupérer l'id de l'utilisateur
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        this.setState({ uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, on récupère le confidentialite pour savoir si on envoie les informations à la base de données
        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ confidentialite: json.confidentialite })
        })
    }

    //Retourne la date du jour
    _getDateOfTheDay() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        today = dd + '/' + mm + '/' + yyyy

        return(today)
    }

    //Appelée quand on appuie sur le bouton pour passer à la page suivante
    _buttonIsPressed = () => {
        if(this.state.confidentialite) {
            firebase
                .database()
                .ref(`historiques/${this.state.uid}`)
                .push(
                    {
                        date: this._getDateOfTheDay(),
                        degreAvant: this.state.sliderValueBefore[0],
                        degreApres: this.state.sliderValueAfter[0],
                        douleur: {
                            localisation: this.state.localisation,
                            sensation: this.state.sensation
                        },
                        emotionRessentie: {
                            echelle: this.state.sliderEmotion,
                            emotion: this.state.emotionFinale
                        },
                        ressenti: {
                            dejaRessenti: this.state.dejaRessenti,
                            raconte: {
                                date: this.state.when,
                                localisation: this.state.where
                            }
                        },
                        temoignage: this.state.temoignage
                    }
                )
        }
        this.props.navigation.navigate("Accueil")
    }

    //Affiche un message si la personne se sent moins bien à la fin qu'au début
    _siNegatif() {
        if(this.state.sliderValueBefore >= this.state.sliderValueAfter) {
            return(
                <View style={{width: '70%'}}>
                    <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10}}>N'hésitez pas à refaire le parcours pour continuer sur la voie du bien-être.</Text>
                    <Text style={{textAlign: 'center', fontSize: 14}}>Pour aller plus loin, rendez vous sur notre site www.emovision.net</Text>
                </View>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>

                <View>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Avant</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ResponsiveImage
                            source={require("../Images/sad.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                        <ResponsiveImage
                            source={require("../Images/meh.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                        <ResponsiveImage
                            source={require("../Images/smile.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                    </View>
                    <MultiSlider
                        trackWidth = {300}
                        values={this.state.sliderValueBefore}
                        min={0}
                        max={10}
                        step={1}
                        enabledOne={false}
                        defaultTrackColor = {'#3F9BAF'}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Après</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ResponsiveImage
                            source={require("../Images/sad.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                        <ResponsiveImage
                            source={require("../Images/meh.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                        <ResponsiveImage
                            source={require("../Images/smile.png")}
                            initWidth="30"
                            initHeight="30"
                        />
                    </View>
                    <MultiSlider
                        trackWidth = {300}
                        values={this.state.sliderValueAfter}
                        min={0}
                        max={10}
                        step={1}
                        enabledOne={false}
                        defaultTrackColor = {'#3F9BAF'}
                    />
                </View>

                {this._siNegatif()}

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={buttons.replay_button}>
                        <Text style={buttons.button_text}>Et maintenant je me sens...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttons.terminer_button} onPress={this._buttonIsPressed}>
                        <Text style={buttons.button_text}>Terminer</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

const mapStateToProps = state => {
    return {
        sliderValueBefore: state.getSliderValue.sliderValueBefore,
        sliderValueAfter: state.getSliderValue.sliderValueAfter,
        temoignage: state.getTemoignage.temoignage,
        sensation: state.getSensation.sensation,
        localisation: state.getSensation.localisation,
        dejaRessenti: state.getQuestion.dejaRessenti,
        where: state.getQuestion.where,
        when: state.getQuestion.when,
        emotionFinale: state.toggleEmotion.emotionFinale,
        sliderEmotion: state.getSliderValue.sliderEmotion
    }
}
export default connect(mapStateToProps)(avantApres)