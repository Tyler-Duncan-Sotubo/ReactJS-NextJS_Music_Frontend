import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";

const label_access_token = Cookies.get("label_session");

const initialState = {
  label_access_token: label_access_token || "",
  label: {},
  loginStatus: "",
  loginError: "",
};

export const labelLogin = createAsyncThunk(
  "auth/login",
  async (label: any, { rejectWithValue }) => {
    try {
      const token = await axios.post("api/label/login", label);
      Cookies.set("label_session", token.data.access_token, {
        secure: true,
      });
      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const labelAuthSlice = createSlice({
  name: "labelAuth",
  initialState,
  reducers: {
    getLabel: (state) => {
      if (state.label_access_token) {
        const label = jwtDecode(state.label_access_token);
        return { ...state, label };
      }
    },
    logout: (state) => {
      Cookies.remove("label_session");
      return { ...state, label_access_token: "", label: {} };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(labelLogin.pending, (state) => {
      return { ...state, loginStatus: "loading" };
    });
    builder.addCase(labelLogin.fulfilled, (state, { payload }) => {
      return {
        ...state,
        label_access_token: payload.access_token,
        loginStatus: "success",
        loginError: "",
      };
    });
    builder.addCase(labelLogin.rejected, (state, { payload }) => {
      return {
        ...state,
        loginStatus: "failed",
        loginError: payload as string,
      };
    });
  },
});

export const { getLabel, logout } = labelAuthSlice.actions;
export const selectLabel = (state: RootState) => state.labelAuth;
export default labelAuthSlice.reducer;
