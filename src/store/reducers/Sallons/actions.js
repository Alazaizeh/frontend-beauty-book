import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAccessToken from 'utils/accessToken/getAccessToken';
 

export const getSalons = createAsyncThunk('salons/getSalons', async (data) => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/salons`,
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

export const getSalonsStatistics = createAsyncThunk('salons/getSalonsStatistics', async () => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/salons/statistics`,
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


export const getAppointmentByID = createAsyncThunk('salons/getAppointmentByID', async (id) => {
  let accessToken =getAccessToken();


let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/salons/details/${id}`,
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

export const addSalons = createAsyncThunk('salons/addSalons', async (rule) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/salons/add`, rule, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});
export const updateSalons = createAsyncThunk('salons/updateSalons', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/salons/update`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const removeSalons = createAsyncThunk('salons/removeSalons', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/salons/remove`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

 