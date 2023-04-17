// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set, onValue, child, get, push, update, runTransaction, increment  } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz2-pCJJ-k433CUiu7Ibpiah8G_XVxyvQ",
    authDomain: "mobile-550f2.firebaseapp.com",
    databaseURL: "https://mobile-550f2-default-rtdb.firebaseio.com",
    projectId: "mobile-550f2",
    storageBucket: "mobile-550f2.appspot.com",
    messagingSenderId: "69310554328",
    appId: "1:69310554328:web:45105e94dd7f2a20ecb7ad",
    measurementId: "G-MQ5MCJ4LFS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const storage = getStorage();

const auth = getAuth(app);

export { db, ref, set, onValue, child, get, push, 
    update, runTransaction, increment, storage, auth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword
};