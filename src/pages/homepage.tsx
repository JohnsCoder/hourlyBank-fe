import React from "react";
import styles from "../styles/pages/homepage.module.css";
import Card from "../components/card";
import {ConfirmWindow, CreateDialog, EditDialog} from "../components/dialog";
export default function Homepage() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Hourly Bank</h1>
        <div>
          <button>+</button>
          <input type="search" placeholder="Search..." />
        </div>
      </header>
      <hr />
      <section className={styles.cards}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <hr />
      <footer>
        <span>
          Deleloped by <a href="">JohnsCoder</a>
        </span>
      </footer>
      {/* <ConfirmWindow/> */}
    </div>
  );
}
