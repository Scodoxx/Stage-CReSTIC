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
        let selectedEmotions = this.state.emotions.map((emotion, i) => {
            //console.log(this.state.tableauDesEmotions[i])
            return  <TouchableOpacity key={i}>
                        <Text>{emotion}</Text>
                    </TouchableOpacity>
        })
        return(
            <View style={styles.main_container}>
                {selectedEmotions}
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