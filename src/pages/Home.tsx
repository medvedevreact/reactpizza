import React, { useLayoutEffect, useRef } from "react";
import { Categories } from "../components/Categories.tsx";
import { Sort, list } from "../components/Sort.tsx";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton.tsx";
import { Pagination } from "../components/Pagination/Pagination.tsx";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../store/filterSlice.ts";
import { PizzaItem, fetchPizzas } from "../store/pizzaSlice.ts";
import { RootState, useAppDispatch } from "../store/index.ts";

const LIMIT_PER_PAGE = 4;

type HomeProps = {
  searchInput: string;
};

export const Home: React.FC<HomeProps> = ({ searchInput }) => {
  const pizzas = useSelector((state: RootState) => state.pizza.items);
  const status = useSelector((state: RootState) => state.pizza.status);
  const page = useSelector((state: RootState) => state.filter.page);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sort);

  console.log(window.location, "location");

  useLayoutEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const categoryId = parseInt(params.categoryId as string);
      const page = parseInt(params.page as string);

      const sort = list.find((obj) => obj.sort === params.sortProperty) as {
        name: string;
        sort: string;
      };

      dispatch(
        setFilters({
          categoryId,
          page,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const getPizzas = () => {
    dispatch(fetchPizzas({ sortType, categoryId, page, LIMIT_PER_PAGE }));
  };

  useLayoutEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, page]);

  useLayoutEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sort,
        categoryId,
        page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, page, sortType]);

  const filteredPizzas = pizzas.filter((el: PizzaItem) =>
    el.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="container">
      <div>
        <div className="content__top">
          <Categories categoryId={categoryId} />
          <Sort sortType={sortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : filteredPizzas.map((el) => (
                <PizzaBlock
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  price={el.price}
                  img={el.imageUrl}
                  sizes={el.sizes}
                  types={el.types}
                />
              ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
};
