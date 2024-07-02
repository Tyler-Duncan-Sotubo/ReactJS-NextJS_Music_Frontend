import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Cookies from "js-cookie";

// Define a type for the slice state
interface CurrencyState {
  currency: string;
}

// Define the initial state using that type
const initialState: CurrencyState = {
  currency: Cookies.get("currency") || "USD",
};

export const currencySlice = createSlice({
  name: "currency",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrencyState: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      Cookies.set("currency", action.payload, {
        expires: 1,
        secure: true,
      });
    },
  },
});

export const { setCurrencyState } = currencySlice.actions;
export const CurrencySelector = (state: RootState) => state.currency;
export default currencySlice.reducer;
