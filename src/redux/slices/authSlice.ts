import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { AuthState, UserData, IUser } from "../types";
import { RootState } from "../store";
import Cookies from "js-cookie";

// Saved Tokens in Cookies
const access_token = Cookies.get("session");
const refresh_token = Cookies.get("refresh");

const initialState: AuthState = {
  access_token: access_token || "",
  refresh_token: refresh_token || "",
  user: null,
  isAuthenticated: false,
  passwordResetStatus: "",
  passwordResetError: "",
  emailVerificationStatus: "",
  emailVerificationError: "",
  loading: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
};

// Register and Login Async Thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: UserData, { rejectWithValue }) => {
    try {
      const token = await axios.post("/auth/register", user);
      Cookies.set("session", token.data.access_token, {
        secure: true,
      });
      Cookies.set("refresh", token.data.refresh_token, {
        secure: true,
      });
      return token.data;
    } catch (error: string | any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserData, { rejectWithValue }) => {
    try {
      const token = await axios.post("/auth/login", user);
      Cookies.set("session", token.data.access_token, {
        secure: true,
      });
      Cookies.set("refresh", token.data.refresh_token, {
        secure: true,
      });
      localStorage.setItem("access_token", token.data.access_token);
      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (id: any) => {
  try {
    const res = await axios.post("/auth/logout", id);
    if (res.status === 200) {
      Cookies.remove("session");
      Cookies.remove("refresh");
    }
  } catch (error: any) {
    return console.log(error.response.data.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: object, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/forgot-password", email);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/reset-password", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/resend-verification-email", {
        email,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Auth Slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state) => {
      if (state.access_token) {
        const decodedUser: any = jwtDecode(state.access_token);
        return {
          ...state,
          user: decodedUser,
          isAuthenticated: true,
          loading: false,
          passwordResetError: "",
          registerError: "",
          loginError: "",
        };
      }
    },
    resendEmail: (state) => {
      return { ...state, loading: false, passwordResetStatus: "pending" };
    },
    logoutOnTokenExpire: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        access_token: "",
        refresh_token: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, loading: true, registerStatus: "pending" };
    });
    builder.addCase(
      registerUser.fulfilled,
      (
        state,
        action: PayloadAction<{ access_token: string; refresh_token: string }>
      ) => {
        return {
          ...state,
          loading: false,
          registerStatus: "fulfilled",
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
          isAuthenticated: true,
        };
      }
    );
    builder.addCase(registerUser.rejected, (state, action: any) => {
      return {
        ...state,
        loading: false,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true, loginStatus: "pending" };
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{ access_token: string; refresh_token: string }>
      ) => {
        return {
          ...state,
          loading: false,
          loginStatus: "fulfilled",
          loginError: "",
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
          isAuthenticated: true,
        };
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      const error: any = action.payload;
      return {
        ...state,
        loading: false,
        loginStatus: "rejected",
        loginError: error,
      };
    });
    builder.addCase(logout.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(logout.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        access_token: "",
        refresh_token: "",
        isAuthenticated: false,
      };
    });
    builder.addCase(logout.rejected, (state) => {
      return { ...state, loading: false };
    });
    builder.addCase(forgotPassword.pending, (state) => {
      return { ...state, loading: true, passwordResetStatus: "pending" };
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        passwordResetStatus: "successful",
        passwordResetError: "",
      };
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      const error: any = action.payload;
      return {
        ...state,
        loading: false,
        passwordResetStatus: "failed",
        passwordResetError: error,
      };
    });
    builder.addCase(resetPassword.pending, (state) => {
      return { ...state, loading: true, passwordResetStatus: "pending" };
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        passwordResetStatus: "successful",
        passwordResetError: "",
      };
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      const error: any = action.payload;
      return {
        ...state,
        loading: false,
        passwordResetStatus: "failed",
        passwordResetError: error,
      };
    });
    builder.addCase(resendVerificationEmail.pending, (state) => {
      return { ...state, loading: true, emailVerificationStatus: "pending" };
    });
    builder.addCase(resendVerificationEmail.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        emailVerificationStatus: "successful",
        emailVerificationError: "",
      };
    });
    builder.addCase(resendVerificationEmail.rejected, (state, action) => {
      const error: any = action.payload;
      return {
        ...state,
        loading: false,
        emailVerificationStatus: "failed",
        emailVerificationError: error,
      };
    });
  },
});

export const { resendEmail, getUser, logoutOnTokenExpire } = AuthSlice.actions;
export const AuthSelector = (state: RootState) => state.auth;
export default AuthSlice.reducer;
