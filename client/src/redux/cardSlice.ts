import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCardInfo, updateCardValidity, addNewCard, addNewOrder, fetchOrders } from './thunkActionsCard';
import { NumberInputFieldProps } from '@chakra-ui/react';

export type OrderType = {
  id: number;
  userId: number;
  userName: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Orders = Array<OrderType>;

export interface CardInfoType {
  id: number;
  validity: string;
}

interface CardState {
  cardInfo: CardInfoType | null;
  cardIsOrdered: boolean;
  inputAddress: string,
  orders: Orders;
  choiceIsMade: boolean;
}

const initialState: CardState = {
  cardInfo: null,
  cardIsOrdered: false,
  inputAddress: '',
  orders: [],
  choiceIsMade: false,
};

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {
    madeChoise(state, action) {
      state.choiceIsMade =  action.payload;
    },
    changeAddress(state, action) {
      state.inputAddress = action.payload;
    },
    makeOrder(state, action) {
      state.cardIsOrdered =  action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardInfo.fulfilled, (state, action: PayloadAction<CardInfoType | null>) => {
      state.cardInfo = action.payload;

    });
    builder.addCase(updateCardValidity.fulfilled, (state, action: PayloadAction<CardInfoType>) => {
      state.cardInfo = action.payload;
    });
    builder.addCase(addNewCard.fulfilled, (state, action: PayloadAction<CardInfoType>) => {
      state.cardInfo = action.payload;
    });
    builder.addCase(addNewOrder.fulfilled, (state, action: PayloadAction<OrderType>) => {
      state.orders.push(action.payload);
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export default cardSlice.reducer;
export const { madeChoise, changeAddress, makeOrder } = cardSlice.actions;