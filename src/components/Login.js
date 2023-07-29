import React from 'react';
import { useState } from 'react';
import * as MestoAuth from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import no from '../images/неуспех.svg';
import InfoTooltip from './InfoTooltip'

function Login({ handleLogin }) {

    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [tooltipImage, setTooltipImage] = useState('');
    const [tooltipText, setTooltipText] = useState('');
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);

    const navigate = useNavigate();

    function handleInfoTooltipClick() {
        if (isSuccessRegistration) {
            setIsInfoTooltipPopupOpen(false);
          }
            return;
    }

    function handleClosePopup() {
                setIsInfoTooltipPopupOpen(false);
    }

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.password || !formValue.email) {
            return;
        }

        const { password, email } = formValue;

        MestoAuth.authorize(password, email)
            .then(() => {
                handleLogin(email);
                navigate('/');
                setIsSuccessRegistration(true);
            })
            .catch(err => {
                setIsInfoTooltipPopupOpen(true);
                setTooltipText('Неверный логин или пароль. Проверьте данные и повторите попытку снова.');
                setTooltipImage(no);
                console.log(err);
            });
    }

    return (
        <div onSubmit={handleSubmit} className="popup__container-auth">
            <h2 className="popup__content-text-auth">Вход</h2>
            <form className="popup__content" >
                <input
                    id="input-email"
                    required=""
                    name='email'
                    minLength={2}
                    maxLength={40}
                    className="popup__input-form-auth  popup__input-form_type_name"
                    type="email"
                    value={formValue.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <span id="input-name-error" className="error" />
                <input
                    id="input-password"
                    required=""
                    name='password'
                    minLength={2}
                    maxLength={200}
                    className="popup__input-form-auth  popup__input-form_type_job"
                    type="password"
                    value={formValue.password}
                    placeholder="Пароль"
                    onChange={handleChange}

                />
                <span id="input-job-error" className="error" />
                <button onClick={handleInfoTooltipClick} className="popup__submit-auth" type="submit">
                    Войти
                </button>
            </form>
            <InfoTooltip
                img={tooltipImage}
                isOpen={isInfoTooltipPopupOpen}
                onClose={handleClosePopup}
                text={tooltipText} />
        </div >

    );
}

export default Login;