import React, { useState, useEffect } from 'react';
import FirestoreFactory from './Firestore';
// Components
import Header from './components/Header';
import Canvas from './components/Canvas';
import MouseCursor from './components/MouseCursor';
// CSS
import './styles/App.css';

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
