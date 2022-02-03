import Card from "./Card";
import InfoTooltip from "./InfoTooltip";
import profilePhoto from "../assets/images/avatar_photo.png";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onEnlargeAvatarClick,
  onCardClick,
  handleCardLike,
  cardsData,
  onDeleteClick,
  initilizeMain,
}) => {
  const currentUser = useContext(CurrentUserContext);

  //card Component template
  const renderCard = (item) => {
    return (
      <Card
        onClick={onCardClick}
        cardData={item}
        onCardLike={handleCardLike}
        onCardDelete={onDeleteClick}
        key={item._id}
      />
    );
  };

  useEffect(() => {
    initilizeMain()
  }, []);

  return (
    <main>
      {currentUser && Object.keys(currentUser).length !== 0 ? (
        <section className='profile'>
          <div className='profile__photo-container'>
            <img
              className='profile__photo'
              src={currentUser ? currentUser.avatar : profilePhoto}
              style={{
                dispay: "flex",
                justifyContent: " space-evenly",
                alignItems: "center",
                textAlign: "center",
              }}
              alt={
                currentUser.name
                  ? `Photo of ${currentUser.name}`
                  : "Click to change"
              }
            />
            <div className='profile__photo-buttons'>
              <button
                className='button button_type_edit-profile-image'
                onClick={onEditAvatarClick}
              ></button>
              <button
                className='button button_type_enlarge-profile-image'
                onClick={() => {
                  onEnlargeAvatarClick(currentUser);
                }}
              ></button>
            </div>
          </div>
          <div className='profile__description'>
            <h1 className='profile__name'>
              {currentUser ? currentUser.name : "Kristine Weiss"}
            </h1>
            <button
              className='button profile__button-edit'
              type='button'
              aria-label='Edit profile'
              onClick={onEditProfileClick}
            ></button>
            <p className='profile__about'>
              {currentUser
                ? currentUser.about
                : "Travel guide, food enthusiastic and culture lover"}
            </p>
          </div>
          <button
            className='button profile__button-add'
            type='button'
            aria-label='Add or create new profile'
            onClick={onAddPlaceClick}
          ></button>
        </section>
      ) : (
        <InfoTooltip
          isOpen={true}
          noClose={true}
          status={null}
          statusMessage={"Loading"}
        ></InfoTooltip>
      )}
      {cardsData && (
        <section className='locations'>
          {cardsData.map((card) => renderCard(card))}
        </section>
      )}
    </main>
  );
};

export default Main;
