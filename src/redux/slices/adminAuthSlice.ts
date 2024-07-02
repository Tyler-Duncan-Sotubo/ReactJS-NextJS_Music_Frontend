import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { AdminUserData } from "../types";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";

// Saved Tokens in Cookies
const admin_access_token = Cookies.get("admin_session");

const initialState = {
  admin_access_token: admin_access_token || "",
  admin: {} as AdminUserData,
  loginStatus: "",
  loginError: "",
};

export const adminLogin = createAsyncThunk(
  "auth/login",
  async (adminUser: AdminUserData, { rejectWithValue }) => {
    try {
      const token = await axios.post("/admin/login", adminUser);
      Cookies.set("admin_session", token.data.access_token, {
        secure: true,
      });
      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      return { ...state, loginStatus: "loading" };
    });
    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      const admin = jwtDecode(payload.access_token);
      return {
        ...state,
        admin_access_token: payload.access_token,
        admin: admin as AdminUserData,
        loginStatus: "success",
        loginError: "",
      };
    });
    builder.addCase(adminLogin.rejected, (state, { payload }) => {
      return {
        ...state,
        loginStatus: "failed",
        loginError: payload as string,
      };
    });
  },
});

export const selectAdmin = (state: RootState) => state.adminAuth;
export default adminAuthSlice.reducer;
