import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error.tsx";
import GlobalStyles from "./GlobalStyles.tsx";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import LoginForm from "./features/authentication/Login.tsx";
import RegisterForm from "./features/authentication/Register.tsx";
import Profiles from "./pages/Profile";
import Venue from "./pages/Venue.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/venues/:id",
        element: <Venue />,
      },

      {
        path: "/auth/login",
        element: <LoginForm />,
      },
      {
        path: "/auth/register",
        element: <RegisterForm />,
      },

      {
        path: "/profiles/:name",
        element: <Profiles />,
      },

      {
        path: "/profile/:name/bookings",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyles />
  </React.StrictMode>
);
