import React, { useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';

function Canvas() {
    console.log('Load Canvas.');

    return (
        <div
            className="canvas-container"
            onContextMenu={(e) => {
                e.preventDefault();
                console.log('Right Click');
            }}
        >
            <img src={wallyPhoto} alt="" />
        </div>
    );
}

export default Canvas;
