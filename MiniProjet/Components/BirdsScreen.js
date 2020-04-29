//BirdsScreen.js

import React from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'

//Librairie qui va permettre de mapper l'image
import ImageMapper from 'react-native-image-mapper'

//On récupère la largeur de l'écran
const windowWidth = Dimensions.get('window').width;

//On récupère le ratio pour que le mappage ne change pas en fonction des différentes tailles d'écrans
const coefScreen = windowWidth / 610

//On map l'image des oiseaux
const birdsMap = [
    {
        id: 1,
        name: "Oiseau1",
        shape: "rectangle",
        width: 107 * coefScreen,
        height: 258 * coefScreen,
        x1: 91 * coefScreen,
        y1: 102 * coefScreen,
        prefill: "red"
    },
    {
        id: 2,
        name: "Oiseau2",
        shape: "rectangle",
        width: 192 * coefScreen,
        height: 172 * coefScreen,
        x1: 333 * coefScreen,
        y1: 109 * coefScreen,
        prefill: "blue"
    },
    {
        id: 3,
        name: "Oiseau3",
        shape: "rectangle",
        width: 108 * coefScreen,
        height: 254 * coefScreen,
        x1: 275 * coefScreen,
        y1: 301 * coefScreen,
        prefill: "green"
    }
]

//Lien de l'image utilisée
const getUrlImg = require("../Images/tropicalBirds.jpg")

class BirdsScreen extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Cliquez sur un des oiseaux pour entendre son chant</Text>
                <ImageMapper
                    style={{justifyContent: "center"}}
                    imgSource={getUrlImg}
                    imgMap={birdsMap}
                    imgWidth={windowWidth}
                    imgHeight={windowWidth}
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