import { createRef, useEffect, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

const Likes = ({ likes, target, isOver }) => {
  const likesRef = createRef();
  const position = useMousePosition();
  const [selfLike, setSelfLike] = useState("");
  // const selfLike = likes.some((item) => item._id === target) ? "you " : "";
  const [likesUpdated, setLikesUpdated] = useState();

  useEffect(() => {
    if (isOver) {
      likesRef.current.style.top = `${
        position.y - likesRef.current.offsetHeight
      }px`;
      window.innerWidth < 767
        ? (likesRef.current.style.left = `${
            position.x - likesRef.current.offsetWidth
          }px`)
        : (likesRef.current.style.left = `${position.x}px`);
    }
  }, [isOver, position, likesRef]);

  useEffect(() => {
    setSelfLike(likes.some((item) => item._id === target) ? "you " : "");
    setLikesUpdated(selfLike ? likes.length - 1 : likes.length);
  }, [selfLike, likes]);

  const renderLike = (like) => {
    if (like._id !== target)
      return (
        <div className='likes__owner' key={like._id}>
          <img
            className='likes__owner-image'
            src={like.avatar}
            alt={`Profile pictue of ${like.name}`}
          />
          <p className='likes__owner-name'>{like.name}</p>
        </div>
      );
  };

  return (
    <div ref={likesRef} className='likes'>
      {likes.length ? (
        <div className='likes__container'>
          {likes.length <= 3
            ? likes.map((like) => renderLike(like))
            : likes.slice(0, 3).map((like) => renderLike(like))}
        </div>
      ) : (
        ""
      )}
      {likes.length > 0 &&
        (likesUpdated < 3 ? (
          <span className='likes__info'>{` ${
            likesUpdated && selfLike ? "and " : ""
          }${selfLike}liked this`}</span>
        ) : (
          <span className='likes__info'>{`${selfLike}and ${
            likesUpdated - 3
          } others liked this`}</span>
        ))}
    </div>
  );
};

export default Likes;
