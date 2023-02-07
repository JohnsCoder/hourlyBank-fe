import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { LoginContext } from '../contexts/pages/login.context';
import styles from "../styles/pages/login.module.css";
export default function Login() {
  const {login} = useContext(LoginContext)
  return (
    <div className={styles.window}>

    <div className={styles.container}>
      <button onClick={() => window.history.back()}>&#129044;</button>
      <input type="email" placeholder="Email..." />
      <input type="password" placeholder="Password..." />
      <button onClick={() => login()}>Login</button>
      <Link to="/register">Register</Link>
    </div>
    </div>
  );
}
