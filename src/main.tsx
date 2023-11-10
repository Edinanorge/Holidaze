import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./pages/profile/Profile.tsx";
import ErrorPage from "./pages/Error.tsx";
import GlobalStyles from "./GlobalStyles.tsx";
import Home from "./pages/Home.tsx";

import Profiles from "./pages/profile/Profile.tsx";
import Venue from "./pages/Venue.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import AppLayout from "./AppLayout.tsx";
import VenuesByProfile from "./pages/profile/Venues.tsx";
import BookingByProfile from "./pages/profile/Bookings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },

      {
        path: "/profiles/:name",
        element: <Profile />,
      },

      {
        path: "/profiles/:name/bookings",
        element: <BookingByProfile />,
      },

      {
        path: "/profiles/:name/venues",
        element: <VenuesByProfile />,
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
