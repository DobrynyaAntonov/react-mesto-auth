import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as MestoAuth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip'
import no from '../images/неуспех.svg';
import yes from '../images/успех.svg';

function Register() {

    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [tooltipImage, setTooltipImage] = useState('');
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);



    const [tooltipText, setTooltipText] = useState('');

    function handleInfoTooltipClick() {
        setIsInfoTooltipPopupOpen(true);
    }

    function handleClosePopup() {
        if (isSuccessRegistration) {
            setIsInfoTooltipPopupOpen(false);
            navigate('/sign-in');
          }
            setIsInfoTooltipPopupOpen(false);
    }


    const navigate = useNavigate();

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

        const { email, password } = formValue;
        console.log(password, email)
        MestoAuth.register(password, email)
            .then(() => {
                setTooltipText('Вы успешно зарегистрировались!')
                setTooltipImage(yes)
                setIsSuccessRegistration(true);
            })
            .catch((err) => {
                console.log(err);
                setTooltipText('Что-то пошло не так! Попробуйте ещё раз.')
                setTooltipImage(no)
                setIsSuccessRegistration(false);
            })
    }
    return (
        <div className="popup__container-auth">
            <h2 className="popup__content-text-auth">Регистрация</h2>
            <form onSubmit={handleSubmit} className="popup__content" >
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
                    Зарегистрироваться
                </button>
            </form>

            <div className='description'>
                <p >Уже зарегистрированы?</p>
                <Link to="/sign-in" className='description-link'>Войти</Link>
            </div>
            <InfoTooltip
                img={tooltipImage}
                isOpen={isInfoTooltipPopupOpen}
                onClose={handleClosePopup}
                text={tooltipText} />
        </div >

    );
}

export default Register;