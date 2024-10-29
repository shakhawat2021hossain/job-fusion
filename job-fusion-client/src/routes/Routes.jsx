import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import UpdateJobPost from '../pages/UpdateJobPost/UpdateJobPost';
import PrivateRoute from './PrivateRoute';
import MyBids from '../pages/MyBids/MyBids';
import BidReq from '../pages/BidReq/BidReq';
import AllJobs from '../pages/AllJobs/AllJobs';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/jobs',
                element: <AllJobs></AllJobs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/job/:id',
                element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>
            },
            {
                path: '/add-job',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: '/posted-jobs',
                element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
            },
            {
                path: '/update-job/:id',
                element: <PrivateRoute><UpdateJobPost></UpdateJobPost></PrivateRoute>
            },
            {
                path: '/my-bids',
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
            },
            {
                path: '/bid-req',
                element: <PrivateRoute><BidReq></BidReq></PrivateRoute>
            },
        ]
    }
])