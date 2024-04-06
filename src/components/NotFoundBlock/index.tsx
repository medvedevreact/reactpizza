import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>🥺</span>
        <br />
        Ничего не найдено :(
        <p className={styles.desc}>
          К сожалению, данная страница отсутствует в нашем интернет-магазине.
        </p>
      </h1>
    </div>
  );
};
