import React, { useState, useEffect } from 'react';
import FirestoreFactory from '../Firestore';
import ContextMenu from '../styles/styles';

function MenuContext({ photoImg }) {
    const fs = FirestoreFactory('characters');

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

    // returns the proportional (to container height/width) coords
    const getPropCursorCoords = (cursorX, cursorY) => {
        const header = document.querySelector('.header-container');
        const headerHeight = header.clientHeight;

        const canvas = document.querySelector('.canvas-container');
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        const propWidth = cursorX / canvasWidth;
        // subtract the header height to get the true canvas only height
        const propHeight = (cursorY - headerHeight) / canvasHeight;
        // console.log('Cursor coords', cursorX, cursorY);
        // console.log('Props coords', propWidth, propHeight);

        return [propWidth, propHeight];
    };

    // converts a set of proportional image coordinates to actual size coordinates (base coords)
    const mapPropCoordsToOriginal = (pWidth, pHeight) => {
        // size of the actual Where's Wally image
        const imgWidth = 5356;
        const imgHeight = 4961;
        // convert the proportional (relative) coordinates to full blown sizes
        const baseX = pWidth * imgWidth;
        const baseY = pHeight * imgHeight;
        return [baseX, baseY];
    };

    const validateCharAtLoc = async (e) => {
        const charName = e.currentTarget.id;
        // todo: this wall have to be converted too
        const selectionCircleSize = 50;

        const result = await fs.isCharAtLoc('Wally', e.pageX, e.pageY, selectionCircleSize);
        console.log(`Is ${charName} here? ${result}`);
        // console.log(charName);
        // const docs = await fs.getDocuments();
        // console.log(docs);

        const [propWidth, propHeight] = getPropCursorCoords(e.pageX, e.pageY);
        const baseCoords = mapPropCoordsToOriginal(propWidth, propHeight);

        console.log(baseCoords);
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
                        <li onClick={validateCharAtLoc} id="wally">
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
