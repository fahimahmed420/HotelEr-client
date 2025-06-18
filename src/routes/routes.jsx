import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import ReserveTable from "../pages/ReserveTable";
import ProfilePage from "../pages/ProfilePage";
import RoomDetails from "../pages/RoomDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Reservation", element: <ReserveTable /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/roomdetails", element: <RoomDetails /> }
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
