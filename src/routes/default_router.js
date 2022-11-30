import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import SearchResults from "../pages/serach_results/search_results";
import Information from "../pages/personalinf/Information";
import Manage from "../manage/left.js";
import Info from "../manage/info.js";
import Scholars from "../manage/scholar.js";
import Check from "../manage/check.js";

import PaperDetails from "../pages/paper_details/paper_details";
import AdvancedSearch from '../pages/advancedSearch/advancedSearch.js'

import ScholarPortal from '../pages/ScholarPortal/Portal.js'
import EditPortal from '../pages/ScholarPortal/EditPortal.js'
import ApplyPortal from '../pages/ScholarPortal/ApplyPortal.js'
import Login from "../pages/user/login";
import Register from "../pages/user/register";
const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
      path: '/searchResults',
      element: <SearchResults/>
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
                path: 'scholars',
                element: <Scholars />
            },
            {
                path: 'check',
                element: <Check />
            }
        ]
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
            }

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


