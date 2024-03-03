import { createSlice } from "@reduxjs/toolkit";
import {
  addSalons,
  getSalons,
  getSalonsStatistics,
  getAppointmentByID,
  removeSalons,
  updateSalons,
} from "./actions";
import {
  getSalonsFulfilled,
  getSalonsPending,
  getSalonsRejected,
  getAppointmentByIDFulfilled,
  getAppointmentByIDPending,
  getAppointmentByIDRejected,
  getSalonsStatisticsFulfilled,
  getSalonsStatisticsPending,
  getSalonsStatisticsRejected,
  addSalonsFulfilled,
  addSalonsPending,
  addSalonsRejected,
  removeSalonsFulfilled,
  removeSalonsPending,
  removeSalonsRejected,
  updateSalonsFulfilled,
  updateSalonsPending,
  updateSalonsRejected,
} from "./reducers";

const initialState = {
  salonsData: [],
  appointment: {},
  salonsNumber: 0,
  salonsStatistics: 0,
  loading: {
    getSalons: false,
    getAppointmentByID: false,
    getSalonsStatistics: false,
    addSalons: false,
    updateSalons: false,
    removeSalons: false,
  },
  error: {
    getSalons: "",
    getAppointmentByID: "",
    getSalonsStatistics: "",
    addSalons: "",
    updateSalons: "",
    removeSalons: "",
  },
  success: {
    getSalons: "",
    getAppointmentByID: "",
    getSalonsStatistics: "",
    addSalons: "",
    updateSalons: "",
    removeSalons: "",
  },
};
const salonsSlice = createSlice({
  name: "salons",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.success.addSalons = "";
      state.success.updateSalons = "";
      state.success.removeSalons = "";
      state.error.addSalons = "";
      state.error.updateSalons = "";
      state.error.removeSalons = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getSalons.pending, getSalonsPending)
      .addCase(getSalons.fulfilled, getSalonsFulfilled)
      .addCase(getSalons.rejected, getSalonsRejected)
      .addCase(
        getSalonsStatistics.pending,
        getSalonsStatisticsPending
      )
      .addCase(
        getSalonsStatistics.fulfilled,
        getSalonsStatisticsFulfilled
      )
      .addCase(
        getSalonsStatistics.rejected,
        getSalonsStatisticsRejected
      )
      .addCase(getAppointmentByID.pending, getAppointmentByIDPending)
      .addCase(getAppointmentByID.fulfilled, getAppointmentByIDFulfilled)
      .addCase(getAppointmentByID.rejected, getAppointmentByIDRejected)
      .addCase(addSalons.pending, addSalonsPending)
      .addCase(addSalons.fulfilled, addSalonsFulfilled)
      .addCase(addSalons.rejected, addSalonsRejected)
      .addCase(updateSalons.pending, updateSalonsPending)
      .addCase(updateSalons.fulfilled, updateSalonsFulfilled)
      .addCase(updateSalons.rejected, updateSalonsRejected)
      .addCase(removeSalons.pending, removeSalonsPending)
      .addCase(removeSalons.fulfilled, removeSalonsFulfilled)
      .addCase(removeSalons.rejected, removeSalonsRejected);
  },
});

export const { selectUser } = salonsSlice.actions;
export default salonsSlice.reducer;
