import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);


    useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser, props.isOpen]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="input-name"
                required=""
                minLength={2}
                maxLength={40}
                className="popup__input-form popup__input-form_type_name"
                type="text"
                name="name"
                value={name || ""}
                placeholder="введите имя"
                onChange={handleNameChange}
            />
            <span id="input-name-error" className="error" />
            <input
                id="input-job"
                required=""
                minLength={2}
                maxLength={200}
                className="popup__input-form popup__input-form_type_job"
                type="text"
                name="job"
                value={description || ""}
                placeholder="описание работы"
                onChange={handleDescriptionChange}
            />
            <span id="input-job-error" className="error" />
        </PopupWithForm>
    );
}

export default EditProfilePopup;
