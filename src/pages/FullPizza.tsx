import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [currentPizza, setCurrentPizza] = useState<{
    imageUrl: string;
    title: string;
    desc: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(
          `https://65fc373d14650eb2100bda9e.mockapi.io/react-pizza/pizzas/${id}`
        )
        .then((resp) => {
          setCurrentPizza(resp.data);
        });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }, []);

  if (!currentPizza) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="fullPizza-container">
      <img src={currentPizza.imageUrl} alt="" />
      <h2>{currentPizza.title}</h2>
      <p>{currentPizza.desc}</p>
      <h4>{currentPizza.price} Р</h4>
    </div>
  );
};

export default FullPizza;
