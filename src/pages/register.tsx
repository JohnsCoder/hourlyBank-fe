import React from "react";
import styles from "../styles/pages/register.module.css";
export default function Register() {
  return (
    <div className={styles.container}>
      <button>&#129044;</button>
      <input type="username" placeholder="Username..." />
      <input type="email" placeholder="Email..." />
      <input type="password" placeholder="Password..." />
      <button>Register</button>
    </div>
  );
}
