import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";

import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";

function App() {
  //isOpened
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEnlargeAvatarPopupOpen, setIsEnlargeAvatarPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  //data holding states
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardsData, setCardsData] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const navigate = useNavigate();

  //<<START>>data fetching functions <<START>>
  const getUserInfo = async () => {
    try {
      const callData = await api.getProfile();
      callData && setCurrentUser(callData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async () => {
    try {
      const callData = await api.getInitialCards();
      callData && setCardsData(callData);
    } catch (error) {
      console.log(error);
    }
  };
  //<<END>>data fetching functions <<END>>
  //<<START>>Card actions handles<<START>>
  const handleCardLike = async (id, status) => {
    if (status)
      try {
        const result = await api
          .dislikePhoto(id)
          .then((newCardData) =>
            cardsData.map(
              (card) =>
                (card = newCardData._id === card._id ? newCardData : card)
            )
          );
        setCardsData(result);
      } catch (error) {
        console.log(error);
      }
    else
      try {
        const result = await api
          .likePhoto(id)
          .then((newCardData) =>
            cardsData.map(
              (card) =>
                (card = newCardData._id === card._id ? newCardData : card)
            )
          );
        setCardsData(result);
      } catch (error) {
        console.log(error);
      }
  };

  const handleDeleteCard = async () => {
    const id = selectedCard._id;
    await api.deleteCardPost(id);
    return setCardsData(cardsData.filter((card) => card._id !== id));
  };

  const handleAddCard = async (card) => {
    return await api.postNewCard(card).then((res) =>
      setCardsData((Cards) => {
        return [res].concat(Cards);
      })
    );
  };
  //<<END>>Card actions handles<<END>>
  //<<START>>Window openers & closers<<START>>
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEnlargeAvatarClick = (currentUser) => {
    setCurrentUser(currentUser);
    setIsEnlargeAvatarPopupOpen(true);
  };

  const handleCardClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsImagePopupOpen(true);
  };
  const handleDeleteClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsConfirmPopupOpen(true);
  };

  // };
  const handleClose = () => {
    setIsImagePopupOpen(false);
    setIsEnlargeAvatarPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsToolTipOpen(false);
  };
  //<<END>>Window openers & closers<<END>>
  //<<START>>Profile updating handlers<<START>>
  const handleUpdateUserData = async (data) => {
    return await api.updateProfile(data).then((res) => {
      setCurrentUser(res);
    });
  };

  const handleUpdateAvatarImage = async (data) => {
    return await api.updateProfilePhoto(data.avatar).then((res) => {
      setCurrentUser(res);
    });
  };
  //<<END>>Profile updating handlers<<END>>
  //<<START>>Navigation handlers<<START>>
  const goLeft = () => {
    let index = cardsData.findIndex((item) => item === selectedCard);
    index =
      parseInt(index - 1) >= 0 ? parseInt(index - 1) : cardsData.length - 1;
    setSelectedCard(cardsData[index]);
  };
  const goRight = () => {
    let index = cardsData.findIndex((item) => item === selectedCard);
    index =
      parseInt(index + 1) <= cardsData.length - 1 ? parseInt(index + 1) : 0;
    setSelectedCard(cardsData[index]);
  };
  //<<END>>Navigation handlers<<END>>
  const handleToolTipOpen = (details) => {
    setIsToolTipOpen(true);
  };

  const handleLogin = (data) => {
    data && console.log(data);
    setIsUserLogged(true);
    navigate("/");
    data && setLoggedUser(data);
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsUserLogged(false);
    navigate("/login");
  };
  const checkLoggedIn = () => {
    isUserLogged && navigate("/");
  };

  //initialization
  useEffect(async () => {
    const validation = await auth.checkToken();
    if (validation) {
      setLoggedUser(validation.data.email);
      setIsUserLogged(true);
      getCards();
      getUserInfo();
    } else {
      if (window.location.pathname === ("/" || null)) navigate("/login");
    }
  }, [validation]);

  return (
    <div className='page'>
      <div className='page__wrap'>
        <Header
          userEmail={loggedUser}
          loginStatus={isUserLogged}
          handleLogout={handleLogout}
          navigate={navigate}
        />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path='/register'
              element={
                <Register
                  loginStatus={isUserLogged}
                  checkLoggedIn={checkLoggedIn}
                  onClose={handleClose}
                  isOpen={isToolTipOpen}
                  onOpen={handleToolTipOpen}
                  navigate={navigate}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  loginStatus={isUserLogged}
                  checkLoggedIn={checkLoggedIn}
                  handleLogin={handleLogin}
                  setUser={setLoggedUser}
                  onClose={handleClose}
                  isOpen={isToolTipOpen}
                  onOpen={handleToolTipOpen}
                />
              }
            />
            <Route
              path='/'
              element={
                <ProtectedRoute check={isUserLogged}>
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onEnlargeAvatarClick={handleEnlargeAvatarClick}
                    onCardClick={handleCardClick}
                    setUserData={handleUpdateUserData}
                    handleCardLike={handleCardLike}
                    onDeleteClick={handleDeleteClick}
                    cardsData={cardsData}
                  />

                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={handleClose}
                    updateCurrentUser={handleUpdateUserData}
                  />

                  <AddPlacePopup
                    isOpen={isPlacePopupOpen}
                    onClose={handleClose}
                    addNewCard={handleAddCard}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handleClose}
                    updateCurrentUser={handleUpdateAvatarImage}
                  />

                  <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={handleClose}
                    id='w-img'
                    targetObj={selectedCard}
                    navigation={true}
                    goLeft={goLeft}
                    goRight={goRight}
                  />
                  <ImagePopup
                    isOpen={isEnlargeAvatarPopupOpen}
                    onClose={handleClose}
                    id='w-piclrg'
                    targetObj={currentUser}
                    navigation={false}
                    goLeft={goLeft}
                    goRight={goRight}
                  />
                  <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={handleClose}
                    confirmDelete={handleDeleteCard}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
