import { StyleSheet } from 'react-native'

const containers = StyleSheet.create({

})

//Boutons de l'application
const buttons = StyleSheet.create({
    button: {
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#3F9BAF',
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    //Boutons pour la page Perception.js
    perception_button: {
        width: 175,
        height: 47,
        borderRadius: 20,
        
        backgroundColor: '#FB9999',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export { buttons }  