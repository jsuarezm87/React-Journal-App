import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCuz2JW3lm1epYD7Sdbe2KEDONqk3A2Vsc",
    authDomain: "react-app-f0593.firebaseapp.com",
    projectId: "react-app-f0593",
    storageBucket: "react-app-f0593.appspot.com",
    messagingSenderId: "553648757692",
    appId: "1:553648757692:web:76d98a47606b7d2ece69b9"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}