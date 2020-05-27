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
import { buttons } from '../styles'

class Home extends React.Component {

    state = {
        displayName: "A",
        isChanged: false, //le slider a été changé au moins une fois
        leftValue: 0,
        rightValue: 0.5
    }

    //Permet de récupérer le prénom de l'utilisateur pour l'afficher dans le render
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName })
    }

    _sliderIsChanged = () => {
        this.setState({ isChanged: true })
    }

    _moodIsSet() {
        if(this.state.isChanged) {
            return (
                <TouchableOpacity style={buttons.button}>
                        <Text style={buttons.button_text}>OK</Text>
                </TouchableOpacity>
            )
        }
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {
        return(
            <View style={styles.main_container}>
                <Text>Bonjour {this.state.displayName}</Text>
                <Text>Comment allez vous ?</Text>

                <View>
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
                        defaultTrackColor = {'#e3e3e3'}
                        leftThumbColor = {'red'}
                        rightThumbColor = {'blue'}
                        rangeColor = {'pink'}
                        leftValue = {this.state.leftValue}
                        rightValue = {this.state.rightValue}
                        onValuesChangeFinish = {this._sliderIsChanged}
                        onLeftValueChange = {(leftValue) => this.setState({leftValue})}
                        onRightValueChange = {(rightValue) => this.setState({rightValue})}
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
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        width: 50,
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontStyle: 'normal',
        color: 'white',
        alignSelf: 'center'
    }
})

export default Home