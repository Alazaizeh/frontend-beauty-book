import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import getAccessToken from 'utils/accessToken/getAccessToken';
import removeAccessToken from 'utils/accessToken/removeAccessToken';
import setAccessToken from 'utils/accessToken/setAccessToken';

const initialState = {
  user: null, // Initial user state
  isAuthenticated: false,
  isLoggingIn: false,
  isLoggingOut: false,
  loginError: '',
  logOutError: '',
  user_id: 0,
  email: '',
  first_name: '',
  last_name: '',
  registration_date :"",
  last_login :"",
  role: '',
  pages: [],
  actions: []
};

function encrypt(text) {
  try {
    // Ensure the key and IV are in the correct format (WordArray)
    const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_customKey);
    const iv = CryptoJS.enc.Hex.parse(process.env.REACT_APP_customIV);
    // Encrypt the text with AES using the key and IV
    const cipherText = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return cipherText.toString();
  } catch (error) {
    console.log(error);
  }
}

export const verifyAuth = createAsyncThunk('user/verifyAuth', async () => {
  
  let accessToken =getAccessToken();
 
  let response = await axios.post(
    `${process.env.REACT_APP_SERVERIP}/auth/verify`,{},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const payload = { ...response.data, ...decodeToken(response.data.accessToken) };

  return payload;
});

export const userLogin = createAsyncThunk('user/userLogin', async (loginData) => {
  try {
    const { email, password } = loginData;
    let response = await axios.post(
      `${process.env.REACT_APP_SERVERIP}/auth/login`,
      {
        email: email,
        password: encrypt(password)
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const payload = { ...response.data, ...decodeToken(response.data.accessToken) };

    return payload;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.accessToken;
      state.pages = action.payload.pages;
      state.actions = action.payload.actions;
      state.isAuthenticated = true;
      state.isLoggingIn = false;
      state.user_id = action.payload.USER_ID;
      state.email = action.payload.EMAIL;
      state.first_name = action.payload.FIRST_NAME;
      state.last_name = action.payload.LAST_NAME;
      state.role = action.payload.ROLE_NAME;
      state.registration_date = action.payload.REGISTRATION_DATE;
      state.last_login = action.payload.LAST_LOGIN;
    },

    // Action to clear the user and mark them as unauthenticated
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggingOut = false;
      state.pages = [];
      state.actions = [];
      state.user_id = 0;
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.role = '';
      state.registration_date  = '';
      state.last_login  = '';
      removeAccessToken();
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(verifyAuth.pending, (state, action) => {
        state.isLoggingIn = true;
        state.pages = [];
        state.actions = [];
        state.email = '';
        state.first_name = '';
        state.last_name = '';
        state.role = '';
        state.registration_date  = '';
        state.last_login  = '';
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload.accessToken;
        state.isAuthenticated = true;
        state.pages = action.payload.pages;
        state.actions = action.payload.actions;
        state.user_id = action.payload.USER_ID;
        state.email = action.payload.EMAIL;
        state.first_name = action.payload.FIRST_NAME;
        state.last_name = action.payload.LAST_NAME;
        state.role = action.payload.ROLE_NAME;
        state.registration_date = action.payload.REGISTRATION_DATE;
        state.last_login = action.payload.LAST_LOGIN;
 
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.isAuthenticated = false;
        state.pages = [];
        state.actions = [];
        state.email = '';
        state.first_name = '';
        state.last_name = '';
        state.role = '';
        state.registration_date  = '';
        state.last_login  = '';
      })
      .addCase(userLogin.pending, (state, action) => {
        state.isLoggingIn = true;
        state.pages = [];
        state.actions = [];
        state.email = '';
        state.first_name = '';
        state.last_name = '';
        state.role = '';
        state.registration_date  = '';
        state.last_login  = '';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload.accessToken;
        state.isAuthenticated = true;
        state.pages = action.payload.pages;
        state.actions = action.payload.actions;
        state.user_id = action.payload.USER_ID;
        state.email = action.payload.EMAIL;
        state.first_name = action.payload.FIRST_NAME;
        state.last_name = action.payload.LAST_NAME;
        state.role = action.payload.ROLE_NAME;
        state.registration_date = action.payload.REGISTRATION_DATE;
        state.last_login = action.payload.LAST_LOGIN;
        setAccessToken(action.payload.accessToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isLoggingIn = false;
        state.isAuthenticated = false;
        state.pages = [];
        state.actions = [];
        state.email = '';
        state.first_name = '';
        state.last_name = '';
        state.role = '';
        state.registration_date  = '';
        state.last_login  = '';
      });
  }
});

export const { setUser, clearUser, startLoggingIn, finishLoggingIn, startLoggingOut, finishLoggingOut, loginFailed } = authSlice.actions;
export default authSlice.reducer;
