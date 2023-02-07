import React from "react";
import styles from "../styles/components/card.module.css";

type props = {
  editCard: () => void;
  confirmCard: (e: void) => void;
};
export default function Card({ editCard, confirmCard }: props) {
  return (
    <div className={styles.card} onClick={() => editCard()}>
      <h1>Project Name</h1>
      <span>R$300,00</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum
        velit non nisl aliquet pulvinar. Pellentesque aliquam tincidunt nisi ut
        vehicula. Quisque scelerisque est ut dignissim viverra. Vestibulum ac
        ultrices lectus. Nunc venenatis.
      </p>
      <button
        className={styles.confirm}
        onClick={(e) => confirmCard(e.stopPropagation())}
      >
        ✔
      </button>
    </div>
  );
}
