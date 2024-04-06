import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice.ts";
import cartReducer from "./cartSlice.ts";
import pizzaReducer from "./pizzaSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
