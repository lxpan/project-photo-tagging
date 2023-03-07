import React, { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, doc, getDocs, setDoc, deleteDoc,
} from 'firebase/firestore';
// Components
import Header from './components/Header';
import Canvas from './components/Canvas';
import MouseCursor from './components/MouseCursor';
// CSS
import './styles/App.css';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDpAI5r_jWjU1aNFIqONr_sdHrDJAX7VP0',
    authDomain: 'wheres-wally-789b9.firebaseapp.com',
    projectId: 'wheres-wally-789b9',
    storageBucket: 'wheres-wally-789b9.appspot.com',
    messagingSenderId: '906692154300',
    appId: '1:906692154300:web:327b1ae82ad7d4f58bd1b9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db);

function App() {
    return (
        <div className="App">
            <Header />
            <Canvas />
            <MouseCursor />
        </div>
    );
}

export default App;
