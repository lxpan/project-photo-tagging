import React, { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, doc, getDocs, setDoc, deleteDoc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
// Components
import Header from './components/Header';
import Canvas from './components/Canvas';
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
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });
    // console.log(mousePosition);

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    const variantsInner = {
        default: {
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
        },
    };

    const variantsOuter = {
        default: {
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
        },
    };

    return (
        <div className="App">
            <Header />
            <Canvas />
            <motion.div
                className="inner-cursor"
                variants={variantsInner}
                animate="default"
                transition={{ type: 'spring', duration: 0 }}
            />
            <motion.div
                className="outer-cursor"
                variants={variantsOuter}
                animate="default"
                transition={{ type: 'spring', duration: 0 }}
            />
        </div>
    );
}

export default App;
