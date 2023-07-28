import '../index.css';
import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { ProtectedRoute } from './ProtectedRoute'
import * as MestoAuth from '../utils/auth.js';

function App() {
  // Переменные состояния для отображения попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cardForDelete, setCardForDelete] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({ email: '' });
  const navigate = useNavigate();

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserData({ email });
  }

  const checkToken = () => {
    MestoAuth.checkToken()
      .then((data) => {
        if (data) {
          handleLogin(data.email);
          setLoggedIn(true)
          navigate('/')
        } else {
          setLoggedIn(false)
        }
      })
      .catch((err) => { 
        setLoggedIn(false);
        console.log(err);
       
       })

  }
  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //переменные состояния для currentUser
  const [currentUser, setCurrentUser] = useState({});

  // эффект при монтировании компонента
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.initialCards()
        .then((res) => {
          setCards(res.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(userId => userId === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setCardForDelete(card)
  }

  function cardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчик клика по кнопке редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Обработчик клика по кнопке редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Обработчик клика по кнопке добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card); // Задаем выбранную карточку в переменную состояния
  }

  // Обработчик закрытия попапов
  function handleClosePopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null);
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData.name, userData.about)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar({ link }) {
    api.setAvatar(link)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSubmitDeleteCard (event) {
    event.preventDefault()
    cardDelete(cardForDelete)
    setCardForDelete(null)
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>


        <Routes>
          <Route path="/" element={<>
            <Header path='/signin' text='Выйти' userData={userData} loggedIn={loggedIn} />
            <ProtectedRoute element={Main}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              loggedIn={loggedIn}
            />
          </>} />

          <Route path='/signup' element={<>
            <Header path='/signin' text='Войти' userData={''} loggedIn={loggedIn} />
            <Register />
          </>} />

          <Route path='/signin' element={<>
            <Header path='/signup' text='Регистрация' userData={''} loggedIn={loggedIn} />
            <Login handleLogin={handleLogin} />
          </>} />

          {loggedIn ? (
            <Route path="/*" element={<Navigate to='/' replace />} />
          ) : (
            <Route path="/*" element={<Navigate to='/signin' replace />} />
          )}
        </Routes>


        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm
          isOpen={!!cardForDelete}
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
          onClose={handleClosePopups}
          onSubmit={handleSubmitDeleteCard} />
        <ImagePopup

          card={selectedCard}
          onClose={handleClosePopups} />
      </CurrentUserContext.Provider>
    </>

  );
}

export default App;
