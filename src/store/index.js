import { configureStore } from "@reduxjs/toolkit";

//middlewares
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions";
// reducers
import customizationReducer from "./reducers/customizationReducer";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/Users";
import rolesReducer from "./reducers/Roles";
import staffReducer from "./reducers/Staff";
import salonsReducer from "./reducers/Sallons";
import servicesReducer from "./reducers/Services";
import appointmentsReducer from "./reducers/Appointments";
const reducer = {
  customization: customizationReducer,
  auth: authReducer,
  users: usersReducer,
  roles: rolesReducer,
  appointments: appointmentsReducer,
  staff:staffReducer,
  services:servicesReducer,
  salons:salonsReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
store.dispatch(verifyAuth());
export default store;
