import Card from "./Card";
import profilePhoto from "../assets/images/avatar_photo.png";
import { useContext } from "react";
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
}) => {
  //card Component template
  const renderCard = (item) => (
    <Card
      onClick={onCardClick}
      cardData={item}
      onCardLike={handleCardLike}
      onCardDelete={onDeleteClick}
      key={item._id}
    />
  );

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__photo-container'>
          <img
            className='profile__photo'
            src={currentUser ? currentUser.avatar : profilePhoto}
            alt={
              currentUser
                ? `Photo of ${currentUser.name}`
                : "Photo of Kristine Weiss"
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

      <section className='locations'>
        {cardsData.map((card) => renderCard(card))}
      </section>
    </main>
  );
};

export default Main;
