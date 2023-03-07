import React, { useState, useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';
import MenuContext from './MenuContext';

function Canvas() {
    const img = <img src={wallyPhoto} alt="" />;

    return (
        <div className="canvas-container">
            <MenuContext photoImg={img} />
        </div>
    );
}

export default Canvas;
