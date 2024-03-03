export const getRolesPending = (state, action) => {
  state.roles = [];
  state.loading.getRoles = true;
  state.error.getRoles = '';
};

export const getRolesFulfilled = (state, action) => {
  state.roles = action.payload;
  state.loading.getRoles = false;
};

export const getRolesRejected = (state, action) => {
  state.roles = [];
  state.loading.getRoles = false;
  state.error.getRoles = action.error.message;
};
 
 
// ? -------------------------------------
export const getPagesPending = (state, action) => {
  state.pages = [];
  state.loading.getPages = true;
  state.error.getPages = '';
};

export const getPagesFulfilled = (state, action) => {
  state.pages = action.payload;
  state.loading.getPages = false;
};

export const getPagesRejected = (state, action) => {
  state.pages = [];
  state.loading.getPages = false;
  state.error.getPages = action.error.message;
};
 
 
// ? -------------------------------------
export const getActionsPending = (state, action) => {
  state.actions = [];
  state.loading.getActions = true;
  state.error.getActions = '';
};

export const getActionsFulfilled = (state, action) => {
  state.actions = action.payload;
  state.loading.getActions = false;
};

export const getActionsRejected = (state, action) => {
  state.actions = [];
  state.loading.getActions = false;
  state.error.getActions = action.error.message;
};
 
 
// ? -------------------------------------

export const addRolesPending = (state, action) => {
  state.success.addRoles = '';
  state.loading.addRoles = true;
  state.error.addRoles = '';
};

export const addRolesFulfilled = (state, action) => {
  state.success.addRoles = action.payload;
  state.loading.addRoles = false;
};

export const addRolesRejected = (state, action) => {
  state.success.addRoles = '';
  state.loading.addRoles = false;
  state.error.addRoles = action.error.message;
};
// ? -------------------------------------

export const removeRolesPending = (state, action) => {
  state.success.removeRoles= '';
  state.loading.removeRoles = true;
  state.error.removeRoles = '';
};

export const removeRolesFulfilled = (state, action) => {
  state.success.removeRoles = action.payload;
  state.loading.removeRoles = false;
};

export const removeRolesRejected = (state, action) => {
  state.success.removeRoles = '';
  state.loading.removeRoles = false;
  state.error.removeRoles = action.error.message;
};
// ? -------------------------------------

export const updateRolesPending = (state, action) => {
  state.success.updateRoles =  '';
  state.loading.updateRoles = true;
  state.error.updateRoles = '';
};

export const updateRolesFulfilled = (state, action) => {
  state.success.updateRoles = action.payload;
  state.loading.updateRoles = false;
};

export const updateRolesRejected = (state, action) => {

  state.success.updateRoles =  '';
  state.loading.updateRoles = false;
  state.error.updateRoles = action.error.message;
};
