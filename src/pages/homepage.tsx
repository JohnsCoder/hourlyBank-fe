import React, { useContext } from "react";
import styles from "../styles/pages/homepage.module.css";
import Card from "../components/card";
import { ConfirmWindow, CreateDialog, EditDialog } from "../components/dialog";
import { DialogContext } from "../contexts/components/dialog.context";

export default function Homepage() {
  const { createDialog } = useContext(DialogContext);

  return (
    <div data-testid="homepageWindow" className={styles.window}>
      <header data-testid="header">
        <h1>Hourly Bank</h1>
        <div>
          <button
            data-testid="createDialog"
            onClick={() => {
              createDialog.open();
            }}
          >
            +
          </button>
          <input type="search" placeholder="Search..." />
        </div>
      </header>
      <hr />
      <section data-testid="cards" className={styles.cards}>
        <Card />
      </section>
      <hr />
      <footer data-testid="footer">
        <span>
          Deleloped by{" "}
          <a href="https://github.com/JohnsCoder" target="_blank">
            JohnsCoder
          </a>
        </span>
      </footer>
      <CreateDialog />
      <EditDialog />
      <ConfirmWindow />
    </div>
  );
}
