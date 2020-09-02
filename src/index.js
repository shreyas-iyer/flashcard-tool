import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import {composeWithDevTools} from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyCXnrZaatZHmYCJJxcHeIylBK-OGOft5As",
  authDomain: "bootcamp-4fe2f.firebaseapp.com",
  databaseURL: "https://bootcamp-4fe2f.firebaseio.com",
  projectId: "bootcamp-4fe2f",
  storageBucket: "bootcamp-4fe2f.appspot.com",
  messagingSenderId: "983218155945",
  appId: "1:983218155945:web:69f24e873d8225e47a94b8"
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const store = createStore(rootReducer, composeWithDevTools());

const rrfConfig = {
  preserveOnLogout: ['homepage'],
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
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
