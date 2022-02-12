import { useKey } from "../hooks/useKey";

const ImagePopup = ({
  navigation,
  targetObj,
  isOpen,
  onClose,
  id,
  goLeft,
  goRight,
}) => {
  const navigationArrows = [
    <div
      key='leftNav'
      className='navigation-arrow navigation-arrow_left'
      onClick={goLeft}
    ></div>,
    <div
      key='rightNav'
      className='navigation-arrow navigation-arrow_right'
      onClick={goRight}
    ></div>,
  ];

  useKey("ArrowRight", goRight, isOpen);
  useKey("ArrowLeft", goLeft, isOpen);
  useKey("Escape", onClose, isOpen);

  return (
    <div
      className={`popup popup_gallery ${isOpen ? "popup_active" : ""}`}
      onClick={onClose}
    >
      <div
        className='popup__gallery'
        id={id}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className='button button_type_close'
          type='button'
          aria-label='Close window'
          onClick={onClose}
        ></button>
        <img
          className='popup__img'
          src={
            !targetObj
              ? null
              : targetObj.link
              ? targetObj.link
              : targetObj.avatar
              ? targetObj.avatar
              : ""
          }
          alt={!targetObj ? null : targetObj.name}
        />
        <h2 className='popup__place-name'>
          {!targetObj ? null : targetObj.name}
        </h2>
        {navigation && navigationArrows}
      </div>
    </div>
  );
};

export default ImagePopup;
