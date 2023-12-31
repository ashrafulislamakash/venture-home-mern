import * as React from "react";

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddRoom from "../Pages/Dashboard/AddRoom";
import { getRoom } from "../api/rooms";
import MyBookings from "../Pages/Dashboard/MyBookings";
import MyListings from "../Pages/Dashboard/MyListings";
import ManageBookings from "../Pages/Dashboard/ManageBookings";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => getRoom(params.id),
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/dashboard/addroom",
        element: <AddRoom></AddRoom>,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "/dashboard/my-listings",
        element: <MyListings></MyListings>,
      },
      {
        path: "/dashboard/manage-bookings",
        element: <ManageBookings></ManageBookings>,
      },
    ],
  },
]);

export default router;
