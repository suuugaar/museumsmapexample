import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMuseums = createAsyncThunk('museums/all', async (_, { getState }) => {
  const state = getState();
  const language = state.language.language; // Получение языка из состояния
  const response = await axios.get(`http://localhost:3000/api/museums?lang=${language}`);
  return response.data;
});