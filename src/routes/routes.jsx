import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import ReserveTable from "../pages/ReserveTable";
import RoomDetails from "../pages/RoomDetails";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";

// New imports for dashboard
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/ProfilePage";
import Security from "../pages/Security";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Reservation", element: <ReserveTable /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/roomdetails/:id", element: <RoomDetails /> },
      { path: "/bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
      { path: "/aboutus", element: <AboutUs /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "profile", element: <MyProfile /> },
      { path: "security", element: <Security /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
