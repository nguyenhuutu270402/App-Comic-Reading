import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3KOAJssc3QI9B_w3akpOR8JIbxmvDukM",
    authDomain: "app-comic-reading.firebaseapp.com",
    projectId: "app-comic-reading",
    storageBucket: "app-comic-reading.appspot.com",
    messagingSenderId: "1024516652336",
    appId: "1:1024516652336:web:064b747370c207cbbbdcf5",
    measurementId: "G-9XJVQ0H0CV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };