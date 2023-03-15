import React, { useState, useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';
import MenuContext from './MenuContext';
import FirestoreFactory from '../Firestore';

function Canvas() {
    const img = <img src={wallyPhoto} alt="" />;

    useEffect(() => {
        const fs = new FirestoreFactory('characters');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const getBoundingBox = async () => {
            const backendBoundingBox = await fs.getDocuments();

            ctx.strokeStyle = 'lightgreen';
            ctx.lineWidth = 1.5;

            Object.entries(backendBoundingBox).forEach(([charName, box]) => {
                if (charName.toLowerCase().includes('test')) {
                    return;
                }
                ctx.strokeRect(box.x, box.y, box.w, box.h);
            });
        };

        getBoundingBox();

        // Object.values(boundingBoxes).forEach((chara) => {
        //     ctx.strokeRect(chara.x, chara.y, chara.w, chara.h);
        // });
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
