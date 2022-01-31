import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useKey } from "../hooks/useKey";
import PopupWithForm from "./PopupWithForm";
const EditProfilePopup = ({ isOpen, onClose, updateCurrentUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const formSubmit = () => {
    return updateCurrentUser({ name: name, about: description });
  };

  useKey("Escape", onClose, isOpen);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      windowId='w-edit'
      formHeader='Edit Profile'
      formName='editWindow'
      onSubmit={formSubmit}
      validate={true}
      buttonText='Save'
    >
      <label htmlFor='name' className='form__field'>
        <input
          className='form__input'
          type='text'
          name='name'
          id='name'
          value={name || ""}
          placeholder='Insert name here...'
          required
          minLength='2'
          maxLength='40'
          onChange={(e) => setName(e.target.value)}
        />
        <span className='form__input-error'></span>
      </label>
      <label htmlFor='about' className='form__field'>
        <input
          className='form__input'
          type='text'
          name='about'
          id='about'
          value={description || ""}
          placeholder='Insert job here...'
          required
          minLength='2'
          maxLength='200'
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className='form__input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
