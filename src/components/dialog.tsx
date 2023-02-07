import React from "react";
import styles from "../styles/components/dialog.module.css";
import { Property as CSS } from "csstype/index.js";

type props = {
  style: {
    create: CSS.Display;
    edit: CSS.Display;
    confirm: CSS.Display;
  };
  close: () => void;
};

function CreateDialog({ style, close }: props) {
  return (
    <div
      className={styles["container-create"]}
      style={{
        display: style.create,
        top: `${window.pageYOffset + 231}px`,
      }}
    >
      <input type="text" placeholder="Title..." />
      <div className={styles.date}>
        <div className={styles["date-start"]}>
          <label>Data de Inicio:</label>

          <div>
            <input type="date" defaultValue="2023-01-17" />
          </div>
        </div>

        <div className={styles["date-finish"]}>
          <label>Data de Termino:</label>
          <div>
            <input type="date" defaultValue="2003-11-27" />
          </div>
        </div>
      </div>
      <input type="text" placeholder="Description..." />
      <div className={styles.buttons}>
        <button onClick={() => close()}>Cancel</button>
        <button onClick={() => close()}>Confirm</button>
      </div>
    </div>
  );
}

function EditDialog({ style, close }: props) {
  return (
    <div
      className={styles["container-edit"]}
      style={{
        display: style.edit,
        top: `${window.pageYOffset + 231}px`,
      }}
    >
      <div className={styles.hour}>
        <div className={styles["start-hour"]}>
          <label>Horario de Inicio:</label>
          <div>
            <input type="time" defaultValue="10:30"></input>
          </div>
        </div>
        <div className={styles["finish-hour"]}>
          <label>Horario de Termino:</label>
          <div>
            <input type="time" defaultValue="18:00"></input>
          </div>
        </div>
        <div className={styles["is-fix"]}>
          <label>Horario Fixo:</label> <input type="checkbox" />
        </div>
        <div className={styles.price}>
          <label>Preço por hora:</label>
          <div>
            <select name="currency-abbr" id="">
              <option value="R$">R$</option>
              <option value="U$">U$</option>
            </select>
            <hr />
            <input type="number" defaultValue="2000"></input>
          </div>
        </div>
      </div>
      <input type="text" placeholder="Oque fiz hoje?" />

      <div className={styles.buttons}>
        <button onClick={() => close()}>Cancel</button>
        <button onClick={() => close()}>Delete</button>
        <button onClick={() => close()}>Confirm</button>
      </div>
    </div>
  );
}

function ConfirmWindow({ style, close }: props) {
  return (
    <div
      className={styles["container-confirm"]}
      style={{
        display: style.confirm,
        top: `${window.pageYOffset + 231}px`,
      }}
    >
      <div>
        <p>Are you sure about finish this job?</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => close()}>Cancel</button>
        <button onClick={() => close()}>Confirm</button>
      </div>
    </div>
  );
}

export { CreateDialog, EditDialog, ConfirmWindow };
