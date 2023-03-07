import React, { useState, useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';

function Canvas() {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div
            className="canvas-container"
            onContextMenu={(e) => {
                e.preventDefault();
                setClicked(true);
                setPoints({
                    x: e.pageX,
                    y: e.pageY,
                });
                console.log('Right Click', e.pageX, e.pageY);
            }}
        >
            <img src={wallyPhoto} alt="" />
        </div>
    );
}

export default Canvas;
