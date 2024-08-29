import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  phone?: string;
}

export const fetchReg = createAsyncThunk(
  "user/reg",
  async (user: UserInputs): Promise<User> => {
    const response = await axios.post("http://localhost:3000/api/user", user, {withCredentials: true});
    return response.data;
  }
);

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: UserInputs): Promise<User> => {
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      user,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchAuth = createAsyncThunk(
  "user/auth",
  async (): Promise<User> => {
    const response = await axios.get("http://localhost:3000/api/user/auth", {
      withCredentials: true,
    });
    return response.data;
  }
);

export const fetchLogout = createAsyncThunk(
  "user/logout",
  async (): Promise<void> => {
    await axios.get("http://localhost:3000/api/user/logout", {
      withCredentials: true,
    });
  }
);
