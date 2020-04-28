//BirdsScreen.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Librairie qui va permettre de mapper l'image
import { ImageMapper } from 'react-native-image-mapper'

//Lien de l'image utilisée
const url = require("../Images/tropicalBirds.jpg")

//On map l'image des oiseaux
const BirdsMap = {
    name: "my-map",
    areas: [
        { id: 1, name: "Oiseau1", shape: "rectangle", coords: [100,105,91,357,187,362,189,102] },
        { id: 2, name: "Oiseau2", shape: "rectangle", coords: [334,107,340,280,527,278,523,103] },
        { id: 3, name: "Oiseau3", shape: "rectangle", coords: [269,301,278,552,589,553,381,298] }
    ]
}

class BirdsScreen extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>
                <ImageMapper
                    imgSource={url}
                    imgMap={BirdsMap}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default BirdsScreen