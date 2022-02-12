import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({ isOpen, onClose, confirmDelete }) => {
  const onConfirm = () => {
    return confirmDelete();
  };

  return (
    <PopupWithForm
      formName='confirmForm'
      isOpen={isOpen}
      id='w-confirm'
      onClose={onClose}
      formHeader='Are you sure?'
      onSubmit={onConfirm}
      validate={false}
      buttonText='Delete'
    />
  );
};

export default ConfirmPopup;
