import React from 'react';
import '../styles/Modal.css';

function Modal({
    toggleModal, charName, isFound, isWelcome,
}) {
    const showModalMessage = (found) => {
        if (isWelcome) {
            return (
                <>
                    <h2 className="modal-content-heading">Welcome!</h2>
                    <p className="modal-content-text">
                        Your objective is to find Wally (Waldo), Snuffy, Leo and Deimos the
                        Gargoyle.{' '}
                    </p>
                </>
            );
        }
        if (found) {
            return (
                <>
                    <h2 className="modal-content-heading">Well done!</h2>
                    <p className="modal-content-text">You have found {charName}!</p>
                </>
            );
        }
        return (
            <>
                <h2 className="modal-content-heading">Try again!</h2>
                <p className="modal-content-text">{charName} is not there!</p>
            </>
        );
    };

    return (
        <>
            {/* <button onClick={toggleModal} className="btn-modal">
                Open
            </button> */}

            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    {showModalMessage(isFound)}
                    <button onClick={toggleModal} className="close-modal">
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}

export default Modal;
