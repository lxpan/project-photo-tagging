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

    const validateCharAtLoc = async (e) => {
        const toTitleCase = (name) => name[0].toUpperCase() + name.slice(1);

        const charName = e.currentTarget.id;
        const selectionCircleCssRadius = 25;

        const result = await fs.isCharAtLoc(charName, points.x, points.y, selectionCircleCssRadius);

        console.log(`Is ${charName} here? ${result}`);
        if (result === true) {
            alert(`You have found ${toTitleCase(charName)}!`);
        }
        else {
            alert(`${toTitleCase(charName)} is not here!`);
        }
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
                // NB: the cursor location assigned to points state should be used above
                // and NOTE the cursor locations at validateCharAtLoc (event object from <li>)
                console.log('Right Click', e.pageX, e.pageY);
            }}
        >
            {photoImg}
            {clicked && (
                <ContextMenu top={points.y - (50 + 50)} left={points.x}>
                    <ul>
                        <li onClick={validateCharAtLoc} id="wally">
                            wally ⛑️
                        </li>
                        <li onClick={validateCharAtLoc} id="deimos">
                            deimos 😈
                        </li>
                        <li onClick={validateCharAtLoc} id="snuffy">
                            snuffy 🐈
                        </li>
                        <li onClick={validateCharAtLoc} id="leo">
                            leo 🐈
                        </li>
                    </ul>
                </ContextMenu>
            )}
        </div>
    );
}

export default MenuContext;
