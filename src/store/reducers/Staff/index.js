import { createSlice } from "@reduxjs/toolkit";
import {
  addStaff,
  getStaff,
  getStaffStatistics,
  getAppointmentByID,
  removeStaff,
  updateStaff,
} from "./actions";
import {
  getStaffFulfilled,
  getStaffPending,
  getStaffRejected,
  getAppointmentByIDFulfilled,
  getAppointmentByIDPending,
  getAppointmentByIDRejected,
  getStaffStatisticsFulfilled,
  getStaffStatisticsPending,
  getStaffStatisticsRejected,
  addStaffFulfilled,
  addStaffPending,
  addStaffRejected,
  removeStaffFulfilled,
  removeStaffPending,
  removeStaffRejected,
  updateStaffFulfilled,
  updateStaffPending,
  updateStaffRejected,
} from "./reducers";

const initialState = {
  staffData: [],
  appointment: {},
  staffNumber: 0,
  staffStatistics: 0,
  loading: {
    getStaff: false,
    getAppointmentByID: false,
    getStaffStatistics: false,
    addStaff: false,
    updateStaff: false,
    removeStaff: false,
  },
  error: {
    getStaff: "",
    getAppointmentByID: "",
    getStaffStatistics: "",
    addStaff: "",
    updateStaff: "",
    removeStaff: "",
  },
  success: {
    getStaff: "",
    getAppointmentByID: "",
    getStaffStatistics: "",
    addStaff: "",
    updateStaff: "",
    removeStaff: "",
  },
};
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.success.addStaff = "";
      state.success.updateStaff = "";
      state.success.removeStaff = "";
      state.error.addStaff = "";
      state.error.updateStaff = "";
      state.error.removeStaff = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getStaff.pending, getStaffPending)
      .addCase(getStaff.fulfilled, getStaffFulfilled)
      .addCase(getStaff.rejected, getStaffRejected)
      .addCase(
        getStaffStatistics.pending,
        getStaffStatisticsPending
      )
      .addCase(
        getStaffStatistics.fulfilled,
        getStaffStatisticsFulfilled
      )
      .addCase(
        getStaffStatistics.rejected,
        getStaffStatisticsRejected
      )
      .addCase(getAppointmentByID.pending, getAppointmentByIDPending)
      .addCase(getAppointmentByID.fulfilled, getAppointmentByIDFulfilled)
      .addCase(getAppointmentByID.rejected, getAppointmentByIDRejected)
      .addCase(addStaff.pending, addStaffPending)
      .addCase(addStaff.fulfilled, addStaffFulfilled)
      .addCase(addStaff.rejected, addStaffRejected)
      .addCase(updateStaff.pending, updateStaffPending)
      .addCase(updateStaff.fulfilled, updateStaffFulfilled)
      .addCase(updateStaff.rejected, updateStaffRejected)
      .addCase(removeStaff.pending, removeStaffPending)
      .addCase(removeStaff.fulfilled, removeStaffFulfilled)
      .addCase(removeStaff.rejected, removeStaffRejected);
  },
});

export const { selectUser } = staffSlice.actions;
export default staffSlice.reducer;
