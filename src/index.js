import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyCMJeOoyUkpZ7b3QhqEzL3y2o-BKGmEBj8",
    authDomain: "bootcamp1-9897d.firebaseapp.com",
    databaseURL: "https://bootcamp1-9897d.firebaseio.com",
    projectId: "bootcamp1-9897d",
    storageBucket: "bootcamp1-9897d.appspot.com",
    messagingSenderId: "373568203960",
    appId: "1:373568203960:web:c7f62bcc298fb7bf7cd84d"
  };

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    // firestore: firestoreReducer // <- needed if using firestore
});
  
// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
  };

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App /> 
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root'),
);