import { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useKey } from "../hooks/useKey";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup = ({ isOpen, onClose, updateCurrentUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatarInput = useRef();

  //fills the field on open with current value.
  useEffect(() => {
    if (isOpen)
      avatarInput.current.value = currentUser.avatar ? currentUser.avatar : "";
  }, [currentUser, isOpen]);

  const formSubmit = () => {
    return updateCurrentUser({ avatar: avatarInput.current.value });
  };

  useKey("Escape", onClose, isOpen);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      windowId='w-editpic'
      formHeader='Change profile picture'
      formName='editprofpic'
      onSubmit={formSubmit}
      validate={true}
      buttonText='Update'
    >
      <label htmlFor='pictureurl' className='form__field'>
        <input
          ref={avatarInput}
          className='form__input'
          type='url'
          name='avatar'
          id='pictureurl'
          placeholder='insert url for picture'
          required
        />
        <span className='form__input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
