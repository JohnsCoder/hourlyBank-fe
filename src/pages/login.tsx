import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/pages/login.context";
import styles from "../styles/pages/login.module.css";
export default function Login() {
  const { login, handleValue } = useContext(LoginContext);
  return (
    <div data-testid="loginWindow" className={styles.window}>
      <div role="container" className={styles.container}>
        <Link data-testid="getBack" to="/">
          &#129044;
        </Link>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          onChange={(e) =>
            handleValue({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={(e) =>
            handleValue({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <button data-testid="login" onClick={() => login()}>
          Login
        </button>
        <Link data-testid="register" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
