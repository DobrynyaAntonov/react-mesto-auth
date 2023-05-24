import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Card(props) {
    const { card } = props;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    return (
        <div className="element">
            {isOwn && <button className="element__delete" type="button" aria-label="удаление карточки"  onClick={handleDeleteClick} />} 
            <img className="element__foto" src={card.link} alt={card.name} aria-label="фото" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick} />
            <div className="element__container">
                <h2 className="element__text">{card.name}</h2>
                <button className= {cardLikeButtonClassName} type="button" aria-label="кнопка нравится" onClick={handleLikeClick}></button>
                <span className="element__number-like">{card.likes.length}</span>
            </div>
        </div>
    );
}

export default Card;
