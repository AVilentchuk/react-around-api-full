const customFetch = (url, properties) =>
  fetch(url, properties).then((response) => {
    if (response.ok) return response.json();
    return Promise.reject(
      `Failed with status:( ${response.status} ${response.statusText} )`
    );
  });

class Api {
  constructor({ groupId, apiKey, baseUrl }) {
    this.groupId = groupId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  getInitialCards() {
    return customFetch(`${this.baseUrl}${this.groupId}/cards`, {
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  postNewCard(cardData) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/`, {
      method: "POST",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`,
      }),
    });
  }

  deleteCardPost(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  getProfile() {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me`, {
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  updateProfile({ name, about }) {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
        _id: `${this.apiKey}`,
        cohort: `${this.groupId}`,
      }),
    });
  }

  updateProfilePhoto(avatarLink) {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    });
  }

  likePhoto(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  dislikePhoto(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "Delete",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }
}
const options = {
  baseUrl: "https://around.nomoreparties.co/v1/",
  apiKey: "69483cc0-2fd4-4d47-b549-ff7c13f67c88",
  groupId: "group-12",
};

const api = new Api(options);
export { customFetch };
export default api;
