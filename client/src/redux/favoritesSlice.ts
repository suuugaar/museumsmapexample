import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorites, fetchAddFavorite, fetchRemoveFavorite } from './thunkActionsCurrentMuseum';
import type { FavoriteMuseum } from '../Pages/CurrentMuseum/currMusTypes';

interface FavoritesState {
  favorites: FavoriteMuseum[];
}

const initialFavoritesState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState: initialFavoritesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoriteMuseum[]>) => {
      state.favorites = action.payload;
    });
    builder.addCase(fetchAddFavorite.fulfilled, (state, action: PayloadAction<FavoriteMuseum>) => {
      state.favorites.push(action.payload);
    });
    builder.addCase(fetchRemoveFavorite.fulfilled, (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(fav => {
        return (fav.museumId !== action.payload);
      })
    });
  },
});

export default favoritesSlice.reducer;
