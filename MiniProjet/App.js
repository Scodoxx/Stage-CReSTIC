//App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from './Components/LoadingScreen'
import LoginScreen from './Components/LoginScreen'
import RegisterScreen from './Components/RegisterScreen'
import HomeScreen from './Components/HomeScreen'
//Base de données
import firebase from 'firebase'


//Configuration de la base de données
const firebaseConfig = {
  apiKey: "AIzaSyDfW_YIF_jqVTAIvYfdTvBnWLr2bYnjkgs",
  authDomain: "miniprojet-be5b6.firebaseapp.com",
  databaseURL: "https://miniprojet-be5b6.firebaseio.com",
  projectId: "miniprojet-be5b6",
  storageBucket: "miniprojet-be5b6.appspot.com",
  messagingSenderId: "450566010742"
};

//Initialisation de Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

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

console.log(firebase.name)