import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAccessToken from 'utils/accessToken/getAccessToken';

export const getRoles = createAsyncThunk('users/getRoles', async () => {
    let accessToken =getAccessToken();


  let response = await axios.get(
    `${process.env.REACT_APP_SERVERIP}/roles`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const payload = response.data;
  return payload;
});

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    let accessToken =getAccessToken();


  let response = await axios.get(
    `${process.env.REACT_APP_SERVERIP}/users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const payload = response.data;
  return payload;
});

export const addUsers = createAsyncThunk('users/addUsers', async (rule) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/users/add`, rule, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});
export const updateUsers = createAsyncThunk('users/updateUsers', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/users/update`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const removeUsers = createAsyncThunk('users/removeUsers', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/users/remove`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const updateUsersRole = createAsyncThunk('users/updateUsersRole', async (data) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/users/update/role`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const updateUsersStatus = createAsyncThunk('users/updateUsersStatus', async (data) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/users/update/status`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});
