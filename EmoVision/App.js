import React from 'react';
import Navigation from './Navigation/Navigation'

//Base de données
import * as firebase from 'firebase'

//Configuration de la base de données (la même base que celle du MiniProjet)
var firebaseConfig = {
  apiKey: "AIzaSyCIcI535870dRbWe7G_NN9vAxamuY9Wals",
  authDomain: "emovision-49b33.firebaseapp.com",
  databaseURL: "https://emovision-49b33.firebaseio.com",
  projectId: "emovision-49b33",
  storageBucket: "emovision-49b33.appspot.com",
  messagingSenderId: "922397930915",
  appId: "1:922397930915:web:84c4a977a2c969e3621616",
  measurementId: "G-X59WSCJ3N7"
};

//Initialisation de Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//Redux
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}