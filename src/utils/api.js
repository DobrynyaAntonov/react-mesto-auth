class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка данных профиля
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }
  //загрузка карточек на страницу
  initialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }
  //сохранение данных профиля
  editUserInfo(name, about) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }
  //добавление новых карточек
  addCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }
  //удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //добавление и удаление лайка
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch(`${this._url}cards/${cardId}/Likes`, {
      method,
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  //обновление аватара
  setAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-62/',
  headers: {
    "content-type": "application/json",
    Authorization: '9628d3d6-8ccc-41bd-966b-650c10695cc6'
  }
})

export default api
