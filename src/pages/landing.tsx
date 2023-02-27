import React from "react";
import styles from "../styles/pages/landing.module.css";
import img1 from "../assets/Lo-fi concept-cuate.svg";
import img2 from "../assets/Lo-fi concept-amico.svg";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div data-testid="landingWindow" className={styles.window}>
      <div data-testid="blockOne" className={styles["group-1"]}>
        <img src={img1} alt="" />
        <div className={styles["block-1"]}></div>
        <div className={styles["block-2"]}></div>
      </div>

      <div data-testid="menu" className={styles.bar}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <div data-testid="blockTwo" className={styles["group-2"]}>
        <img src={img2} alt="" />

        <div className={styles["block-1"]}></div>
        <div className={styles["block-2"]}></div>
      </div>
    </div>
  );
}
