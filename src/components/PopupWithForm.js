import { useEffect, useRef, useState } from "react";
import FormValidator from "../utils/FormValidator";
import { loader } from "../utils/loader.js";

const PopupWithForm = ({
  children,
  formName,
  formHeader,
  onClose,
  id,
  isOpen,
  onSubmit,
  validate,
  buttonText,
}) => {
  const [form, setForm] = useState();
  const formRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (validate) {
      const validatedForm = new FormValidator(formRef.current);
      validatedForm.enableValidation();
      setForm(validatedForm);
    } else { formRef.current.style.margin = "0 auto" }
  }, [validate]);

  useEffect(() => {
    if (form && isOpen) form.resetValidation();
  }, [isOpen, form]);

  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`} onClick={onClose}>
      <div
        className='popup__window'
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
        <h2 className='popup__title'>{formHeader}</h2>
        <form
          className='form'
          ref={formRef}
          name={`${formName}`}
          onSubmit={(e) => {
            e.preventDefault();
            loader({
              dots: {
                interval: 75,
                count: 4,
              },
              completeTimeDelay: 400,
              buttonSelector: buttonRef.current,
              clickHandler: () => {
                return onSubmit();
              },
              onSuccess: () => {
                onClose();
              },
            });
          }}
        >
          {children}
          <button
            className='button button_type_submit'
            type='submit'
            ref={buttonRef}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
