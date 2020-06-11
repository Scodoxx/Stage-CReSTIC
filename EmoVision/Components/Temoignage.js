//Temoignage.js
//L'utilisateur vérifie ce qu'il a écrit

import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//Style
import { buttons } from '../styles'

//Redux
import { connect } from 'react-redux'

class Temoignage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            temoignage: this.props.temoignage
        }
    }

    render() {
        return(
            <View style={styles.main_container}>

                <Text>Votre témoignage</Text>
                <TextInput style={styles.input} value={this.state.temoignage} multiline={true} editable={false}></TextInput>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={() => this.props.navigation.goBack()}>
                        <Text style={buttons.button_text}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[buttons.button, { alignSelf: 'flex-end', marginRight : 20 }]} onPress={() => this.props.navigation.navigate("Perception")}>
                        <Text style={buttons.button_text}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: '50%',
        borderRadius: 7
    }
})

const mapStateToProps = (state) => {
    return {
        temoignage: state.getTemoignage.temoignage
    }
}
export default connect(mapStateToProps)(Temoignage)