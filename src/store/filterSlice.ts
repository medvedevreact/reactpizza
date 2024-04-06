import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
  categoryId: number;
  sort: {
    name: string;
    sort: string;
  };
  page: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<{ name: string; sort: string }>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.page = action.payload.page;
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
