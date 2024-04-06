import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSvg from "../assets/img/pizza-logo.svg";
import { Search } from "./Search/Search.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import { CartItem } from "../store/cartSlice.ts";

interface HeaderProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearchInput,
}) => {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce(
    (acc: number, item: CartItem) => acc + item.count,
    0
  );
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [totalPrice, items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div className="header-title">
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search setSearchInput={setSearchInput} searchInput={searchInput} />
        <div className="header__cart">
          {location.pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
