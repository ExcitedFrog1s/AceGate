import {
    createBrowserRouter,
} from "react-router-dom";

import Landing from '../pages/landing/landing.js'
import PaperDetails from "../pages/paper_details/paper_details";
const default_router = createBrowserRouter([
    {
        path: '/',
        element: <PaperDetails />
    }
])

export default default_router;
