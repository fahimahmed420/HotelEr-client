import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import ReserveTable from "../pages/ReserveTable";
import ProfilePage from "../pages/ProfilePage";
import RoomDetails from "../pages/RoomDetails";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Reservation", element: <ReserveTable />},
      { path: "/profile", element: <PrivateRoute><ProfilePage /></PrivateRoute> },
      {path:"/rooms", element: <Rooms/>},
      { path: "/roomdetails/:id", element: <RoomDetails />},
      { path: "/bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
      { path: "/aboutus", element: <AboutUs /> }
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
