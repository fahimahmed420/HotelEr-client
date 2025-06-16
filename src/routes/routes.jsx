import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home/> }
    ],
  },
  { path: "/login", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage/> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
