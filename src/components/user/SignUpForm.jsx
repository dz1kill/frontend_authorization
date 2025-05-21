import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passMatch, setMatch] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatch(true);
    if (formData.password !== formData.confirmPassword) {
      setFormData({ password: "", confirmPassword: "" });
      setMatch(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.board}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Имя</label>
            <input placeholder="Введите ваше имя" />
          </div>
          <div className={styles.inputGroup}>
            <label>Почта</label>
            <input type="text" placeholder="Введите ваш email" />
          </div>

          <div
            className={
              passMatch ? styles.inputGroup : styles.errMatch
            }
          >
            <label>Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={
                passMatch ? "Ведите пароль" : "Пароли не совпадают"
              }
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div
            className={
              passMatch ? styles.inputGroup : styles.errMatch
            }
          >
            <label>Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={
                passMatch
                  ? "Подтвердите пароль"
                  : "Пароли не совпадают"
              }
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className={styles.loginButton} type="submit">
            Зарегистрироваться
          </button>
          <Link to={`${ROUTES.LOGIN}`} className={styles.link}>
            У меня уже есть аккаунт
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
