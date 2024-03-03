export const getUsersPending = (state, action) => {
  state.usersData = [];
  state.loading.getUsers = true;
  state.error.getUsers = '';
};

export const getUsersFulfilled = (state, action) => {
  state.usersData = action.payload;
  state.loading.getUsers = false;
};

export const getUsersRejected = (state, action) => {
  state.usersData = [];
  state.loading.getUsers = false;
  state.error.getUsers = action.error.message;
};
 
// ? -------------------------------------
export const getRolesPending = (state, action) => {
  state.rolesData = [];
  state.loading.getRoles = true;
  state.error.getRoles = '';
};

export const getRolesFulfilled = (state, action) => {
  state.rolesData = action.payload;
  state.loading.getRoles = false;
};

export const getRolesRejected = (state, action) => {
  state.rolesData = [];
  state.loading.getRoles = false;
  state.error.getRoles = action.error.message;
};
 
// ? -------------------------------------

export const addUsersPending = (state, action) => {
  state.success.addUsers = '';
  state.loading.addUsers = true;
  state.error.addUsers = '';
};

export const addUsersFulfilled = (state, action) => {
  state.success.addUsers = action.payload;
  state.loading.addUsers = false;
};

export const addUsersRejected = (state, action) => {
  state.success.addUsers = '';
  state.loading.addUsers = false;
  state.error.addUsers = action.error.message;
};
// ? -------------------------------------

export const removeUsersPending = (state, action) => {
  state.success.removeUsers = state.loading.removeUsers = true;
  state.error.removeUsers = '';
};

export const removeUsersFulfilled = (state, action) => {
  state.success.removeUsers = action.payload;
  state.loading.removeUsers = false;
};

export const removeUsersRejected = (state, action) => {
  state.success.removeUsers = '';
  state.loading.removeUsers = false;
  state.error.removeUsers = action.error.message;
};
// ? -------------------------------------

export const updateUsersPending = (state, action) => {
  state.success.updateUsers = '';
   state.loading.updateUsers = true;
   state.error.updateUsers = '';
 };
 
 export const updateUsersFulfilled = (state, action) => {
  state.success.updateUsers = action.payload;
   state.loading.updateUsers = false;
 };
 
 export const updateUsersRejected = (state, action) => {
  state.success.updateUsers = '';
   state.loading.updateUsers = false;
   state.error.updateUsers = action.error.message;
 };
 // ? -------------------------------------

 export const updateUsersRolePending = (state, action) => {
  state.success.updateUsersRole = '';
   state.loading.updateUsersRole = true;
   state.error.updateUsersRole = '';
 };
 
 export const updateUsersRoleFulfilled = (state, action) => {
  state.success.updateUsersRole = action.payload;
   state.loading.updateUsersRole = false;
 };
 
 export const updateUsersRoleRejected = (state, action) => {
  state.success.updateUsersRole = '';
   state.loading.updateUsersRole  = false;
   state.error.updateUsersRole = action.error.message;
 };
 // ? -------------------------------------

 export const updateUsersStatusPending = (state, action) => {
  state.success.updateUsersStatus = '';
   state.loading.updateUsersStatus = true;
   state.error.updateUsersStatus = '';
 };
 
 export const updateUsersStatusFulfilled = (state, action) => {
  state.success.updateUsersStatus = action.payload;
   state.loading.updateUsersStatus = false;
 };
 
 export const updateUsersStatusRejected = (state, action) => {
  state.success.updateUsersStatus = '';
   state.loading.updateUsersStatus = false;
   state.error.updateUsersStatus = action.error.message;
 };
 // ? -------------------------------------
 