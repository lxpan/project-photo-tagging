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

    const getPropCoords = (e) => {
        const charId = e.currentTarget.id;
        // header height needs to be subtracted later
        const header = document.querySelector('.header-container');
        const headerHeight = header.clientHeight;

        const canvas = document.querySelector('.canvas-container');
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        const propWidth = e.pageX / canvasWidth;
        // subtract the header height to get the true canvas only height
        const propHeight = (e.pageY - headerHeight) / canvasHeight;

        console.log(`Finding ${charId}`);
        console.log('Cursor coords', e.pageX, e.pageY);
        console.log('Props coords', propWidth, propHeight);
    };

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
                // console.log('Right Click', e.pageX, e.pageY);
            }}
        >
            {photoImg}
            {clicked && (
                <ContextMenu top={points.y - (50 + 50)} left={points.x}>
                    <ul>
                        <li onClick={checkLocation} id="wally">
                            wally ⛑️
                        </li>
                        <li id="deimos">deimos 😈</li>
                        <li id="snuffy">snuffy 🐈</li>
                        <li id="leo">leo 🐈</li>
                    </ul>
                </ContextMenu>
            )}
        </div>
    );
}

export default MenuContext;
