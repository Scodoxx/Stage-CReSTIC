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
        y1: 102 * coefScreen
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
const getUrlImg = require("../Images/tropicalBirds.jpg")

class BirdsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedBirdId: null
        }
    }

    //On récupère l'id de l'oiseau qui a été cliqué et on fait la redirection selon l'id de l'oiseau récupéré
    _clickedBird(item, idx, event) {
        console.log(item.id)
        if (item.id === 1 ) {
            this.props.navigation.navigate("AraBleu")
        }
        if (item.id === 2 ) {
            this.props.navigation.navigate("Toucan")
        }
        if (item.id === 3 ) {
            this.props.navigation.navigate("Ara")
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={{marginTop: 100, fontSize: 14}}>Cliquez sur un des oiseaux pour entendre son chant</Text>
                <ImageMapper
                    style={{justifyContent: "center"}}
                    imgSource={getUrlImg}
                    imgMap={birdsMap}
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default BirdsScreen