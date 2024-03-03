import { createSlice } from "@reduxjs/toolkit";
import {
  addAppointments,
  getAppointments,
  getAppointmentsStatistics,
  getAppointmentByID,
  removeAppointments,
  updateAppointments,
} from "./actions";
import {
  getAppointmentsFulfilled,
  getAppointmentsPending,
  getAppointmentsRejected,
  getAppointmentByIDFulfilled,
  getAppointmentByIDPending,
  getAppointmentByIDRejected,
  getAppointmentsStatisticsFulfilled,
  getAppointmentsStatisticsPending,
  getAppointmentsStatisticsRejected,
  addAppointmentsFulfilled,
  addAppointmentsPending,
  addAppointmentsRejected,
  removeAppointmentsFulfilled,
  removeAppointmentsPending,
  removeAppointmentsRejected,
  updateAppointmentsFulfilled,
  updateAppointmentsPending,
  updateAppointmentsRejected,
} from "./reducers";

const initialState = {
  appointmentsData: [],
  appointment: {},
  appointmentsNumber: 0,
  appointmentsStatistics: {},
  loading: {
    getAppointments: false,
    getAppointmentByID: false,
    getAppointmentsStatistics: false,
    addAppointments: false,
    updateAppointments: false,
    removeAppointments: false,
  },
  error: {
    getAppointments: "",
    getAppointmentByID: "",
    getAppointmentsStatistics: "",
    addAppointments: "",
    updateAppointments: "",
    removeAppointments: "",
  },
  success: {
    getAppointments: "",
    getAppointmentByID: "",
    getAppointmentsStatistics: "",
    addAppointments: "",
    updateAppointments: "",
    removeAppointments: "",
  },
};
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.success.addAppointments = "";
      state.success.updateAppointments = "";
      state.success.removeAppointments = "";
      state.error.addAppointments = "";
      state.error.updateAppointments = "";
      state.error.removeAppointments = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getAppointments.pending, getAppointmentsPending)
      .addCase(getAppointments.fulfilled, getAppointmentsFulfilled)
      .addCase(getAppointments.rejected, getAppointmentsRejected)
      .addCase(
        getAppointmentsStatistics.pending,
        getAppointmentsStatisticsPending
      )
      .addCase(
        getAppointmentsStatistics.fulfilled,
        getAppointmentsStatisticsFulfilled
      )
      .addCase(
        getAppointmentsStatistics.rejected,
        getAppointmentsStatisticsRejected
      )
      .addCase(getAppointmentByID.pending, getAppointmentByIDPending)
      .addCase(getAppointmentByID.fulfilled, getAppointmentByIDFulfilled)
      .addCase(getAppointmentByID.rejected, getAppointmentByIDRejected)
      .addCase(addAppointments.pending, addAppointmentsPending)
      .addCase(addAppointments.fulfilled, addAppointmentsFulfilled)
      .addCase(addAppointments.rejected, addAppointmentsRejected)
      .addCase(updateAppointments.pending, updateAppointmentsPending)
      .addCase(updateAppointments.fulfilled, updateAppointmentsFulfilled)
      .addCase(updateAppointments.rejected, updateAppointmentsRejected)
      .addCase(removeAppointments.pending, removeAppointmentsPending)
      .addCase(removeAppointments.fulfilled, removeAppointmentsFulfilled)
      .addCase(removeAppointments.rejected, removeAppointmentsRejected);
  },
});

export const { selectUser } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
