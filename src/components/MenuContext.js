import React, { useState, useEffect } from 'react';
import ContextMenu from '../styles/styles';

function MenuContext({ photoImg }) {
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
            {photoImg}
            {clicked && (
                <ContextMenu top={points.y - (50 + 50)} left={points.x}>
                    <ul>
                        <li>wally ⛑️</li>
                        <li>deimos 😈</li>
                        <li>snuffy 🐈</li>
                        <li>leo 🐈</li>
                    </ul>
                </ContextMenu>
            )}
        </div>
    );
}

export default MenuContext;
