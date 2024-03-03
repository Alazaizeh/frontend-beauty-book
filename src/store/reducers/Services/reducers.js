export const getServicesPending = (state, action) => {
  state.loading.getServices = true;
  state.error.getServices = '';
};

export const getServicesFulfilled = (state, action) => {
  state.servicesData = action.payload;
  state.loading.getServices = false;
};

export const getServicesRejected = (state, action) => {
  state.servicesData = [];
  state.loading.getServices = false;
  state.error.getServices = action.error.message;
};
 
// ? -------------------------------------
export const getServicesStatisticsPending = (state, action) => {
  state.servicesStatistics =0;
  state.loading.getServicesStatistics = true;
  state.error.getServicesStatistics = '';
};

export const getServicesStatisticsFulfilled = (state, action) => {
  state.servicesStatistics = action.payload;
  state.loading.getServicesStatistics = false;
};

export const getServicesStatisticsRejected = (state, action) => {
  state.servicesStatistics =0;
  state.loading.getServicesStatistics = false;
  state.error.getServicesStatistics = action.error.message;
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

export const addServicesPending = (state, action) => {
  state.success.addServices = '';
  state.loading.addServices = true;
  state.error.addServices = '';
};

export const addServicesFulfilled = (state, action) => {
  state.success.addServices = action.payload;
  state.loading.addServices = false;
};

export const addServicesRejected = (state, action) => {
  state.success.addServices = '';
  state.loading.addServices = false;
  state.error.addServices = action.error.message;
};
// ? -------------------------------------

export const removeServicesPending = (state, action) => {
  state.success.removeServices = state.loading.removeServices = true;
  state.error.removeServices = '';
};

export const removeServicesFulfilled = (state, action) => {
  state.success.removeServices = action.payload;
  state.loading.removeServices = false;
};

export const removeServicesRejected = (state, action) => {
  state.success.removeServices = '';
  state.loading.removeServices = false;
  state.error.removeServices = action.error.message;
};
// ? -------------------------------------

export const updateServicesPending = (state, action) => {
  state.success.updateServices = '';
   state.loading.updateServices = true;
   state.error.updateServices = '';
 };
 
 export const updateServicesFulfilled = (state, action) => {
  state.success.updateServices = action.payload;
   state.loading.updateServices = false;
 };
 
 export const updateServicesRejected = (state, action) => {
  state.success.updateServices = '';
   state.loading.updateServices = false;
   state.error.updateServices = action.error.message;
 };
 // ? -------------------------------------
 