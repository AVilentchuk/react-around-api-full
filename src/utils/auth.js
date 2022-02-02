export const BASE_URL = "http://avilentchuk2.students.nomoreparties.sbs/";
// export const BASE_URL = "http://127.0.0.1:3001";
const checkResponse = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(response);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => checkResponse(response));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => checkResponse(response))
    .then((data) => {
      localStorage.setItem("jwt", data.token);

      return data;
    });
};

export const checkToken = () => {
  if (localStorage.getItem("jwt") != null)
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => checkResponse(res));
};
