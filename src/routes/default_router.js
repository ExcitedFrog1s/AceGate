import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import Homepage from "../pages/landing/homepage.js";
import Information from "../pages/personalinf/Information";
import Manage from "../pages/manage/left.js";
import Info from "../pages/manage/info.js";
import Checked from "../pages/manage/checked.js";
import UnCheck from "../pages/manage/uncheck.js";

import Institute from "../pages/institute/institute.js";

import PaperDetails from "../pages/paper_details/paper_details";
import AdvancedSearch from '../pages/advancedSearch/advancedSearch.js'

import Journal from '../pages/journal/journal'

import ScholarPortal from '../pages/ScholarPortal/Portal.js'
import EditPortal from '../pages/ScholarPortal/EditPortal.js'
import ApplyPortal from '../pages/ScholarPortal/ApplyPortal.js'
import Login from "../pages/user/login";
import LoginAndRegister from "../pages/user/loginAndRegister";
import FindPassword from "../pages/user/findPassword";
import Register from "../pages/user/register";
import DefaultSearchResults from "../pages/serach_results/default_search/default_search_results";
import RecoverPassword from "../pages/user/recover-password";
import ResetPassword from "../pages/user/reset-password";
import {useState} from "react";
import Toolbox from "../pages/discover/toolbox";

const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/landing',
        element: <Landing />
    },
    {
        path: '/homepage',
        element: <Homepage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/toolbox',
        element: <Toolbox />
    },
    {
        path: '/loginAndRegister',
        element: <LoginAndRegister />
    },
    {
        path: '/findPassword',
        element: <FindPassword />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/recoverPassword',
        element: <RecoverPassword />
    },
    {
        path: '/resetPassword',
        element: <ResetPassword />
    },
    {
      path: '/defaultSearch',
      element: <DefaultSearchResults />
    },
    {
        path: '/advancedSearch',
        element: <AdvancedSearch />
    },
    {
        path: '/journal',
        element: <Journal/>
    },
    {
        path: '/manage',
        element: <Manage />,
        children: [
            {
                path: 'info',
                element: <Info />
            },
            {
                path: 'checked',
                element: <Checked />
            },
            {
                path: 'uncheck',
                element: <UnCheck />
            }
        ]
    },
    {
        path: '/institute',
        element: <Institute />
    },
    {
        path: '/paperDetails',
        element: <PaperDetails />
    },
    {
        path: '/advancedSearch',
        element: <AdvancedSearch />
    },
    {
        path: '/personInfo',
        element: <Information />,
        children: [
            {
                path: 'edit',
                element: <Information/>
            },
            {
                path: 'account',
                element: <Information/>
            },
            {
                path: 'accountedit',
                element: <Information/>
            },


        ]
    },
    {
        path: '/scholarPortal',
        element: <ScholarPortal />
    },
    {
        path: '/editPortal',
        element: <EditPortal />
    },
    {
        path: '/applyPortal',
        element: <ApplyPortal />
    }

])

export default default_router;


