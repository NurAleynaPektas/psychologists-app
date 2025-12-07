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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const openLogin = () => {
    setModalType("login");
    setIsMenuOpen(false);
  };

  const openRegister = () => {
    setModalType("register");
    setIsMenuOpen(false);
  };

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
    setIsMenuOpen(false);
    navigate("/");
  };

  const cycleTheme = () => {
    if (theme === "orange") setTheme("blue");
    else if (theme === "blue") setTheme("green");
    else setTheme("orange");
  };

  const themeLabel =
    theme === "orange" ? "Orange" : theme === "blue" ? "Blue" : "Green";

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} to="/" onClick={closeMenu}>
          psychologists.<span>services</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/psychologists"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
            Psychologists
          </NavLink>

          {/* SADECE LOGIN OLUNCA GÖRÜNSÜN */}
          {user && (
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Favorites
            </NavLink>
          )}
        </nav>

        {/* DESKTOP ACTIONS */}
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

        {/* HAMBURGER  */}
        <button
          type="button"
          className={`${styles.menuToggle} ${
            isMenuOpen ? styles.menuToggleOpen : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </header>

      {/* SAĞDAN AÇILAN DRAWER MENU */}
      {isMenuOpen && (
        <div className={styles.drawerBackdrop} onClick={closeMenu}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>

              <NavLink
                to="/psychologists"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Psychologists
              </NavLink>

              {/* MOBİLDE DE SADECE LOGIN OLUNCA GÖRÜNSÜN */}
              {user && (
                <NavLink
                  to="/favorites"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            <div className={styles.mobileActions}>
              <button
                className={styles.themeBtn}
                type="button"
                onClick={cycleTheme}
              >
                {themeLabel}
              </button>

              {user ? (
                <div className={styles.mobileUserRow}>
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
                </div>
              ) : (
                <div className={styles.mobileAuthButtons}>
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
