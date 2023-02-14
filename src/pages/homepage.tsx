import React, { useContext } from "react";
import styles from "../styles/pages/homepage.module.css";
import Card from "../components/card";
import { ConfirmWindow, CreateDialog, EditDialog } from "../components/dialog";
import { HomepageContext } from "../contexts/pages/homepage.context";
export default function Homepage() {
  const { dialog } = useContext(HomepageContext);
  const test = () => console.log("chamou");
  return (
    <div className={styles.window}>
      <header>
        <h1>Hourly Bank</h1>
        <div>
          <button
            onClick={() => {
              dialog.create.open();
            }}
          >
            +
          </button>
          <input type="search" placeholder="Search..." />
        </div>
      </header>
      <hr />
      <section className={styles.cards}>
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
        <Card
          editCard={() => dialog.edit.open()}
          confirmCard={() => dialog.confirm.open()}
        />
      </section>
      <hr />
      <footer>
        <span>
          Deleloped by <a href="https://github.com/JohnsCoder" target="_blank">JohnsCoder</a>
        </span>
      </footer>
      <CreateDialog style={dialog.create.display} close={dialog.create} />
      <EditDialog style={dialog.edit.display} close={dialog.edit} />
      <ConfirmWindow style={dialog.confirm.display} close={dialog.confirm} />
    </div>
  );
}
