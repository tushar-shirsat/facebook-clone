// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyA8p7xAGuwoNIH0YRVRKXnKy0Yv8gsDtqk",
    authDomain: "facebook-clone-8813b.firebaseapp.com",
    projectId: "facebook-clone-8813b",
    storageBucket: "facebook-clone-8813b.appspot.com",
    messagingSenderId: "406649574774",
    appId: "1:406649574774:web:efd5191be29c9bd8899657",
    measurementId: "G-6QKPV46PJF"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export {db,storage};