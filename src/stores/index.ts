import { combineReducers, configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup";

const rootReducer = combineReducers({
  popup: popupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
