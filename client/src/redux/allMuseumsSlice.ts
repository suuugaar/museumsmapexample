import { createSlice } from '@reduxjs/toolkit';
import { fetchMuseums } from './thunkActionsAllMuseums';
import { Museums } from '../components/ListMuseums/ListMuseums';

type AllMuseumsSliceType = {
    allMuseums: Museums;
    museums: Museums;
    selectedCity: String;
    selectedDirection: String;
    input: String;
  };

const initialAllMuseumsState: AllMuseumsSliceType = {
  allMuseums: [],
  museums: [],
  selectedCity: '',
  selectedDirection: '',
  input: '',
};

const allMuseumsSlice = createSlice({
  name: 'allMuseumsSlice',
  initialState: initialAllMuseumsState,
  reducers: {
    updateMuseums(state, action) {
      state.museums = action.payload;
    },
    filterMuseumsByCity(state, action) {
      state.museums = state.museums.filter((museum) => museum.city === action.payload);
    },
    filterMuseumsByDirection(state, action) {
      state.museums = state.museums.filter((museum) => museum.theme === action.payload);
    },
    selectCity(state, action) {
      state.selectedCity = action.payload;
    },
    selectDirection(state, action) {
      state.selectedDirection = action.payload;
    },
    searchByContent(state, action) {
      state.input = action.payload;
    },
    filterByInput(state, action) {
      state.museums = state.museums.filter((museum) => museum.name.toLowerCase().includes(action.payload.toLowerCase()));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMuseums.fulfilled, (state, action) => {
      state.allMuseums = action.payload;
      state.museums = action.payload;
    });
    builder.addCase(fetchMuseums.rejected, () => {
      console.log('Ответа нет');
    });
  },
});

export default allMuseumsSlice.reducer;
export const { updateMuseums, filterMuseumsByCity, filterMuseumsByDirection, selectCity, selectDirection, searchByContent, filterByInput } = allMuseumsSlice.actions;