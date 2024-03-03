import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: ["Dashboard"],  
  defaultId: 'Appointments',
  fontFamily:"'Roboto', sans-serif"  ,
  borderRadius: 14,
  opened: true,
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    menuOpen: (state, action) => {
      state.isOpen = [action.payload.id];
    },
    setMenu: (state, action) => {
      state.opened = action.payload.opened;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload.fontFamily;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload.borderRadius;
    },
  },
});

export const {
  menuOpen,
  setMenu,
  setFontFamily,
  setBorderRadius,
} = customizationSlice.actions;

export default customizationSlice.reducer;
