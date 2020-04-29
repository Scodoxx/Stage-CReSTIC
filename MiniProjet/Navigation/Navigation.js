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
import LoadingScreen from '../Components/LoadingScreen'
import LoginScreen from '../Components/LoginScreen'
import RegisterScreen from '../Components/RegisterScreen'
import HomeScreen from '../Components/HomeScreen'
import BirdsScreen from '../Components/BirdsScreen'
import BlueAraSoundScreen from '../Components/BlueAraSoundScreen'
import ToucanSoundScreen from '../Components/ToucanSoundScreen'
import AraSoundScreen from '../Components/AraSoundScreen'

//On construit une navigation entre les différents écrans
//Barre de navigation une fois connecté
const AppTabNavigator = createBottomTabNavigator(
    {
        Accueil: {
            screen: HomeScreen,
            navigationOptions: {
                //Icône de maison pour la page home
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
            }
        },
        Oiseaux: {
            screen: BirdsScreen,
            navigationOptions: {
                //Icône de fleur pour la photo des oiseaux
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-flower" size={24} color={tintColor}></Ionicons>
            }
        }
    }
)

//Authentification
const AuthStack = createStackNavigator({
    Connexion: LoginScreen,
    Inscription: RegisterScreen
})

const SoundStack = createStackNavigator({
    Accueil: AppTabNavigator,
    Ara: AraSoundScreen,
    Toucan: ToucanSoundScreen,
    AraBleu: BlueAraSoundScreen
})

//Création de la navigation
//Par défaut sur l'écran de chargement
export default createAppContainer(
    createSwitchNavigator({
        Chargement: LoadingScreen,
        App: AppTabNavigator,
        Auth: AuthStack,
        Son: SoundStack

    },
    {
        initialRouteName: "Chargement"
    })
)