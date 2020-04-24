//Navigation.js

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from '../Components/LoadingScreen'
import LoginScreen from '../Components/LoginScreen'
import RegisterScreen from '../Components/RegisterScreen'
import HomeScreen from '../Components/HomeScreen'

//On construit une navigation entre les différents écrans
//Accueil
const AppStack = createStackNavigator({
    Accueil: HomeScreen
})

//Authentification
const AuthStack = createStackNavigator({
    Connexion: LoginScreen,
    Inscription: RegisterScreen
})

//Création de la navigation
//Par défaut sur l'écran de chargement
export default createAppContainer(
    createSwitchNavigator({
        Chargement: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: "Chargement"
    })
)