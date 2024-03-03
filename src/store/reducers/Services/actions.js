import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAccessToken from 'utils/accessToken/getAccessToken';
 

export const getServices = createAsyncThunk('services/getServices', async (data) => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/services`,
  {
    params: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }
);
const payload = response.data;
return payload;
});

export const getServicesStatistics = createAsyncThunk('services/getServicesStatistics', async () => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/services/statistics`,
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


export const getAppointmentByID = createAsyncThunk('services/getAppointmentByID', async (id) => {
  let accessToken =getAccessToken();


let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/services/details/${id}`,
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

export const addServices = createAsyncThunk('services/addServices', async (rule) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/services/add`, rule, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});
export const updateServices = createAsyncThunk('services/updateServices', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/services/update`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const removeServices = createAsyncThunk('services/removeServices', async (id) => {
    let accessToken =getAccessToken();


  let response = await axios.delete(`${process.env.REACT_APP_SERVERIP}/services/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

 