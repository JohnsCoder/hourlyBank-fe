import React from "react";
import styles from "../styles/components/card.module.css";
export default function Card() {
  return (
    <div className={styles.card}>
      <h1>Project Name</h1>
      <span>R$300,00</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum
        velit non nisl aliquet pulvinar. Pellentesque aliquam tincidunt nisi ut
        vehicula. Quisque scelerisque est ut dignissim viverra. Vestibulum ac
        ultrices lectus. Nunc venenatis.
      </p>
      <button className={styles.confirm}>✔</button>
    </div>
  );
}
