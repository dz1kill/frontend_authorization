import React from "react";
import styles from "../../styles/Auth.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const LoginForm = () => {
  return (
    <div className={styles.page}>
      <div className={styles.board}>
        <h1 className={styles.title}>Вход в систему</h1>
        <form>
          <div className={styles.inputGroup}>
            <label>Почта</label>
            <input placeholder="Введите ваш email" />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>

            <input placeholder="Введите ваш пароль" />
            <a
              className={styles.forgetPassword}
              href="http://localhost:3000/"
            >
              Забыли пароль?
            </a>
          </div>
          <button className={styles.loginButton} type="submit">
            Войти
          </button>
          <Link to={`${ROUTES.REGISTER}`} className={styles.link}>
            У меня нет аккаунта
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
