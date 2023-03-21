import React from 'react';
import '../styles/Modal.css';

function VictoryModal({ toggleVictoryModal }) {
    const showModalMessage = () => (
        <>
            <h2 className="modal-content-heading">Congratulations!</h2>
            <p className="modal-content-text">You have found them all!</p>
        </>
    );

    return (
        <>
            <div className="modal">
                <div onClick={toggleVictoryModal} className="overlay"></div>
                <div className="modal-content">
                    {showModalMessage()}
                    <button onClick={toggleVictoryModal} className="close-modal">
                        CLOSE
                    </button>
                </div>
            </div>
        </>
    );
}

export default VictoryModal;
