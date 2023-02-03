import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/login.module.css";
export default function Login() {
  return (
    <div className={styles.container}>
      <button onClick={() => window.history.back()}>&#129044;</button>
      <input type="email" placeholder="Email..." />
      <input type="password" placeholder="Password..." />
      <button>Login</button>
      <Link to="/register">Register</Link>
    </div>
  );
}
