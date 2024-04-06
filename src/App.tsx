import React from "react";
import "./App.css";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header.tsx";
import { PizzaBlock } from "./components/PizzaBlock/PizzaBlock";
import { Sort } from "./components/Sort";
import Skeleton from "./components/PizzaBlock/Skeleton";

import "./scss/app.scss";

import { Home } from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const Cart = React.lazy(() => import("./pages/Cart.tsx"));
const FullPizza = React.lazy(() => import("./pages/FullPizza.tsx"));

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchInput={searchInput} />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/cart"
              element={
                <React.Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                  <Cart />
                </React.Suspense>
              }
            />
            <Route
              path="/pizza/:id"
              element={
                <React.Suspense>
                  <FullPizza />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
