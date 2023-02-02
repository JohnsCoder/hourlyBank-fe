import React from "react";
import styles from "../styles/pages/landing.module.css";
import img1 from "../assets/Lo-fi concept-cuate.svg";
import img2 from "../assets/Lo-fi concept-amico.svg";
export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.group1}>
        <img src={img1} alt="" />
        <div className={styles.block1}></div>
        <div className={styles.block2}></div>
      </div>

      <div className={styles.bar}>
        <button>Login</button>
        <button>Register</button>
      </div>
      <div className={styles.group2}>
        <img src={img2} alt="" />

        <div className={styles.block1}></div>
        <div className={styles.block2}></div>
      </div>
    </div>
  );
}
