//aPresent.js
//L'utilisateur va choisir sur une échelle de 0 à 10 après la méditation

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Style
import { buttons, titles } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class aPresent extends React.Component {

    state = {
        sliderValueAfter: 0 //valeur du slider
    }

    _sliderIsChanged = (values) => {
        this.setState({ sliderValueAfter: values })
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
        const action = { type: 'GET_DEGRE_APRES', value: this.state.sliderValueAfter }
        this.props.dispatch(action)
        this.props.navigation.navigate("Avant / Après")
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {
        return(
            <View style={styles.main_container}>
                <Text style={titles.title_2}>Et à présent ?</Text>
                <Text style={titles.title_2}>Comment vous sentez-vous ?</Text>

                <Text>{this.state.sliderValueAfter}</Text>

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
                        value={this.state.sliderValueAfter}
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
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

const mapStateToProps = (state) => {
    return {
        sliderValueAfter: state.sliderValueAfter
    }
}
export default connect(mapStateToProps)(aPresent)