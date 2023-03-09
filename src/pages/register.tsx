import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RegisterContext } from "../contexts/pages/register.context";
import styles from "../styles/pages/register.module.css";

export default function Register() {
  const { register, handleValue } = useContext(RegisterContext);

  return (
    <div
      data-testid="registerWindow"
      className={styles.window}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   register();
      // }}
    >
      <div className={styles.container}>
        <Link data-testid="getBack" to="/">
          &#129044;
        </Link>
        <input
          type="username"
          placeholder="Username..."
          onChange={(e) =>
            handleValue({
              name: e.target.name,
              value: e.target.value,
            })
          }
          name="username"
        />
        <input
          type="email"
          name="email"
          placeholder="Email..."
          onChange={(e) =>
            handleValue({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={(e) =>
            handleValue({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <button onClick={() => register()} data-testid="register">
          Register
        </button>
      </div>
    </div>
  );
}
