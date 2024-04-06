import React, { useCallback, useState } from "react";
import styles from "./Search.module.scss";
import { debounce } from "lodash";

type SearchProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export const Search: React.FC<SearchProps> = ({
  searchInput,
  setSearchInput,
}) => {
  const [value, setValue] = useState("");

  const updateSearchInput = useCallback(
    debounce((str: string) => {
      setSearchInput(str);
    }, 1000),
    []
  );

  const onchangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchInput(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <title />
        <path
          d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
          fill="#464646"
        />
      </svg>
      <input
        value={value}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
        onChange={(e) => {
          onchangeValue(e);
        }}
      />
    </div>
  );
};
