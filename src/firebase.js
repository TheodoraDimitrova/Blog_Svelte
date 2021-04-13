import firebase from 'firebase/app'

import 'firebase/auth'

import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyC7_TH-pLCFPT6vhQiQtCCdH--GiYQLpzs",
    authDomain: "blogsvelte-d0499.firebaseapp.com",
    projectId: "blogsvelte-d0499",
    storageBucket: "blogsvelte-d0499.appspot.com",
    messagingSenderId: "370196749000",
    appId: "1:370196749000:web:23b32e3ed80fbf0004a3fd",
    measurementId: "G-GSQFG39MJP"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()

