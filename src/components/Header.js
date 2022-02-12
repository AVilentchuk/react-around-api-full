import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/icons/Logo_vector.svg";

const Header = (props) => {
  const { loginStatus, handleLogout, userEmail } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();
  //<<START>>Helper functions <<START>>
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleClick = () => {
    if (loginStatus) {
      handleLogout();
      return;
    }
    if (window.location.pathname === "/login") return navigate("/register");
    else return navigate("/login");
  };
  //<<END>>Helper functions <<END>>
  //<<START>>Conditional variables & elements <<START>>
  const textHolder = loginStatus
    ? "Log out"
    : window.location.pathname === "/login"
    ? "Sign up"
    : "Log in";

  const link = (
    <a className='link header__link' onClick={handleClick}>
      {textHolder}
    </a>
  );

  const loggedEmail = (
    <p className='header__email'>
      {loginStatus && userEmail !== "" && userEmail}
    </p>
  );

  const headerButton = isMenuOpen ? (
    <button
      className='button button_type_close-menu'
      type='button'
      aria-label='close top menu'
      onClick={() => setIsMenuOpen(false)}
    ></button>
  ) : (
    <button
      className='button button_type_menu'
      type='button'
      aria-label='open top menu'
      onClick={() => setIsMenuOpen(true)}
    ></button>
  );

  const innerMenu = (
    <div className='header__link-container'>
      {!(isMobileSize && loginStatus) ? (
        <>
          {loggedEmail}
          {link}
        </>
      ) : (
        <>{headerButton}</>
      )}
    </div>
  );
  const outerMenu = (
    <div
      className={`header__mobile-container ${
        isMenuOpen && loginStatus && "header__mobile-container_active"
      }`}
    >
      {loggedEmail}
      {link}
    </div>
  );
  //<<END>>Conditional variables <<END>>
  //<<START>>useEffects <<START>>
  useEffect(() => {
    if (dimensions.width < 600) setIsMobileSize(true);
    else {
      setIsMobileSize(false);
      setIsMenuOpen(false);
    }
  }, [dimensions]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [loginStatus]);
  //<<START>>useEffects <<START>>

  return (
    <>
      {isMobileSize && outerMenu}
      <header className='header'>
        <img className='header__logo' src={logo} alt="site's logo" />
        {innerMenu}
      </header>
    </>
  );
};

export default Header;
