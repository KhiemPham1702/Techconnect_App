// Import the functions you need from the SDKs you need
import { firebase, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, query, onSnapshot, doc, deleteDoc
, updateDoc, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQx2_eZP5Rw4fVSitUlTDV1laxNMsJqWI",
    authDomain: "techconnectapp-ab4d5.firebaseapp.com",
    databaseURL: "https://techconnectapp-ab4d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "techconnectapp-ab4d5",
    storageBucket: "techconnectapp-ab4d5.appspot.com",
    messagingSenderId: "914891744917",
    appId: "1:914891744917:web:0b18fd8363228166629d9c",
    measurementId: "G-M6KLPRB8XG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDoc, getDocs, query, onSnapshot, doc, deleteDoc, updateDoc, where};