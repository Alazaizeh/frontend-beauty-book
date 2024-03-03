export const getSalonsPending = (state, action) => {
  state.loading.getSalons = true;
  state.error.getSalons = '';
};

export const getSalonsFulfilled = (state, action) => {
  state.salonsData = action.payload;
  state.loading.getSalons = false;
};

export const getSalonsRejected = (state, action) => {
  state.salonsData = [];
  state.loading.getSalons = false;
  state.error.getSalons = action.error.message;
};
 
// ? -------------------------------------
export const getSalonsStatisticsPending = (state, action) => {
  state.salonsStatistics =0;
  state.loading.getSalonsStatistics = true;
  state.error.getSalonsStatistics = '';
};

export const getSalonsStatisticsFulfilled = (state, action) => {
  state.salonsStatistics = action.payload;
  state.loading.getSalonsStatistics = false;
};

export const getSalonsStatisticsRejected = (state, action) => {
  state.salonsStatistics =0;
  state.loading.getSalonsStatistics = false;
  state.error.getSalonsStatistics = action.error.message;
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

export const addSalonsPending = (state, action) => {
  state.success.addSalons = '';
  state.loading.addSalons = true;
  state.error.addSalons = '';
};

export const addSalonsFulfilled = (state, action) => {
  state.success.addSalons = action.payload;
  state.loading.addSalons = false;
};

export const addSalonsRejected = (state, action) => {
  state.success.addSalons = '';
  state.loading.addSalons = false;
  state.error.addSalons = action.error.message;
};
// ? -------------------------------------

export const removeSalonsPending = (state, action) => {
  state.success.removeSalons = state.loading.removeSalons = true;
  state.error.removeSalons = '';
};

export const removeSalonsFulfilled = (state, action) => {
  state.success.removeSalons = action.payload;
  state.loading.removeSalons = false;
};

export const removeSalonsRejected = (state, action) => {
  state.success.removeSalons = '';
  state.loading.removeSalons = false;
  state.error.removeSalons = action.error.message;
};
// ? -------------------------------------

export const updateSalonsPending = (state, action) => {
  state.success.updateSalons = '';
   state.loading.updateSalons = true;
   state.error.updateSalons = '';
 };
 
 export const updateSalonsFulfilled = (state, action) => {
  state.success.updateSalons = action.payload;
   state.loading.updateSalons = false;
 };
 
 export const updateSalonsRejected = (state, action) => {
  state.success.updateSalons = '';
   state.loading.updateSalons = false;
   state.error.updateSalons = action.error.message;
 };
 // ? -------------------------------------
 