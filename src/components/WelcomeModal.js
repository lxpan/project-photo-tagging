import React from 'react';
import '../styles/Modal.css';

function WelcomeModal({ toggleWelcomeModal }) {
    const showModalMessage = () => (
        <>
            <h2 className="modal-content-heading">Welcome!</h2>
            <p className="modal-content-text">
                Your objective is to find Wally, Leo, Snuffy and Deimos. Right click on any location
                in the room to bring up a menu of characters to find.
            </p>
            <h2 className="modal-content-heading">Hints</h2>
            <ul className="modal-content-ul">
                <li>Wally is wearing red and white</li>
                <li>Leo is a naughty cat</li>
                <li>Snuffy is a curious cat</li>
                <li>Deimos is a gargoyle</li>
            </ul>
        </>
    );

    return (
        <>
            <div className="modal">
                <div onClick={toggleWelcomeModal} className="overlay"></div>
                <div className="modal-content">
                    {showModalMessage()}
                    <button onClick={toggleWelcomeModal} className="close-modal">
                        CLOSE
                    </button>
                </div>
            </div>
        </>
    );
}

export default WelcomeModal;
