import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, fetchLogin, fetchLogout, fetchReg } from './thunkActions';

const initialState: {user: {id: number;email: string;password: string; err?: string;firstName: string;lastName: string;city: string;phone?: string;anon?:boolean}} = {
  user: {
    id: 0,
    email: "",
    password: "",
    err: "",
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    anon: false
  },
};

const usersSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchReg.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = {
        id: 0,
        email: "",
        password: "",
        err: "",
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
      }
    })
  },
});

export default usersSlice.reducer;
