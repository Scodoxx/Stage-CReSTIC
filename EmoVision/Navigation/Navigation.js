//Navigation.js

//Navigation
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
//Barre de navigation en bas
import { createBottomNavigator, createBottomTabNavigator } from 'react-navigation-tabs'

//Îcones
import { Ionicons } from '@expo/vector-icons'

//Components
import Home from '../Components/Home'
import Loading from '../Components/Loading'

//Authentification
const AuthStack = createStackNavigator({
    Connexion: Login,
    Inscription: Register
})

//Création de la navigation
//Par défaut sur l'écran de chargement
export default createAppContainer(
    createSwitchNavigator({
        Chargement: Loading,
        Auth: AuthStack
    },
    {
        initialRouteName: "Chargement"
    })
)