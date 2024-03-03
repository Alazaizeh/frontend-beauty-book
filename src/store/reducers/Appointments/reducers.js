export const getAppointmentsPending = (state, action) => {
  state.loading.getAppointments = true;
  state.error.getAppointments = '';
};

export const getAppointmentsFulfilled = (state, action) => {
  state.appointmentsData = action.payload;
  state.loading.getAppointments = false;
};

export const getAppointmentsRejected = (state, action) => {
  state.appointmentsData = [];
  state.loading.getAppointments = false;
  state.error.getAppointments = action.error.message;
};
 
// ? -------------------------------------
export const getAppointmentsStatisticsPending = (state, action) => {
  state.appointmentsStatistics ={};
  state.loading.getAppointmentsStatistics = true;
  state.error.getAppointmentsStatistics = '';
};

export const getAppointmentsStatisticsFulfilled = (state, action) => {
  state.appointmentsStatistics = action.payload;
  state.loading.getAppointmentsStatistics = false;
};

export const getAppointmentsStatisticsRejected = (state, action) => {
  state.appointmentsStatistics ={};
  state.loading.getAppointmentsStatistics = false;
  state.error.getAppointmentsStatistics = action.error.message;
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

export const addAppointmentsPending = (state, action) => {
  state.success.addAppointments = '';
  state.loading.addAppointments = true;
  state.error.addAppointments = '';
};

export const addAppointmentsFulfilled = (state, action) => {
  state.success.addAppointments = action.payload;
  state.loading.addAppointments = false;
};

export const addAppointmentsRejected = (state, action) => {
  state.success.addAppointments = '';
  state.loading.addAppointments = false;
  state.error.addAppointments = action.error.message;
};
// ? -------------------------------------

export const removeAppointmentsPending = (state, action) => {
  state.success.removeAppointments = state.loading.removeAppointments = true;
  state.error.removeAppointments = '';
};

export const removeAppointmentsFulfilled = (state, action) => {
  state.success.removeAppointments = action.payload;
  state.loading.removeAppointments = false;
};

export const removeAppointmentsRejected = (state, action) => {
  state.success.removeAppointments = '';
  state.loading.removeAppointments = false;
  state.error.removeAppointments = action.error.message;
};
// ? -------------------------------------

export const updateAppointmentsPending = (state, action) => {
  state.success.updateAppointments = '';
   state.loading.updateAppointments = true;
   state.error.updateAppointments = '';
 };
 
 export const updateAppointmentsFulfilled = (state, action) => {
  state.success.updateAppointments = action.payload;
   state.loading.updateAppointments = false;
 };
 
 export const updateAppointmentsRejected = (state, action) => {
  state.success.updateAppointments = '';
   state.loading.updateAppointments = false;
   state.error.updateAppointments = action.error.message;
 };
 // ? -------------------------------------
 