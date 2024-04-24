import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import popupReducer from "./popup";
import favoritesReducer from "./favorites";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  popup: popupReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "ROOT",
  storage,
  version: 1,
  serialize: true,
  whitelist: ["favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const getTestingStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
