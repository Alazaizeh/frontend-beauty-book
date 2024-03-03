import { createSlice } from '@reduxjs/toolkit';
import { addUsers, getUsers, getRoles, removeUsers, updateUsers, updateUsersRole, updateUsersStatus } from './actions';
import {
  getUsersFulfilled,
  getUsersPending,
  getUsersRejected,
  getRolesFulfilled,
  getRolesPending,
  getRolesRejected,
  addUsersFulfilled,
  addUsersPending,
  addUsersRejected,
  removeUsersFulfilled,
  removeUsersPending,
  removeUsersRejected,
  updateUsersFulfilled,
  updateUsersPending,
  updateUsersRejected,
  updateUsersRoleFulfilled,
  updateUsersRolePending,
  updateUsersRoleRejected,
  updateUsersStatusFulfilled,
  updateUsersStatusPending,
  updateUsersStatusRejected
} from './reducers';

const initialState = {
  usersData: [],
  rolesData: [],
  selectedUser: {},
  loading: {
    getUsers: false,
    getRoles: false,
    addUsers: false,
    updateUsers: false,
    removeUsers: false,
    updateUsersStatus: false,
    updateUsersRole: false
  },
  error: {
    getUsers: '',
    getRoles: '',
    addUsers: '',
    updateUsers: '',
    removeUsers: '',
    updateUsersStatus: '',
    updateUsersRole: ''
  },
  success: {
    addUsers: '',
    updateUsers: '',
    removeUsers: '',
    updateUsersStatus: '',
    updateUsersRole: ''
  }
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.success.addUsers = '';
      state.success.updateUsersRole = '';
      state.success.updateUsersStatus = '';
      state.success.removeUsers = '';
      state.error.addUsers = '';
      state.error.updateUsersRole = '';
      state.error.updateUsersStatus = '';
      state.error.removeUsers = '';
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getUsers.pending, getUsersPending)
      .addCase(getUsers.fulfilled, getUsersFulfilled)
      .addCase(getUsers.rejected, getUsersRejected)
      .addCase(addUsers.pending, addUsersPending)
      .addCase(addUsers.fulfilled, addUsersFulfilled)
      .addCase(addUsers.rejected, addUsersRejected)
      .addCase(updateUsers.pending, updateUsersPending)
      .addCase(updateUsers.fulfilled, updateUsersFulfilled)
      .addCase(updateUsers.rejected, updateUsersRejected)
      .addCase(removeUsers.pending, removeUsersPending)
      .addCase(removeUsers.fulfilled, removeUsersFulfilled)
      .addCase(removeUsers.rejected, removeUsersRejected)
      .addCase(updateUsersStatus.pending, updateUsersStatusPending)
      .addCase(updateUsersStatus.fulfilled, updateUsersStatusFulfilled)
      .addCase(updateUsersStatus.rejected, updateUsersStatusRejected)
      .addCase(updateUsersRole.pending, updateUsersRolePending)
      .addCase(updateUsersRole.fulfilled, updateUsersRoleFulfilled)
      .addCase(updateUsersRole.rejected, updateUsersRoleRejected)
      .addCase(getRoles.pending, getRolesPending)
      .addCase(getRoles.fulfilled, getRolesFulfilled)
      .addCase(getRoles.rejected, getRolesRejected)
    updateUsersStatusRejected;
  }
});

export const { selectUser } = usersSlice.actions;
export default usersSlice.reducer;
