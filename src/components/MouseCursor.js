import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/MouseCursor.css';

export default function MouseCursor() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });
    // console.log(mousePosition);

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    const variantsInner = {
        default: {
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
        },
    };

    const variantsOuter = {
        default: {
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
        },
    };

    return (
        <>
            <motion.div
                className="inner-cursor"
                variants={variantsInner}
                animate="default"
                transition={{ type: 'spring', duration: 0 }}
            />
            <motion.div
                className="outer-cursor"
                variants={variantsOuter}
                animate="default"
                transition={{ type: 'spring', duration: 0 }}
            />
        </>
    );
}
