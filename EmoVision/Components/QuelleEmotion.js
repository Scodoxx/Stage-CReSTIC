//QuellEmotion.js
//L'utilisateur doit choisir entre les différentes émotions qu'il a pu sélectionner

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class QuelleEmotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            emotions: this.props.emotions
        }
    }

    render() {
        console.log(this.state.emotions)
        return (
            <View>
                <Text>test</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
    return {
        emotions: state.emotions
    }
}

export default connect(mapStateToProps)(QuelleEmotion)