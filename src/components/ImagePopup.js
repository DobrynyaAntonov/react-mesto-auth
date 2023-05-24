import React from 'react';

function ImagePopup({ card, onClose }) {
    const isOpen = Boolean(card);
    return (
        <section className={`popup image-popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container-image">
                <img className="popup__foto" src={card?.link} alt={card?.name} />
                <button className="popup__close" type="button" onClick={onClose} />
                <h2 className="popup__text">{card?.name}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;
