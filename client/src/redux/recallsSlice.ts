import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRecalls } from './thunkActionsCurrentMuseum';
import type { RecallType } from '../pages/CurrentMuseum/currMusTypes';

interface RecallsState {
  [museumId: string]: RecallType[];
}

const initialRecallsState: RecallsState = {};

const recallsSlice = createSlice({
  name: 'recallsSlice',
  initialState: initialRecallsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRecalls.fulfilled,
      (
        state,
        action: PayloadAction<{ museumId: number; recalls: RecallType[] }>,
      ) => {
        state[action.payload.museumId] = action.payload.recalls;
      },
    );
  },
});

export default recallsSlice.reducer;
