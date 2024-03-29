import React, { useState, useEffect } from 'react';
import '../styles/Canvas.css';
import wallyPhoto from '../assets/photos/steampunk-wally.jpeg';
import MenuContext from './MenuContext';
import Modal from './Modal';
import WelcomeModal from './WelcomeModal';
import VictoryModal from './VictoryModal';
import FirestoreFactory from '../Firestore';

function Canvas() {
    const fs = new FirestoreFactory('characters');
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    const [modal, setModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(true);
    const [victoryModal, setVictoryModal] = useState(false);

    const [activeCharacter, setActiveCharacter] = useState(null);
    const [foundStatus, setFoundStatus] = useState(false);
    const [foundCharacters, setFoundCharacters] = useState({
        wally: false,
        leo: false,
        snuffy: false,
        deimos: false,
    });

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleWelcomeModal = () => {
        setWelcomeModal(!welcomeModal);
    };

    const toggleVictoryModal = () => {
        setVictoryModal(!victoryModal);
    };

    if (modal) {
        document.body.classList.add('active-modal');
    }
    else {
        document.body.classList.remove('active-modal');
    }

    const validateCharAtLoc = async (e) => {
        const toTitleCase = (name) => name[0].toUpperCase() + name.slice(1);

        const _charName = e.currentTarget.id;
        setActiveCharacter(toTitleCase(_charName));
        const selectionCircleCssRadius = 25;

        const result = await fs.isCharAtLoc(
            _charName,
            points.x,
            points.y,
            selectionCircleCssRadius,
        );

        // console.log(`Is ${charName} here? ${result}`);
        if (result === true) {
            // alert(`You have found ${toTitleCase(charName)}!`);
            const _found = foundCharacters;
            _found[_charName] = true;
            setFoundCharacters(_found);
            setFoundStatus(true);

            if (Object.values(foundCharacters).every((found) => found === true)) {
                toggleVictoryModal();
            }
            else {
                toggleModal();
            }

            // console.log(foundCharacters);
        }
        else {
            setFoundStatus(false);
            toggleModal();
            // alert(`${toTitleCase(charName)} is not here!`);
        }
    };

    const drawBoundingBoxes = () => {
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
    };

    // Execute the following on component load
    useEffect(() => {
        // display character bounding boxes
        // drawBoundingBoxes();

        // display "Find These Characters" modal

        // Listen for right clicks and toggle `clicked` state
        const handleClick = () => setClicked(false);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <>
            {/* This div contains both the underlying image and the right click context menu */}
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
                    // console.log('Right Click', e.pageX, e.pageY);
                }}
            >
                <img src={wallyPhoto} alt="" />
                {clicked && <MenuContext points={points} validateCharAtLoc={validateCharAtLoc} />}
            </div>
            {welcomeModal && <WelcomeModal toggleWelcomeModal={toggleWelcomeModal} />}
            {victoryModal && <VictoryModal toggleVictoryModal={toggleVictoryModal} />}
            {modal && (
                <Modal toggleModal={toggleModal} charName={activeCharacter} isFound={foundStatus} />
            )}
            <canvas id="canvas" width={1920} height={1870}></canvas>
        </>
    );
}

export default Canvas;
