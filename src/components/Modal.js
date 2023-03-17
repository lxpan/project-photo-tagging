import React from 'react';
import '../styles/Modal.css';

function Modal({ toggleModal, charName, isFound }) {
    const showModalMessage = (found) => {
        if (found) {
            return (
                <>
                    <h2 className="modal-content-heading">well done!</h2>
                    <p className="modal-content-text">you have found {charName}!</p>
                </>
            );
        }
        return (
            <>
                <h2 className="modal-content-heading">try again!</h2>
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
