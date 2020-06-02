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
        name: "tete",
        shape: "circle",
        prefill: 'red',
        x1: 88 * coefScreen,
        y1: 0 * coefScreen,
        radius: 70 * coefScreen
    },
    {
        id: 2,
        name: "tronc",
        shape: "rectangle",
        prefill: 'green',
        width: 67 * coefScreen,
        height: 95 * coefScreen,
        x1: 90 * coefScreen,
        y1: 66 * coefScreen
    },
    {
        id: 3,
        name: "brasGauche1",
        shape: "circle",
        prefill: 'purple',
        x1: 42 * coefScreen,
        y1: 104 * coefScreen,
        radius: 40
    },
    {
        id: 4,
        name: "brasGauche2",
        shape: "circle",
        prefill: 'purple',
        x1: 54 * coefScreen,
        y1: 90 * coefScreen,
        radius: 40
    },
    {
        id: 5,
        name: "brasGauche3",
        shape: "circle",
        prefill: 'purple',
        x1: 69 * coefScreen,
        y1: 77 * coefScreen,
        radius: 40
    },
    {
        id: 6,
        name: "brasDroit1",
        shape: "circle",
        prefill: 'yellow',
        x1: 151 * coefScreen,
        y1: 77 * coefScreen,
        radius: 40
    },
    {
        id: 7,
        name: "brasDroit2",
        shape: "circle",
        prefill: 'yellow',
        x1: 166 * coefScreen,
        y1: 90 * coefScreen,
        radius: 40
    },
    {
        id: 8,
        name: "brasDroit3",
        shape: "circle",
        prefill: 'yellow',
        x1: 181 * coefScreen,
        y1: 104 * coefScreen,
        radius: 40
    },
    {
        id: 9,
        name: "jambeGauche",
        shape: "rectangle",
        prefill: 'blue',
        width: 54 * coefScreen,
        height: 84 * coefScreen,
        x1: 66 * coefScreen,
        y1: 162 * coefScreen
    },
    {
        id: 10,
        name: "jambeDroite",
        shape: "rectangle",
        prefill: 'blue',
        width: 54 * coefScreen,
        height: 84 * coefScreen,
        x1: 130 * coefScreen,
        y1: 162 * coefScreen
    }
]

//Lien de l'image utilisée
const getUrlImg = require("../Images/sensation_physique.png")

class SensationPhysique extends React.Component {

    _clickedArea() {
        if (item.id === 1 ) {
            this.props.navigation.navigate("Ararauna")
        }
        else{
            return(
                <View><Text>Veuillez sélectionner une zone sur le personnage ci-dessus</Text></View>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>

                <View>
                    <Text>Où est logée cette sensation physique dans votre corps ?</Text>
                </View>
                
                <ImageMapper
                    style={{justifyContent: "center"}}
                    imgSource={getUrlImg}
                    imgMap={bodyMap}
                    imgWidth={windowWidth}
                    imgHeight={windowWidth}
                    onPress={(item, idx, event) => this._clickedArea(item, idx, event)}
                    containerStyle={{justifyContent: "center"}}
                />

                {this._displayArea()}

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