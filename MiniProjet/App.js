//App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
//Base de données
import * as firebase from 'firebase'
//redux
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

//Configuration de la base de données
var firebaseConfig = {
  apiKey: "AIzaSyDfW_YIF_jqVTAIvYfdTvBnWLr2bYnjkgs",
  authDomain: "miniprojet-be5b6.firebaseapp.com",
  databaseURL: "https://miniprojet-be5b6.firebaseio.com",
  projectId: "miniprojet-be5b6",
  storageBucket: "miniprojet-be5b6.appspot.com",
  messagingSenderId: "450566010742",
  appId: "1:450566010742:web:b274e03f3c83f9568dac57"
};

//Initialisation de Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}