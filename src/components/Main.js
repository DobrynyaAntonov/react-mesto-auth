import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../index.css';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardDelete, onCardLike}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile" aria-label="Секция с профилем">
                <button className="profile__button-avatar" onClick={onEditAvatar}>
                    <img className="profile__avatar" alt="аватарка" src={currentUser.avatar} />
                </button>
                <div className="profile__info">
                    <h1 className="profile__info-name">{currentUser.name}</h1>
                    <p className="profile__info-job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__button-edit"
                    type="button"
                    aria-label="кнопка редактирования профиля"
                    onClick={onEditProfile}
                ></button>
                <button
                    className="profile__button-add"
                    type="button"
                    aria-label="кнопка отправки текста"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section id="elements" className="elements" aria-label="Секция с фото">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                ))}
            </section>
        </main>

    )
}

export default Main;
