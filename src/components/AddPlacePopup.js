import { useEffect, useState } from "react";
import { useKey } from "../hooks/useKey";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, addNewCard }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const fromSubmit = () => {
    return addNewCard({ name, link });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  useKey("Escape", onClose, isOpen);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      windowId='w-add'
      formHeader='New place'
      formName='addWindow'
      onSubmit={fromSubmit}
      validate={true}
      buttonText='Add'
    >
      <label htmlFor='place-title' className='form__field'>
        <input
          className='form__input'
          type='text'
          name='name'
          id='place-title'
          placeholder='Title'
          value={name}
          required
          minLength='1'
          maxLength='30'
          onChange={(e) => setName(e.target.value)}
        />
        <span className='form__input-error'></span>
      </label>
      <label htmlFor='image-link' className='form__field'>
        <input
          className='form__input'
          type='url'
          name='link'
          id='image-link'
          placeholder='Image link'
          value={link}
          required
          onChange={(e) => setLink(e.target.value)}
        />
        <span className='form__input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
