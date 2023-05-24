import React from 'react';

function InfoTooltip({ img, isOpen, onClose,  text}) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose} ></button>
                <img className="popup__content" src={img} />
                    <p className="popup__tooltip">
                        {text}
                    </p>
            </div>
        </section>
    );
}

export default InfoTooltip;