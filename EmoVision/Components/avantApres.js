//avantApres.js
//Écran qui affiche le degré de "bien être" au début et a la fin

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Style
import { buttons } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class avantApres extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderValueBefore: this.props.sliderValueBefore,
            sliderValueAfter: this.props.sliderValueAfter
        }
    }

    //Affiche un message si la personne se sent moins bien à la fin qu'au début
    _siNegatif() {
        if(this.state.sliderValueBefore > this.state.sliderValueAfter) {
            return(
                <View style={{width: '70%'}}>
                    <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10}}>N'hésitez pas à refaire le parcours pour continuer sur la voie du bien-être.</Text>
                    <Text style={{textAlign: 'center', fontSize: 14}}>Pour aller plus loin, rendez vous sur notre site www.emovision.net</Text>
                </View>
            )
        }
    }

    render() {
        console.log(this.state.sliderValueAfter)
        return(
            <View style={styles.main_container}>

                <View>
                    <Text style={{ fontSize: 20 }}>Avant</Text>
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
                    <Text style={{ fontSize: 20 }}>Après</Text>
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
                    <TouchableOpacity style={buttons.terminer_button}>
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
        sliderValueAfter: state.getSliderValue.sliderValueAfter
    }
}
export default connect(mapStateToProps)(avantApres)