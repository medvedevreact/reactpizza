import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";

type FetchPizzasArgs = {
  sortType: {
    name: string;
    sort: string;
  };
  categoryId: number;
  page: number;
  LIMIT_PER_PAGE: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { sortType, categoryId, page, LIMIT_PER_PAGE } = params;

    const resp = await axios.get<PizzaItem[]>(
      `https://65fc373d14650eb2100bda9e.mockapi.io/react-pizza/pizzas?page=${page}&limit=${LIMIT_PER_PAGE}&${
        categoryId > 0 ? `category=${categoryId}&` : ""
      }sortBy=${sortType.sort}&order=desc`
    );

    return resp.data;
  }
);

export type PizzaItem = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: number;
};

enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "eror",
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCES;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export default pizzaSlice.reducer;
