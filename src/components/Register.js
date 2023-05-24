import React from 'react';
import './styles/Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as MestoAuth from '../MestoAuth.js';
import InfoTooltip from './InfoTooltip'
import no from '../images/неуспех.svg';
import yes from '../images/успех.svg';

function Register() {

    const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState(false);
    const [image, setimage] = useState('');


    const [text, setText] = useState('');

    function handleInfoTooltipClick() {
        setisInfoTooltipPopupOpen(true);
    }

    function handleClosePopup(data) {
        if (typeof data != "string"){
            setisInfoTooltipPopupOpen(false);
            navigate('/sign-in')
        } else {
            setisInfoTooltipPopupOpen(false);
        }
       
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
                setText('Вы успешно зарегистрировались!')
                handleInfoTooltipClick('next');
                setimage(yes)
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltipClick(2);
                setText('Что-то пошло не так! Попробуйте ещё раз.')
                setimage(no)
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
                img={image}
                isOpen={isInfoTooltipPopupOpen}
                onClose={handleClosePopup}
                text={text} />
        </div >

    );
}

export default Register;