import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'

const default_router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    }
])

export default default_router;
