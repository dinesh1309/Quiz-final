import * as firebase from 'firebase';



var firebaseConfig = {
  apiKey: "AIzaSyDx_x6ixnFNrCcU22mEcUeKPjWvOGtbZnE",
    authDomain: "questions-14a25.firebaseapp.com",
    databaseURL: "https://questions-14a25.firebaseio.com",
    projectId: "questions-14a25",
    storageBucket: "questions-14a25.appspot.com",
    messagingSenderId: "65570614898",
    appId: "1:65570614898:web:924322edbbea8fa35c9ceb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();

export default firebase;