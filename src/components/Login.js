import React from 'react';
import { useState } from 'react';
import * as MestoAuth from '../MestoAuth.js';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {

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

        if (!formValue.password || !formValue.email) {
            return;
          }

        const { password, email } = formValue;

        MestoAuth.authorize(password, email)
          .then(data => {
            if (data.token) {
              localStorage.setItem('token', data.token);
              handleLogin(email);
              navigate('/card');
            }
          })
          .catch(err => {
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
                <button className="popup__submit-auth" type="submit">
                    Войти
                </button>
            </form>
            </div >
      
    );
}

export default Login;