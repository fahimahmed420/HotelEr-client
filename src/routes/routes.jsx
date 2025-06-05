import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyBookings from "../pages/MyBookings/MyBookings";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../layout/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/room/:id", element: <RoomDetails /> },
      { path: "/my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
