import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAccessToken from "utils/accessToken/getAccessToken";

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (data) => {
    let accessToken = getAccessToken();

    let response = await axios.get(
      `${process.env.REACT_APP_SERVERIP}/appointments`,
      {
        params: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);

export const getAppointmentsStatistics = createAsyncThunk(
  "appointments/getAppointmentsStatistics",
  async () => {
    let accessToken = getAccessToken();

    let response = await axios.get(
      `${process.env.REACT_APP_SERVERIP}/appointments/statistics`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);

export const getAppointmentByID = createAsyncThunk(
  "appointments/getAppointmentByID",
  async (id) => {
    let accessToken = getAccessToken();

    let response = await axios.get(
      `${process.env.REACT_APP_SERVERIP}/appointments/details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);

export const addAppointments = createAsyncThunk(
  "appointments/addAppointments",
  async (rule) => {
    let accessToken = getAccessToken();

    let response = await axios.post(
      `${process.env.REACT_APP_SERVERIP}/appointments/add`,
      rule,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);
export const updateAppointments = createAsyncThunk(
  "appointments/updateAppointments",
  async () => {
    let accessToken = getAccessToken();

    let response = await axios.post(
      `${process.env.REACT_APP_SERVERIP}/appointments/update`,{},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);

export const removeAppointments = createAsyncThunk(
  "appointments/removeAppointments",
  async () => {
    let accessToken = getAccessToken();

    let response = await axios.post(
      `${process.env.REACT_APP_SERVERIP}/appointments/remove`,{},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const payload = response.data;
    return payload;
  }
);
