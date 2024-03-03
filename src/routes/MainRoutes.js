import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";

// sample page routing
const LandingPage = Loadable(lazy(() => import("views/pages/landing")));
const NotFoundPage = Loadable(lazy(() => import("views/pages/Error")));

// sample page routing
const UsersPage = Loadable(lazy(() => import("views/pages/Users")));
const RolesPage = Loadable(lazy(() => import("views/pages/Roles")));
const SalonsPage = Loadable(lazy(() => import("views/pages/Salons")));
const SalonsDashboardPage = Loadable(
  lazy(() => import("views/pages/SalonDashboard"))
);
const AccountSettings = Loadable(lazy(() => import("views/pages/account")));

// sample page routing
// const UsersPage = Loadable(lazy(() => import("views/pages/Salons")));
const StaffPage = Loadable(lazy(() => import("views/pages/Staff")));
const ServicesPage = Loadable(lazy(() => import("views/pages/Services")));
const AppointmentsPage = Loadable(
  lazy(() => import("views/pages/Appointments"))
);
const AppointmentsDetailsPage = Loadable(
  lazy(() => import("views/pages/Appointments/InvoiceDetailsPage"))
);
// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Register3"))
);
// ==============================|| MAIN ROUTING ||============================== //

export const PublicRoutes = {
  path: "/",
  children: [
    {
      id: "Home",
      path: "",
      element: <LandingPage />,
    },
    {
      id: "Salons",
      path: "salons",
      element: <SalonsPage />,
    },
    {
      id: "Dashboard",
      path: "dashboard",
      protected:true,
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          id: "Users",
          path: "users",
          element: <UsersPage />,
        },
        {
          id: "Roles",
          path: "roles",
          element: <RolesPage />,
        },
        {
          id: "Staff",
          path: "staff",
          element: <StaffPage />,
        },
        {
          id: "Services",
          path: "services",
          element: <ServicesPage />,
        },

        {
          id: "Salons",
          path: "salons",
          element: <SalonsDashboardPage />,
        },
        {
          id: "Appointments",
          path: "appointments",
          element: <AppointmentsPage />,
        },
        {
          id: "Appointments-Details",
          path: "appointments-details/:id",
          element: <AppointmentsDetailsPage />,
        },
        {
          id: "Else",
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      id: "login",
      path: "/login",
      element: (
        <PublicRoute>
          <AuthLogin3 />
        </PublicRoute>
      ),
    },
    {
      id: "register",
      path: "/register",
      element: (
        <PublicRoute>
          <AuthRegister3 />
        </PublicRoute>
      ),
    },

    {
      id: "ERROR",
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

 
export default PublicRoutes;
