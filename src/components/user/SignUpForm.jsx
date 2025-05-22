import React, { useEffect, useState } from "react";
import styles from "../../styles/Auth.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });
  const [validate, setValidate] = useState({
    passMatch: true,
    isEmpty: true,
  });

  useEffect(() => {
    const checkEmpty = Object.values(formData).some((val) => !val);
    setValidate((prev) => ({
      ...prev,
      isEmpty: checkEmpty,
    }));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordsMatch =
      formData.password === formData.confirmPassword;

    setValidate({
      ...validate,
      passMatch: passwordsMatch,
    });

    if (!passwordsMatch) {
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      return;
    }
    console.log("Форма отправлена:", formData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.board}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Имя</label>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Введите ваше имя"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Почта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
            />
          </div>

          <div
            className={
              validate.passMatch ? styles.inputGroup : styles.errMatch
            }
          >
            <label>Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={
                validate.passMatch
                  ? "Ведите пароль"
                  : "Пароли не совпадают"
              }
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div
            className={
              validate.passMatch ? styles.inputGroup : styles.errMatch
            }
          >
            <label>Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={
                validate.passMatch
                  ? "Подтвердите пароль"
                  : "Пароли не совпадают"
              }
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            className={styles.loginButton}
            disabled={validate.isEmpty}
            type="submit"
          >
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
