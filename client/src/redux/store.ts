import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import favoritesSlice from "./favoritesSlice";
// import recallsSlice from "./recallsSlice";
import visitedSlice from "./visitedSlice";
import cardSlice from "./cardSlice";
import allMuseumsSlice from "./allMuseumsSlice";
import { initializeI18n } from '../../../i18n';
import languageReducer from './languageSlice'

const storeOptions = {
  reducer: {
    userSlice,
    favoritesSlice,
    // recallsSlice,
    visitedSlice,
    cardSlice,
    allMuseumsSlice,
    language: languageReducer,
  },
};

export const store = configureStore(storeOptions);

initializeI18n(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;