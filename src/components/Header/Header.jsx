import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Modal from "../UI/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [modalType, setModalType] = useState(null); // 'login' | 'register' | null
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          {user ? (
            <>
              <span className={styles.user}>
                Hi, {user.displayName || user.email}
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
