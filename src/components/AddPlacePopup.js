import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="input-add"
                required
                minLength={2}
                maxLength={30}
                className="popup__input-form popup__input-form_type_name-image"
                type="text"
                value={name}
                name="name"
                placeholder="Название"
                onChange={handleNameChange}
            />
            <span id="input-add-error" className="error" /> <input
                id="input-link"
                required
                className="popup__input-form popup__input-form_type_src-image"
                type="url"
                value={link}
                name="link"
                placeholder="Ссылка на картинку"
                onChange={handleLinkChange}
            />
            <span id="input-link-error" className="error" />
        </PopupWithForm>);
}

export default AddPlacePopup;