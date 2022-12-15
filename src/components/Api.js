class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }
  
   editInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: info.userName,
            about: info.userActivity
          })
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

   addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link
          })
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

   dltCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

   dltLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

   addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

   editAvatar(info) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: info.userAvatar
        })
    }).then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
   }

  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
      authorization: 'b683a709-1f85-436d-906e-4c3cc0b952c5',
      'Content-Type': 'application/json'
    }
  });