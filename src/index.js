import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyDRFFNkBxWHX7Gzy3Jag04D0Wnb2OPwyG8",
  authDomain: "quiz-b60f8.firebaseapp.com",
  databaseURL: "https://quiz-b60f8.firebaseio.com",
  projectId: "quiz-b60f8",
  storageBucket: "quiz-b60f8.appspot.com",
  messagingSenderId: "10406340831",
  appId: "1:10406340831:web:66fff03848571381a1216a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
