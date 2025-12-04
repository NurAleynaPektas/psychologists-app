import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Modal from "../UI/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const [modalType, setModalType] = useState(null); 
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  const handleLoginSuccess = () => {
    closeModal();
    navigate("/psychologists");
  };

  const handleRegisterSuccess = () => {
    closeModal();
    navigate("/psychologists");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const cycleTheme = () => {
    if (theme === "orange") setTheme("blue");
    else if (theme === "blue") setTheme("green");
    else setTheme("orange");
  };

  const themeLabel =
    theme === "orange" ? "Orange" : theme === "blue" ? "Blue" : "Green";

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} to="/">
          psychologists.<span>services</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/psychologists">Psychologists</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            type="button"
            onClick={cycleTheme}
          >
            {themeLabel}
          </button>

          {user ? (
            <>
              <span className={styles.user}>
                <span className={styles.userIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M7 17.13A4 4 0 0 0 4 21v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                 {user.displayName || user.email}
              </span>

              <button
                className={styles.loginBtn}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.loginBtn}
                type="button"
                onClick={openLogin}
              >
                Log In
              </button>
              <button
                className={styles.registerBtn}
                type="button"
                onClick={openRegister}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </header>

      <Modal isOpen={modalType === "login"} onClose={closeModal} title="Log In">
        <LoginForm onSubmit={handleLoginSuccess} />
      </Modal>

      <Modal
        isOpen={modalType === "register"}
        onClose={closeModal}
        title="Registration"
      >
        <RegisterForm onSubmit={handleRegisterSuccess} />
      </Modal>
    </>
  );
}
