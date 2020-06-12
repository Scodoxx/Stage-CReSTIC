//Home.js
//Écran une fois que l'utilisateur est connecté

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Base de données
import *  as firebase from 'firebase'

//Style
import { buttons, titles } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class Home extends React.Component {

    state = {
        uid: '', //id unique de firebase
        firstname: '', //Prénom affiché
        isChanged: false, //le slider a été changé au moins une fois
        sliderValue: 0 //valeur du slider
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        var that = this
        const utilisateur = firebase.auth().currentUser
        this.setState({ uid: utilisateur.uid })
        const utilisateurs = firebase.database().ref(`utilisateurs/${utilisateur.uid}`)

        //On récupère l'utilisateur qui a l'id correspondant et on accède a ses informations, on prends ici son prénom
        utilisateurs.on("value", function(snapshot) {
            const json = snapshot.toJSON()
            that.setState({ firstname: json.prenom })
        })
    }

    _sliderIsChanged = (values) => {
        this.setState({ sliderValue: values })
    }

    _sliderIsChangedFinish = () => {
        this.setState({ isChanged: true })
    }

    _moodIsSet() {
        if(this.state.isChanged) {
            return (
                <TouchableOpacity style={buttons.button} onPress={this._buttonIsPressed}>
                        <Text style={buttons.button_text}>OK</Text>
                </TouchableOpacity>
            )
        }
    }

    //Appelée quand on appuie sur le bouton pour passer à la page suivante
    _buttonIsPressed = () => {
        const action = { type: 'GET_DEGRE_AVANT', value: this.state.sliderValue }
        this.props.dispatch(action)
        this.props.navigation.navigate("Perception")
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {
        return(
            <View style={styles.main_container}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>Bonjour {this.state.firstname}</Text>
                    <Text style={titles.title_2}>Comment allez vous ?</Text>
                </View>

                

                <View>
                    <Text style={{textAlign: 'center', marginBottom: 20}}>{this.state.sliderValue}</Text>
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
                        value={this.state.sliderValue}
                        min={0}
                        max={10}
                        step={1}
                        defaultTrackColor = {'#3F9BAF'}
                        onValuesChange = {(values) => this._sliderIsChanged(values)}
                        onValuesChangeFinish = {this._sliderIsChangedFinish}
                    />
                </View>

                <View>
                    {this._moodIsSet()}
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

const mapStateToProps = (state) => {
    return {
        sliderValueBefore: state.getSliderValue.sliderValueBefore
    }
}
export default connect(mapStateToProps)(Home)