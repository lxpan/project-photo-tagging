import React from 'react';
import ContextMenu from '../styles/MenuContextStyle';

const CHARACTERS = {
    wally: 'wally ⛑️',
    deimos: 'deimos 😈',
    snuffy: 'snuffy 🐈',
    leo: 'leo 🐈',
};

function MenuContext({ points, validateCharAtLoc }) {
    return (
        <ContextMenu top={points.y - (50 + 50)} left={points.x}>
            <ul>
                {Object.entries(CHARACTERS).map(([name, menuText]) => (
                    <li key={name} onClick={validateCharAtLoc} id={name}>
                        {menuText}
                    </li>
                ))}
            </ul>
        </ContextMenu>
    );
}

export default MenuContext;
