import { useEffect, useRef, useState, createRef } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth.js";
import FormValidator from "../utils/FormValidator";
import InfoTooltip from "./InfoTooltip";
import { loader } from "../utils/loader.js";

const Login = ({
  handleLogin,
  onClose,
  onOpen,
  isOpen,
  checkLoggedIn,
  loginStatus,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState();
  const [statusMessage, setStatusMessage] = useState("Loading");
  const formRef = useRef();
  const buttonRef = createRef();

  const errorHandle = (err) => {
    return err.json().then((parsedError) => {
      setStatusMessage(parsedError.message || parsedError.error);
      setStatus(false);
    });
  };

  const handleSubmit = (e) => {
    return auth.authorize(email, password).then((data) => {
      if (data.token) {
        setEmail(" ");
        setPassword(" ");
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
      <div className='login'>
        <h2 className='page__title'>Log in</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpen();
            setStatusMessage("Logging in");
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
                setStatusMessage("Logged in");
                setStatus(true);
                handleLogin(email);
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
              required
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className='form__input-error'></span>
          </label>
          <label htmlFor='password' className='form__field'>
            <input
              className='form__input form__input_dark'
              required
              id='password'
              name='password'
              type='password'
              minLength='6'
              maxLength='10'
              placeholder='Password'
              value={password || ""}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(password);
              }}
            />
            <span className='form__input-error'></span>
          </label>

          <button
            type='submit'
            className='button button_type_submit-dark button_disabled'
            disabled
            ref={buttonRef}
          >
            Log in
          </button>
        </form>

        <p className='page__caption'>
          Not a member yet? &nbsp;
          <Link to='/register' className='page__caption button'>
            Sign up here!
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

export default Login;
