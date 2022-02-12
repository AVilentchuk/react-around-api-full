import { useEffect, useRef, useState, createRef } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth.js";
import FormValidator from "../utils/FormValidator";
import InfoTooltip from "./InfoTooltip";
import { loader } from "../utils/loader.js";
import "../blocks/register/register.css";

const Register = ({
  handleRegister,
  onOpen,
  onClose,
  isOpen,
  checkLoggedIn,
  loginStatus,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Loading");
  const [form, setForm] = useState();
  const formRef = useRef();
  const buttonRef = createRef();

  const errorHandle = (err) => {
    if (err) {
      return err.json().then((parsedError) => {
        setStatusMessage(parsedError.message || parsedError.error);
        setStatus(false);
      });
    }
  };

  const handleSubmit = () => {
    return auth.register(email, password).then((res) => {
      console.log(res);
      if (res.ok) {
        handleRegister();
      }
    });
  };
  useEffect(() => {
    if (loginStatus) {
      setStatusMessage("Already Logged in, Redirecting..");
      onOpen();
      setTimeout(() => {
        checkLoggedIn();
      }, 1000);
    }
    return () => {
      onClose();
    };
  }, [loginStatus]);

  useEffect(() => {
    const validatedForm = new FormValidator(formRef.current, {
      submitSelector: "button_type_submit-dark",
    });
    validatedForm.enableValidation();
    setForm(validatedForm);
  }, []);

  return (
    <>
      <div className='register'>
        <p className='page__title'>Sign Up</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpen();
            setStatusMessage("Registering");
            setStatus(null);
            loader({
              dots: {
                interval: 75,
                count: 4,
              },
              completeTimeDelay: 500,
              buttonSelector: buttonRef.current,
              clickHandler: handleSubmit,
              onSuccess: () => {
                setStatusMessage("Registered");
                setStatus(true);
              },
              onError: errorHandle,
              callbackEnd: () => {
                onClose();
                form.resetValidation();
              },
            });
          }}
          className='form form_dark'
          ref={formRef}
        >
          <label htmlFor='email' className='form__field'>
            <input
              className='form__input form__input_dark'
              placeholder='Email'
              id='email'
              name='email'
              type='email'
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className='form__input-error'></span>
          </label>
          <label htmlFor='email' className='form__field'>
            <input
              className='form__input form__input_dark'
              placeholder='Password'
              id='password'
              name='password'
              type='password'
              minLength='6'
              maxLength='10'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />{" "}
            <span className='form__input-error'></span>
          </label>

          <button
            type='submit'
            className='button button_type_submit-dark button_disabled'
            disabled
            ref={buttonRef}
          >
            Sign up
          </button>
        </form>

        <p className='page__caption'>
          Already have an account? &nbsp;
          <Link to='/login' className='page__caption button'>
            Log in here!
          </Link>
        </p>
      </div>
      {
        <InfoTooltip
          onClose={onClose}
          isOpen={isOpen}
          status={status}
          statusMessage={statusMessage}
        />
      }
    </>
  );
};

export default Register;
