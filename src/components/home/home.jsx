import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import styles from "../../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => navigate(`${ROUTES.REGISTER}`)}
      >
        Зарегистрироваться
      </button>
      <button
        type="button"
        onClick={() => navigate(`${ROUTES.LOGIN}`)}
      >
        Войти
      </button>
    </>
  );
};

export default Home;
