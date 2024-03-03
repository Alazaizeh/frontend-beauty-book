import { createSlice } from '@reduxjs/toolkit';
import { getRoles, getPages, getActions, getAccess, addRoles, removeRoles, updateRoles } from './actions';
import {
  getRolesFulfilled,
  getRolesPending,
  getRolesRejected,
  getActionsFulfilled,
  getActionsPending,
  getActionsRejected,
  getPagesFulfilled,
  getPagesPending,
  getPagesRejected,
  addRolesFulfilled,
  addRolesPending,
  addRolesRejected,
  removeRolesFulfilled,
  removeRolesPending,
  removeRolesRejected,
  updateRolesFulfilled,
  updateRolesPending,
  updateRolesRejected
} from './reducers';

const initialState = {
  roles: [],
  pages: [],
  actions: [],
  selectedRole: {
    role_id: null,
    name: '',
    permissions:{

      pages: [],
      actions: []
    }
  },

  loading: {
    getRoles: false,
    getPages: false,
    getActions: false,
    addRoles: false,
    updateRoles: false,
    removeRoles: false
  },
  error: {
    getRoles: '',
    getPages: '',
    getActions: '',
    addRoles: '',
    updateRoles: '',
    removeRoles: ''
  },
  open: {
    addRoles: false,
    updateRoles: false,
    removeRoles: false
  },
  success: {
    getRoles: '',
    getPages: '',
    getActions: '',
    addRoles: '',
    updateRoles: '',
    removeRoles: ''
  }
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    openAddModal: (state, action) => {
      state.selectedRole = action.payload;
      state.success.addRoles = '';
      state.error.addRoles = '';
      state.open.addRoles = true;
    },
    openUpdateModal: (state, action) => {
      state.selectedRole = action.payload;
      state.success.updateRoles = '';
      state.error.updateRoles = '';
      state.open.updateRoles = true;
    },
    openRemoveModal: (state, action) => {
      state.selectedRole = action.payload;
      state.success.removeRoles = '';
      state.error.removeRoles = '';
      state.open.removeRoles = true;
    },
    closeAddModal: (state, action) => {
      state.open.addRoles = false;
    },
    closeUpdateModal: (state, action) => {
      state.open.updateRoles = false;
    },
    closeRemoveModal: (state, action) => {
      state.open.removeRoles = false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getRoles.pending, getRolesPending)
      .addCase(getRoles.fulfilled, getRolesFulfilled)
      .addCase(getRoles.rejected, getRolesRejected)

      .addCase(getActions.pending, getActionsPending)
      .addCase(getActions.fulfilled, getActionsFulfilled)
      .addCase(getActions.rejected, getActionsRejected)

      .addCase(getPages.pending, getPagesPending)
      .addCase(getPages.fulfilled, getPagesFulfilled)
      .addCase(getPages.rejected, getPagesRejected)
 
      .addCase(addRoles.pending, addRolesPending)
      .addCase(addRoles.fulfilled, addRolesFulfilled)
      .addCase(addRoles.rejected, addRolesRejected)

      .addCase(updateRoles.pending, updateRolesPending)
      .addCase(updateRoles.fulfilled, updateRolesFulfilled)
      .addCase(updateRoles.rejected, updateRolesRejected)

      .addCase(removeRoles.pending, removeRolesPending)
      .addCase(removeRoles.fulfilled, removeRolesFulfilled)
      .addCase(removeRoles.rejected, removeRolesRejected);
  }
});
export const { openAddModal, openRemoveModal, openUpdateModal, closeAddModal, closeRemoveModal, closeUpdateModal } = rolesSlice.actions;
export default rolesSlice.reducer;
