import { createSlice } from "@reduxjs/toolkit";
import {
  addServices,
  getServices,
  getServicesStatistics,
  getAppointmentByID,
  removeServices,
  updateServices,
} from "./actions";
import {
  getServicesFulfilled,
  getServicesPending,
  getServicesRejected,
  getAppointmentByIDFulfilled,
  getAppointmentByIDPending,
  getAppointmentByIDRejected,
  getServicesStatisticsFulfilled,
  getServicesStatisticsPending,
  getServicesStatisticsRejected,
  addServicesFulfilled,
  addServicesPending,
  addServicesRejected,
  removeServicesFulfilled,
  removeServicesPending,
  removeServicesRejected,
  updateServicesFulfilled,
  updateServicesPending,
  updateServicesRejected,
} from "./reducers";

const initialState = {
  servicesData: [],
  appointment: {},
  servicesNumber: 0,
  servicesStatistics: 0,
  loading: {
    getServices: false,
    getAppointmentByID: false,
    getServicesStatistics: false,
    addServices: false,
    updateServices: false,
    removeServices: false,
  },
  error: {
    getServices: "",
    getAppointmentByID: "",
    getServicesStatistics: "",
    addServices: "",
    updateServices: "",
    removeServices: "",
  },
  success: {
    getServices: "",
    getAppointmentByID: "",
    getServicesStatistics: "",
    addServices: "",
    updateServices: "",
    removeServices: "",
  },
};
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.success.addServices = "";
      state.success.updateServices = "";
      state.success.removeServices = "";
      state.error.addServices = "";
      state.error.updateServices = "";
      state.error.removeServices = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getServices.pending, getServicesPending)
      .addCase(getServices.fulfilled, getServicesFulfilled)
      .addCase(getServices.rejected, getServicesRejected)
      .addCase(
        getServicesStatistics.pending,
        getServicesStatisticsPending
      )
      .addCase(
        getServicesStatistics.fulfilled,
        getServicesStatisticsFulfilled
      )
      .addCase(
        getServicesStatistics.rejected,
        getServicesStatisticsRejected
      )
      .addCase(getAppointmentByID.pending, getAppointmentByIDPending)
      .addCase(getAppointmentByID.fulfilled, getAppointmentByIDFulfilled)
      .addCase(getAppointmentByID.rejected, getAppointmentByIDRejected)
      .addCase(addServices.pending, addServicesPending)
      .addCase(addServices.fulfilled, addServicesFulfilled)
      .addCase(addServices.rejected, addServicesRejected)
      .addCase(updateServices.pending, updateServicesPending)
      .addCase(updateServices.fulfilled, updateServicesFulfilled)
      .addCase(updateServices.rejected, updateServicesRejected)
      .addCase(removeServices.pending, removeServicesPending)
      .addCase(removeServices.fulfilled, removeServicesFulfilled)
      .addCase(removeServices.rejected, removeServicesRejected);
  },
});

export const { selectUser } = servicesSlice.actions;
export default servicesSlice.reducer;
