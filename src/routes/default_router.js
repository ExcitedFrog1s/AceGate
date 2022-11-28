import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import SearchResults from "../pages/serach_results/search_results";
import Manage from "../manage/left.js";
import Info from "../manage/info.js";
import Scholars from "../manage/scholar.js";
import Check from "../manage/check.js";

import PaperDetails from "../pages/paper_details/paper_details";
import AdvancedSearch from '../pages/advancedSearch/advancedSearch.js'
const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
      name: 'searchResults',
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
    }

])

export default default_router;


