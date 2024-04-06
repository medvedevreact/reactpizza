import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../store/filterSlice.ts";

type CategoriesProps = {
  categoryId: number;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = ({ categoryId }) => {
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={categoryId === index ? "active" : ""}
            onClick={() => {
              dispatch(setCategoryId(index));
            }}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
