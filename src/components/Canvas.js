import React, { useState, useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';
import MenuContext from './MenuContext';

const boundingBoxes = {
    deimos: {
        x: 502,
        y: 192,
        w: 120,
        h: 160,
    },

    snuffy: {
        x: 392,
        y: 962,
        w: 50,
        h: 50,
    },

    leo: {
        x: 648,
        y: 1051,
        w: 80,
        h: 60,
    },
    wally: {
        x: 1602,
        y: 683,
        w: 20,
        h: 20,
    },
};

function Canvas() {
    const img = <img src={wallyPhoto} alt="" />;

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'lightgreen';
        ctx.lineWidth = 1.5;

        Object.values(boundingBoxes).forEach((chara) => {
            ctx.strokeRect(chara.x, chara.y, chara.w, chara.h);
        });
    }, []);

    return (
        <>
            <div className="canvas-container">
                <MenuContext photoImg={img} />
            </div>
            <canvas id="canvas" width={1920} height={1870}></canvas>
        </>
    );
}

export default Canvas;
