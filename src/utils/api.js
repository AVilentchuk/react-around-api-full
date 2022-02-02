const customFetch = (url, properties) =>
  fetch(url, properties).then((response) => {
    console.log(response);
    if (response.ok) return response.json();
    return Promise.reject(
      `Failed with status:( ${response.status} ${response.statusText} )`
    );
  });

class Api {
  constructor({ groupId, token, baseUrl }) {
    this.groupId = groupId;
    this.token = token;
    this.baseUrl = baseUrl;
  }

  getInitialCards() {
    return customFetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  postNewCard(cardData) {
    return customFetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`,
      }),
    });
  }

  deleteCardPost(cardId) {
    return customFetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.token}`,
      },
    });
  }

  getProfile() {
    return customFetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `${this.token}`,
      },
    });
  }

  updateProfile({ name, about }) {
    return customFetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
        _id: `${this.token}`,
        cohort: ``,
      }),
    });
  }

  updateProfilePhoto(avatarLink) {
    return customFetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    });
  }

  likePhoto(cardId) {
    return customFetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: "PUT",
      headers: {
        authorization: `${this.token}`,
      },
    });
  }

  dislikePhoto(cardId) {
    return customFetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: "Delete",
      headers: {
        authorization: `${this.token}`,
      },
    });
  }
  updateToken() {
    this.token = `Bearer ${localStorage.getItem("jwt")}`;
  }
}
const options = {
  // baseUrl: "https://avilentchuk.students.nomoreparties.sbs/",
  baseUrl: "http://avilentchuk2.students.nomoreparties.sbs",
  token: `Bearer ${localStorage.getItem("jwt")}`,
  groupId: "group-12",
};

const api = new Api(options);
export { customFetch };
export default api;
