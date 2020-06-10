//Navigation.js

//Navigation
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
//Barre de navigation en bas
import { createBottomTabNavigator } from 'react-navigation-tabs'
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
import Telling from '../Components/Telling'
import PasswordSettings from '../Components/PasswordSettings'
import EmailSettings from '../Components/EmailSettings'
import SensationPhysique from '../Components/SensationPhysique'
import RessentirLaSensation from '../Components/RessentirLaSensation'
import Meditation from '../Components/Meditation'
import Question from '../Components/Question'
import FamilleEmotions from '../Components/FamilleEmotions'
import Joie from '../Components/Joie'
import Colere from '../Components/Colere'
import Peur from '../Components/Peur'
import Tristesse from '../Components/Tristesse'
import Degout from '../Components/Degout'
import Surprise from '../Components/Surprise'
import QuelleEmotion from '../Components/QuelleEmotion'
import aPresent from '../Components/aPresent'

//Accueil une fois l'utilisateur connecté
const HomeStack = createStackNavigator({
    Accueil: {
        screen: Home
    },
    Perception: {
        screen: Perception
    },
    "Je raconte": {
        screen: Telling
    },
    "Sensation physique": {
        screen: SensationPhysique
    },
    "Ressentir la sensation": {
        screen: RessentirLaSensation
    },
    "Méditation": {
        screen: Meditation
    },
    "Question": {
        screen: Question
    },
    "Émotions": {
        screen: FamilleEmotions
    },
    "Joie": {
        screen: Joie
    },
    "Colère": {
        screen: Colere
    },
    "Peur": {
        screen: Peur
    },
    "Tristesse": {
        screen: Tristesse
    },
    "Dégoût": {
        screen: Degout
    },
    "Surprise": {
        screen: Surprise
    },
    "Quelle émotion ?": {
        screen: QuelleEmotion
    },
    "A présent ?": {
        screen: aPresent
    }
})

//Consulter et modifier son profil
const ProfileStack = createStackNavigator({
    Profil: {
        screen: Profile
    },
    "Modifier le profil": {
        screen: ProfileSettings
    },
    "Modifier le mot de passe": {
        screen: PasswordSettings
    },
    "Modifier l'adresse mail": {
        screen: EmailSettings
    }
})

//Accéder aux différents outils pour EmoVision
const ToolsStack = createStackNavigator({
    Outils: {
        screen: Tools
    }
})

//Comment est-ce que l'application fonctionne ?
const HowItWorksStack = createStackNavigator({
    "Comment ça marche ?": {
        screen: HowItWorks
    }
})

//Modifier certains paramètres de l'application
const SettingsStack = createStackNavigator({
    Réglages: {
        screen: AppSettings
    }
})

//On construit une navigation entre les différents écrans
//Barre de navigation une fois connecté
const AppTabNavigator = createBottomTabNavigator(
    {
        Accueil: {
            screen: HomeStack,
            navigationOptions: {
                //Icône de maison pour la page home
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
            }
        },
        Profil: {
            screen: ProfileStack,
            navigationOptions: {
                //Icône de fleur pour la photo des oiseaux
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
            }
        },
        Outils: {
            screen: ToolsStack,
            navigationOptions: {
                //Icône de fleur pour la photo des oiseaux
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-build" size={24} color={tintColor}></Ionicons>
            }
        },
        "Aide": {
            screen: HowItWorksStack,
            navigationOptions: {
                //Icône de fleur pour la photo des oiseaux
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-help" size={24} color={tintColor}></Ionicons>
            }
        },
        Paramètres: {
            screen: SettingsStack,
            navigationOptions: {
                //Icône de fleur pour la photo des oiseaux
                tabBarIcon: ({tintColor}) => <Ionicons name="ios-settings" size={24} color={tintColor}></Ionicons>
            }
        }
    }
)

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
        App: AppTabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: "Chargement"
    })
)