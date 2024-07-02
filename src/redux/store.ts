import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import currencySlice from "./slices/currencySlice";
import cartSlice from "./slices/cartSlice";
import adminAuthSlice from "./slices/adminAuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    currency: currencySlice,
    cart: cartSlice,
    adminAuth: adminAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
