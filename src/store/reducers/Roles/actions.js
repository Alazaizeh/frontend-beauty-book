import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { closeAddModal, closeRemoveModal, closeUpdateModal } from './index';
import getAccessToken from 'utils/accessToken/getAccessToken';

export const updateRoles = createAsyncThunk('roles/updateRoles', async (role, { dispatch }) => {
  try {
    let accessToken =getAccessToken();

    let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/roles/update`, role, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const payload = response.data;

    setTimeout(() => {
      dispatch(closeUpdateModal());
    dispatch(getAccess());
    }, 2000);
    
    return payload;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

export const addRoles = createAsyncThunk('roles/addRoles', async (role, { dispatch }) => {
  try {
    let accessToken =getAccessToken();


    let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/roles/add`, role, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const payload = response.data;

    setTimeout(() => {
      dispatch(closeAddModal());
    dispatch(getAccess());
    }, 2000);
    return payload;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

export const removeRoles = createAsyncThunk('roles/removeRoles', async (data, { dispatch }) => {
  try {
    let accessToken =getAccessToken();


    let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/roles/remove`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const payload = response.data;
      dispatch(closeRemoveModal());
    dispatch(getAccess());
    return payload;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
 
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

export const getAccess = createAsyncThunk('roles/getAccess', async () => {
  let accessToken =getAccessToken();


  let response = await axios.post(
    `${process.env.REACT_APP_SERVERIP}/roles/get/access`,{},
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

export const getActions = createAsyncThunk('roles/getActions', async () => {
  let accessToken =getAccessToken();


  let response = await axios.get(
    `${process.env.REACT_APP_SERVERIP}/actions`,
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

export const getPages = createAsyncThunk('roles/getPages', async () => {
  let accessToken =getAccessToken();


  let response = await axios.get(
    `${process.env.REACT_APP_SERVERIP}/pages`,
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
