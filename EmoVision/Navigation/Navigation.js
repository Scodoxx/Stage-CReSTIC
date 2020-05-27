//Navigation.js

//Navigation
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
//Barre de navigation en bas
import { createBottomNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';

//Îcones
import { Ionicons } from '@expo/vector-icons'

//Components
import Landing from '../Components/Landing'
import Loading from '../Components/Loading'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Home from '../Components/Home'
import Perception from '../Components/Perception'
import Profile from '../Components/Profile'
import ProfileSettings from '../Components/ProfileSettings'
import AppSettings from '../Components/AppSettings'
import Tools from '../Components/Tools'
import HowItWorks from '../Components/HowItWorks'

//Accueil une fois l'utilisateur connecté
const HomeStack = createStackNavigator({
    Accueil: {
        screen: Home,
        navigationOptions: {
            headerLeft: () => (
                <Ionicons name="md-menu" size={24} color={'black'}/>
            ),
        }
    },
    Perception: {
        screen: Perception,
        navigationOptions: {
            headerLeft: () => (
                <Ionicons name="md-menu" size={24} color={'black'}/>
            ),
        }
    },
})

//Consulter et modifier son profil
const ProfileStack = createStackNavigator({
    Profil: Profile,
    "Modifier le profil": ProfileSettings
})

//Accéder aux différents outils pour EmoVision
const ToolsStack = createStackNavigator({
    Outils : Tools
})

//Comment est-ce que l'application fonctionne ?
const HowItWorksStack = createStackNavigator({
    "Comment ça marche": HowItWorks
})

//Modifier certains paramètres de l'application
const SettingsStack = createStackNavigator({
    Réglages: {
        screen: AppSettings,
        navigationOptions: {
            headerLeft: () => (
                <TouchableOpacity>
                    <Ionicons name="md-menu" size={24} color={'black'}/>
                </TouchableOpacity>
            ),
        }
    }
})

//Menu qui permet de naviguer rapidement entre différents écrans
const AppNavigator = createDrawerNavigator({
    Accueil: {
        screen: HomeStack,
        navigationOptions: {
            //Icône de maison pour la page home
            drawerIcon: ({ home }) => (
                <Ionicons name="md-home" size={24} color={'black'}/>
            )
        }
    },
    Profil: {
        screen: ProfileStack,
        navigationOptions: {
            //Icône de personnage pour le profil
            drawerIcon: ({ profile }) => (
                <Ionicons name="md-person" size={24} color={'black'}/>
            )
        }
    },
    Outils: {
        screen: ToolsStack,
        navigationOptions: {
            //Icône de personnage pour le profil
            drawerIcon: ({ profile }) => (
                <Ionicons name="md-build" size={24} color={'black'}/>
            )
        }
    },
    "Comment ça marche": {
        screen: HowItWorksStack,
        navigationOptions: {
            //Icône de personnage pour le profil
            drawerIcon: ({ profile }) => (
                <Ionicons name="md-help" size={24} color={'black'}/>
            )
        }
    },
    Paramètres: {
        screen: SettingsStack,
        navigationOptions: {
            //Icône de réglages pour changer les paramètres de l'application
            drawerIcon: ({ settings }) => (
                <Ionicons name="md-settings" size={24} color={'black'}/>
            )
        }
    }
})

//Authentification
const AuthStack = createStackNavigator({
    Connexion: Login,
    Inscription: Register
})

//Création de la navigation
//Par défaut sur l'écran de chargement
export default createAppContainer(
    createSwitchNavigator({
        Lancement: Landing,
        Chargement: Loading,
        App: AppNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: "Chargement"
    })
)