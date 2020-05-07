//ToucanSound.js
//Page du player pour le toucan

import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

//On importe le composant MediaPlayer pour afficher le lecteur audio
import MediaPlayer from './MediaPlayer'

//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

//Redux
import { connect } from 'react-redux'

class ToucanSoundScreen extends React.Component {

    //On met le currentIndex a 0, ce qui correspond au Toucan
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <MediaPlayer currentIndex={this.state.currentIndex}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        position: "absolute",
        top: 48,
        left: 28,
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: "rgba(21, 22, 48, 0.7)",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        currentIndex: state.currentIndex
    }
}
export default connect(mapStateToProps)(ToucanSoundScreen)