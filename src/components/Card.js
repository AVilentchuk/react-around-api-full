import { useState, useEffect, createRef, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Likes from "./Likes";

const Card = ({ cardData, onClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isOver, setIsOver] = useState(false);
  const tooltip = createRef();

  const { name, likes, link, _id: id } = cardData;

  const liked = likes.some((like) => like._id === currentUser._id);

  const [isTooltipShown, setIsTooltipShown] = useState(false);

  useEffect(() => {
    setIsTooltipShown(
      tooltip.current.clientWidth < tooltip.current.scrollWidth
    );
  }, [tooltip]);

  const handleLikeClick = () => onCardLike(id, liked);

  function handleClick() {
    return onClick(cardData);
  }

  return (
    <div className='card'>
      {cardData.owner._id === currentUser._id && (
        <button
          className='button button_type_delete'
          type='click'
          onClick={() => onCardDelete(cardData)}
        ></button>
      )}
      <img
        alt={name}
        src={link}
        className='card__image'
        onClick={handleClick}
      />
      <div className='card__footer'>
        <h2 ref={tooltip} className='card__text'>
          {name}
        </h2>

        <div
          className='card__likes-container'
          onMouseLeave={() => {
            setIsOver(false);
          }}
        >
          {likes.length ? (
            <Likes
              target={currentUser._id}
              likes={likes}
              isOver={isOver}
              key={id ? id : null}
            />
          ) : (
            ""
          )}
          <button
            className={`button card__like-button ${
              liked && "card__like-button_active"
            }`}
            id='likebtn'
            aria-label='heart icon (like)'
            onClick={handleLikeClick}
            onMouseOver={() => {
              setIsOver(true);
            }}
          />
          <label
            className='card__like-label'
            style={{ visibility: likes.length ? "visible" : "hidden" }}
          >
            {likes.length}
          </label>
        </div>
        {isTooltipShown && <div className='card__overflow-tooltip'>{name}</div>}
      </div>
    </div>
  );
};

export default Card;
