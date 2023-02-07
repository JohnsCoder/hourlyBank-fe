import React, { useContext } from "react";
import styles from "../styles/pages/homepage.module.css";
import Card from "../components/card";
import { ConfirmWindow, CreateDialog, EditDialog } from "../components/dialog";
import { HomepageContext } from "../contexts/pages/homepage.context";
export default function Homepage() {
  const { createCard, editCard, confirmCard, display } =
    useContext(HomepageContext);

  return (
    <div className={styles.window}>
      <header>
        <h1>Hourly Bank</h1>
        <div>
          <button onClick={() => createCard.open()}>+</button>
          <input type="search" placeholder="Search..." />
        </div>
      </header>
      <hr />
      <section className={styles.cards}>
        <Card
          editCard={() => editCard.open()}
          confirmCard={() => confirmCard.open()}
        />
      </section>
      <hr />
      <footer>
        <span>
          Deleloped by <a href="">JohnsCoder</a>
        </span>
      </footer>
      <CreateDialog style={display} close={createCard.close} />
      <EditDialog style={display} close={editCard.close} />
      <ConfirmWindow style={display} close={confirmCard.close} />
    </div>
  );
}
