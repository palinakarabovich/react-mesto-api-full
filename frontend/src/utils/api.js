class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Номер ошибки: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponse);
  }


  getUserInfo() {
    return fetch(this._userUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponse);
  }

  saveUserChanges({ name, about }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  changeAvatar({ link }) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);
  }

  toggleLike(card, isLiked) {
    if (isLiked) {
      return fetch(`${this._cardsUrl}/${card}/likes`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(this._checkResponse);
    }
    else {
      return fetch(`${this._cardsUrl}/${card}/likes`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(this._checkResponse);
    }
  }
}

const api = new Api({
  baseUrl: 'https://apipalinakarabovich.mesto.nomoredomains.icu'
});

export default api;
