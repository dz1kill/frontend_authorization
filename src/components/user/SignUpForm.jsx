import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Auth.module.css";
import { ROUTES } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });
  const [validate, setValidate] = useState({
    passMatch: true,
    isEmpty: true,
    isLoading: false,
    isError: false,
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: "https://picsum.photos/800",
    };

    const passwordsMatch =
      formData.password === formData.confirmPassword;

    if (!passwordsMatch) {
      setValidate((prev) => ({
        ...prev,
        passMatch: passwordsMatch,
      }));
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      return;
    }

    setValidate((prev) => ({
      ...prev,
      passMatch: true,
      isLoading: true,
    }));

    const resData = await dispatch(createUser(userData));

    if (resData.error) {
      setValidate((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
      }));
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className={styles.page}>
      {validate.isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      <div className={styles.board}>
        <h1
          className={
            validate.isError ? styles.titleError : styles.title
          }
        >
          {validate.isError ? "Ошибка регистрации" : "Регистрация"}
        </h1>
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
