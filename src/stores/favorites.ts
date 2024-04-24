import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FavoriteState = {
  ids: string[];
  isFilterFavorites: boolean;
};

const initialState: FavoriteState = {
  ids: [],
  isFilterFavorites: false,
};

export const favoritesSlice = createSlice({
  name: "favorite-slice",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload);

      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(action.payload);
      }
    },
    toggleFilter: (state) => {
      state.isFilterFavorites = !state.isFilterFavorites;
    },
  },
});

export const { toggle: toggleFavorite, toggleFilter: toggleFilterFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
