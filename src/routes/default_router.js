import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import AdvancedSearch from '../pages/advancedSearch/advancedSearch.js'
const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/advancedSearch',
        element: <AdvancedSearch />
    }

])

export default default_router;


