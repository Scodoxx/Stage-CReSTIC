//SensationPhysique.js
//L'utilisateur va sélectionner où est-ce qu'il ressent

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

//Style
import { buttons } from '../styles'

//Librairie qui va permettre de mapper l'image
import ImageMapper from 'react-native-image-mapper'

//On récupère la largeur de l'écran
const windowWidth = Dimensions.get('window').width;

//On récupère le ratio pour que le mappage ne change pas en fonction des différentes tailles d'écrans
const coefScreen = windowWidth / 247

//On map l'image des oiseaux
const bodyMap = [
    {
        id: 1,
        name: "head",
        shape: "circle",
        prefill: 'red',
        width: 70 * coefScreen,
        height: 60 * coefScreen,
        x1: 88 * coefScreen,
        y1: 0 * coefScreen,
        radius: 70 * coefScreen
    },
    {
        id: 2,
        name: "Oiseau2",
        shape: "rectangle",
        width: 192 * coefScreen,
        height: 172 * coefScreen,
        x1: 333 * coefScreen,
        y1: 109 * coefScreen
    },
    {
        id: 3,
        name: "Oiseau3",
        shape: "rectangle",
        width: 108 * coefScreen,
        height: 254 * coefScreen,
        x1: 275 * coefScreen,
        y1: 301 * coefScreen
    }
]

//Lien de l'image utilisée
const getUrlImg = require("../Images/sensation_physique.png")

class SensationPhysique extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>

                <View>
                    <Text>Sensation Physique</Text>
                </View>
                
                <ImageMapper
                    style={{justifyContent: "center"}}
                    imgSource={getUrlImg}
                    imgMap={bodyMap}
                    imgWidth={windowWidth}
                    imgHeight={windowWidth}
                    onPress={(item, idx, event) => this._clickedBird(item, idx, event)}
                    containerStyle={{justifyContent: "center"}}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default SensationPhysique