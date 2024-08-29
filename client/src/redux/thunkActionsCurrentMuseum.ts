import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store'; 

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/api/favorites?userId=${userId}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const fetchVisited = createAsyncThunk(
  'visited/fetchAll',
  async ( userId: number ) => {
    const response = await axios.get(`http://localhost:3000/api/visited?userId=${userId}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const fetchAddFavorite = createAsyncThunk(
  'favorites/add',
  // async (museumId: number, { getState }) => {
  //   try {
  //     const state = getState() as RootState;
  //     const userId = state.userSlice.user.id;
  async ({ userId, museumId }: { userId: number; museumId: number }) => {
      const response = await axios.post('http://localhost:3000/api/favorites', { museumId, userId }, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Не удалось добавить в избранное');
      }

      return response.data;
  }
);

export const fetchRemoveFavorite = createAsyncThunk(
  'favorites/remove',
  async (id: number) => {
    const response = await axios.delete(`http://localhost:3000/api/favorites/${id}`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Не удалось удалить из избранного');
    }

    return response.data;
  }
);

export const fetchAddVisited = createAsyncThunk(
  'visited/add',
  async ({ userId, museumId }: { userId: number; museumId: number }) => {
    const response = await axios.post('http://localhost:3000/api/visited', { userId, museumId }, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Не удалось добавить в посещенные');
    }

    return response.data;
  }
);

export const fetchRemoveVisited = createAsyncThunk(
  'visited/remove',
  async (id: number) => {
    const response = await axios.delete(`http://localhost:3000/api/visited/${id}`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Не удалось удалить из посещенных');
    }

    return response.data;
  }
);
