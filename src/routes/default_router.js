import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import SearchResults from "../pages/serach_results/search_results";

const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
      path: '/searchResults',
      element: <SearchResults/>
    }
])

export default default_router;
