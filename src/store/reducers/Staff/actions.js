import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAccessToken from 'utils/accessToken/getAccessToken';
 

export const getStaff = createAsyncThunk('staff/getStaff', async (data) => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/staff`,
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

export const getStaffStatistics = createAsyncThunk('staff/getStaffStatistics', async () => {
  let accessToken =getAccessToken();

let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/staff/statistics`,
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


export const getAppointmentByID = createAsyncThunk('staff/getAppointmentByID', async (id) => {
  let accessToken =getAccessToken();


let response = await axios.get(
  `${process.env.REACT_APP_SERVERIP}/staff/details/${id}`,
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

export const addStaff = createAsyncThunk('staff/addStaff', async (rule) => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/staff/add`, rule, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});
export const updateStaff = createAsyncThunk('staff/updateStaff', async () => {
    let accessToken =getAccessToken();


  let response = await axios.post(`${process.env.REACT_APP_SERVERIP}/staff/update`,{}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

export const removeStaff = createAsyncThunk('staff/removeStaff', async (id) => {
    let accessToken =getAccessToken();


  let response = await axios.delete(`${process.env.REACT_APP_SERVERIP}/staff/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  const payload = response.data;
  return payload;
});

 