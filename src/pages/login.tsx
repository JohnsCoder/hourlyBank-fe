import React from "react";
import styles from "../styles/pages/login.module.css";
export default function Login() {
  return (
    <div className={styles.container}>
      <button>&#129044;</button>
      <input type="email" placeholder="Email..." />
      <input type="password" placeholder="Password..." />
      <button>Login</button>
      <a href="">Register</a>
    </div>
  );
}
