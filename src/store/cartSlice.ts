import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  size: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") ?? "[]").reduce(
        (acc: number, obj: CartItem) => acc + obj.price * obj.count,
        0
      )
    : 0,
  items: localStorage.getItem("cart")
    ? (JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[])
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (acc, obj) => acc + obj.price * obj.count,
        0
      );
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce(
        (acc, obj) => acc + obj.price * obj.count,
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
        state.totalPrice = state.items.reduce(
          (acc, obj) => acc + obj.price * obj.count,
          0
        );
      }
    },
  },
});

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
