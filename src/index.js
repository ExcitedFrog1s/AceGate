import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from "@chakra-ui/react";
import 'antd/dist/antd.min.css';

import {
    RouterProvider,
} from "react-router-dom";

import default_router from "./routes/default_router";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={default_router} />
        </ChakraProvider>
    </React.StrictMode>
);
