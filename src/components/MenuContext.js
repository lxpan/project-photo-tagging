import React from 'react';
import ContextMenu from '../styles/MenuContextStyle';

function MenuContext({ points, validateCharAtLoc }) {
    return (
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
    );
}

export default MenuContext;
