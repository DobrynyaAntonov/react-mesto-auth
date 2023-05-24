import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
    const ref = useRef();

    useEffect(() => {
        if (props.isOpen) {
            ref.current.value = '';
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            link: ref.current.value,
        });
    }

    return <>
        <PopupWithForm name="avatar" title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить" >
            <input
                id="input-avatar-link"
                required=""
                className="popup__input-form popup__input-form_type_src-image"
                type="url"
                defaultValue=""
                name="avatar"
                placeholder="Ссылка на картинку"
                ref={ref}
            />
            <span id="input-avatar-link-error" className="error" />
        </PopupWithForm>
    </>
}

export default EditAvatarPopup
