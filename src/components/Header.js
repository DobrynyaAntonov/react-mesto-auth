import logo from '../images/logo/logo.svg';
import React from "react";
import '../index.css';
import { Link } from 'react-router-dom';

function Header({path, text,  userData}) {

  function signOut() {
    localStorage.removeItem('token');
    // navigate('/sign-up');
  }
  const {  email } = userData;
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="лого проекта mesto (Россия)"
      />
      <p className="header-email" >{email}</p>
       <Link onClick={signOut} to={path} className="header-link">{text}</Link>
    </header>
  )
}

export default Header;