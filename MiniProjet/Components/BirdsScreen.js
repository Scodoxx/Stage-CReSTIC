//BirdsScreen.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Librairie qui va permettre de mapper l'image
import { ImageMapper } from 'react-native-image-mapper'

class BirdsScreen extends React.Component {

    //On map l'image des oiseaux
    _birdsMap() {
        return(
            {
                name: "my-map",
                areas: [
                    {
                        id: 1,
                        name: "Oiseau1",
                        shape: "rectangle",
                        width: 93,
                        height: 257,
                        x1: 93,
                        y1: 104
                    }
                ]
            }
        )
    }

    //Lien de l'image utilisée
    _getUrlImg() {
        let url = require("../Images/tropicalBirds.jpg")
        return url
    }

    render() {
        return (
            <ImageMapper
                imgSource={() => this._getUrlImg()}
                imgMap={() => this._birdsMap()}
                imgWidth={800}
                imgHeight={800}
            />
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