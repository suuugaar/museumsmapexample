import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { CardInfoType } from './cardSlice'


export const fetchCardInfo = createAsyncThunk('card/fetchCardInfo', async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/api/cards/?userId=${userId}`);
  return response.data.length > 0 ? response.data[0] : null;
});

export const updateCardValidity = createAsyncThunk(
  'card/updateCardValidity',
  async ({ userId, cardInfo }: { userId: number; cardInfo: CardInfoType }) => {
    const validity = new Date(cardInfo.validity);
    validity.setFullYear(validity.getFullYear() + 1);
    const response = await axios.put(`http://localhost:3000/api/cards/${cardInfo.id}`, {
      userId,
      validity: validity.toISOString(),
    });
    return response.data;
  }
);

export const addNewCard = createAsyncThunk('card/addNewCard', async (userId: number) => {
  const validity = new Date();
  validity.setFullYear(validity.getFullYear() + 1);
  const response = await axios.post('http://localhost:3000/api/cards', {
    userId,
    validity: validity.toISOString(),
  });
  return response.data;
});

export const addNewOrder = createAsyncThunk('order/addNewOrder', async (payload: { userId: number, userName: string, address: string }) => {
  const response = await axios.post('http://localhost:3000/api/orders', payload);
  return response.data;
});

export const fetchOrders = createAsyncThunk('orders/all', async () => {
  const response = await axios.get('http://localhost:3000/api/orders');
  return response.data;
});
