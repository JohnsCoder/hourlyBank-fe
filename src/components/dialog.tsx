import React, { useContext } from "react";
import styles from "../styles/components/dialog.module.css";
import { Property as CSS } from "csstype/index.js";
import { DialogContext } from "../contexts/components/dialog.context";

function CreateDialog() {
  const { createDialog, CreateProject, handleValue } =
    useContext(DialogContext);
  return (
    <div
      data-testid="create-dialog-window"
      className={styles["container-create"]}
      style={{
        display: createDialog.display,
      }}
    >
      <input
        type="text"
        placeholder="Title..."
        name="title"
        onChange={(e) =>
          handleValue({
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      <div className={styles.date}>
        <div className={styles["date-start"]}>
          <label>Data de Inicio:</label>

          <div>
            <input
              type="date"
              name="dateStart"
              data-testid="date-start"
              defaultValue={`
              ${new Date(Date.now()).getFullYear()}-${(
                new Date(Date.now()).getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${new Date(Date.now())
                .getUTCDate()
                .toString()
                .padStart(2, "0")}`.trim()}
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className={styles["date-finish"]}>
          <label>Data de Termino:</label>
          <div>
            <input
              type="date"
              name="dateFinish"
              data-testid="date-finish"
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className={styles.price}>
          <label>Preço por hora:</label>
          <div>
            <select
            data-testid="currency"
              name="currency"
              id=""
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
            >
              <option value="R$">R$</option>
              <option value="U$">U$</option>
            </select>
            <hr />
            <input
              type="number"
              name="price"
              defaultValue={0}
              data-testid="price"
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: +e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Description..."
        name="description"
        onChange={(e) =>
          handleValue({
            name: e.target.name,
            value: e.target.value,
          })
        }
      />
      <div className={styles.buttons}>
        <button
          data-testid="cancel-create"
          onClick={() => createDialog.close()}
        >
          Cancel
        </button>
        <button data-testid="confirm-create" onClick={() => CreateProject()}>
          Confirm
        </button>
      </div>
    </div>
  );
}

function EditDialog() {
  const { editDialog, handleValue, EditProject, DeleteProject, isFix } =
    useContext(DialogContext);
  return (
    <div
      data-testid="edit-dialog-window"
      className={styles["container-edit"]}
      style={{
        display: editDialog.display,
        top: `${window.pageYOffset / 10 + 20}vh`,
      }}
    >
      <div className={styles.hour}>
        <div className={styles["start-hour"]}>
          <label>Horario de Inicio:</label>
          <div>
            <input
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              data-testid="start-hour"
              name="timeStart"
              type="time"
              defaultValue="10:30"
            />
          </div>
        </div>
        <div className={styles["finish-hour"]}>
          <label>Horario de Termino:</label>
          <div>
            <input
              onChange={(e) =>
                handleValue({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              data-testid="finish-hour"
              name="timeEnd"
              type="time"
              defaultValue="18:00"
            />
          </div>
        </div>
        <div className={styles["is-fix"]}>
          <label>Completar dias: </label>

          <input
            data-testid="complete-days"
            type="checkbox"
            onChange={(e) => isFix(e.target.checked)}
          />
        </div>
      </div>
      <input
        onChange={(e) =>
          handleValue({
            name: e.target.name,
            value: e.target.value,
          })
        }
        name="todo"
        type="text"
        placeholder="Oque fiz hoje?"
      />

      <div className={styles.buttons}>
        <button data-testid="cancel-edit" onClick={() => editDialog.close()}>
          Cancel
        </button>
        <button data-testid="delete-edit" onClick={() => DeleteProject()}>
          Delete
        </button>
        <button data-testid="confirm-edit" onClick={() => EditProject()}>
          Confirm
        </button>
      </div>
    </div>
  );
}

function ConfirmWindow() {
  const { confirmDialog, Finish } = useContext(DialogContext);
  return (
    <div
      data-testid="finish-dialog-window"
      className={styles["container-confirm"]}
      style={{
        display: confirmDialog.display,
        top: `${window.pageYOffset + 231}px`,
      }}
    >
      <div>
        <p>Are you sure about finish this job?</p>
      </div>
      <div className={styles.buttons}>
        <button data-testid="cancel-finish" onClick={() => confirmDialog.close()}>Cancel</button>
        <button data-testid="confirm-finish" onClick={() => Finish()}>Confirm</button>
      </div>
    </div>
  );
}

export { CreateDialog, EditDialog, ConfirmWindow };
