export const getStaffPending = (state, action) => {
  state.loading.getStaff = true;
  state.error.getStaff = '';
};

export const getStaffFulfilled = (state, action) => {
  state.staffData = action.payload;
  state.loading.getStaff = false;
};

export const getStaffRejected = (state, action) => {
  state.staffData = [];
  state.loading.getStaff = false;
  state.error.getStaff = action.error.message;
};
 
// ? -------------------------------------
export const getStaffStatisticsPending = (state, action) => {
  state.staffStatistics =0;
  state.loading.getStaffStatistics = true;
  state.error.getStaffStatistics = '';
};

export const getStaffStatisticsFulfilled = (state, action) => {
  state.staffStatistics = action.payload;
  state.loading.getStaffStatistics = false;
};

export const getStaffStatisticsRejected = (state, action) => {
  state.staffStatistics =0;
  state.loading.getStaffStatistics = false;
  state.error.getStaffStatistics = action.error.message;
};
 
// ? -------------------------------------
export const getAppointmentByIDPending = (state, action) => {
  state.appointment = {};
  state.loading.getAppointmentByID = true;
  state.error.getAppointmentByID = '';
};

export const getAppointmentByIDFulfilled = (state, action) => {
  state.appointment = action.payload;
  state.loading.getAppointmentByID = false;
};

export const getAppointmentByIDRejected = (state, action) => {
  state.appointment = {};
  state.loading.getAppointmentByID = false;
  state.error.getAppointmentByID = action.error.message;
};
 
// ? -------------------------------------

export const addStaffPending = (state, action) => {
  state.success.addStaff = '';
  state.loading.addStaff = true;
  state.error.addStaff = '';
};

export const addStaffFulfilled = (state, action) => {
  state.success.addStaff = action.payload;
  state.loading.addStaff = false;
};

export const addStaffRejected = (state, action) => {
  state.success.addStaff = '';
  state.loading.addStaff = false;
  state.error.addStaff = action.error.message;
};
// ? -------------------------------------

export const removeStaffPending = (state, action) => {
  state.success.removeStaff = state.loading.removeStaff = true;
  state.error.removeStaff = '';
};

export const removeStaffFulfilled = (state, action) => {
  state.success.removeStaff = action.payload;
  state.loading.removeStaff = false;
};

export const removeStaffRejected = (state, action) => {
  state.success.removeStaff = '';
  state.loading.removeStaff = false;
  state.error.removeStaff = action.error.message;
};
// ? -------------------------------------

export const updateStaffPending = (state, action) => {
  state.success.updateStaff = '';
   state.loading.updateStaff = true;
   state.error.updateStaff = '';
 };
 
 export const updateStaffFulfilled = (state, action) => {
  state.success.updateStaff = action.payload;
   state.loading.updateStaff = false;
 };
 
 export const updateStaffRejected = (state, action) => {
  state.success.updateStaff = '';
   state.loading.updateStaff = false;
   state.error.updateStaff = action.error.message;
 };
 // ? -------------------------------------
 