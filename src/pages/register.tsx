import React, { useContext } from "react";
import { RegisterContext } from "../contexts/pages/register.context";
import styles from "../styles/pages/register.module.css";

export default function Register() {
  const { register } = useContext(RegisterContext);
  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <button onClick={() => window.history.back()}>&#129044;</button>
        <input type="username" placeholder="Username..." />
        <input type="email" placeholder="Email..." />
        <input type="password" placeholder="Password..." />
        <button onClick={() => register()}>Register</button>
      </div>
    </div>
  );
}
