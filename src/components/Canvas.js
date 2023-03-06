import React from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';

export default function Canvas() {
    return (
        <div className="canvas-container">
            <img src={wallyPhoto} alt="" />
        </div>
    );
}
