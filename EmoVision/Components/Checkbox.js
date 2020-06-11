//CheckBox.js

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'

class Checkbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.label, //titre de la checkbox
        }
    }

    render() {      
        return(
            <CheckBox
                title={this.state.title}
                iconType='material'
                uncheckedIcon='add'
                checkedIcon='done'
                checked={this.props.checked}
                onPress={this.props.onPress}
            />
        )
    }
}

const styles = StyleSheet.create({})

export default Checkbox