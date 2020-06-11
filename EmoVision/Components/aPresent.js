//Home.js
//Écran une fois que l'utilisateur est connecté

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'

//Barre de sélection
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Style
import { buttons } from '../styles'

//Redux pour avoir accès à la valeur du slider n'importe où
import { connect } from 'react-redux'

class aPresent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderValueBefore: this.props.sliderValueBefore,
            sliderValueAfter: 0
        }
    }

    _sliderIsChanged = (values) => {
        this.setState({ sliderValueBefore: values })
    }

    _sliderIsChangedFinish = () => {
        this.setState({ isChanged: true })
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {
        console.log(this.state.sliderValueBefore)
        return(
            <View style={styles.main_container}>
                <Text style={{ fontSize: 20 }}>Bonjour {this.state.firstname}</Text>
                <Text>Comment allez vous ?</Text>

                <Text>{this.state.sliderValueBefore}</Text>

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
                        value={this.state.sliderValueBefore}
                        min={0}
                        max={10}
                        step={1}
                        enabledOne={false}
                        defaultTrackColor = {'#3F9BAF'}
                    />
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

const mapStateToProps = state => {
    return {
        sliderValueBefore: state.sliderValueBefore
    }
}
export default connect(mapStateToProps)(aPresent)