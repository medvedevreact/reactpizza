import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import { setCurrentPage } from "../../store/filterSlice.ts";
import { RootState, useAppDispatch } from "../../store/index.ts";

const PaginationButtons = [1, 2, 3];

export const Pagination = () => {
  const page = useSelector((state: RootState) => state.filter.page);
  const dispatch = useAppDispatch();
  const nextBtn = () => {
    if (page < PaginationButtons.length) {
      dispatch(setCurrentPage(page + 1));
    }
  };
  const prevBtn = () => {
    if (page > 1) {
      dispatch(setCurrentPage(page - 1));
    }
  };

  return (
    <div className={styles.buttons}>
      <button className={styles.button} onClick={prevBtn}>
        <IoIosArrowBack />
      </button>
      {PaginationButtons.map((btn) => (
        <button
          key={btn}
          onClick={() => dispatch(setCurrentPage(btn))}
          className={
            btn === page ? `${styles.button} ${styles.active}` : styles.button
          }
        >
          {btn}
        </button>
      ))}
      <button className={styles.button} onClick={nextBtn}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};
