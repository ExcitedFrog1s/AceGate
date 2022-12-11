import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from "@chakra-ui/react";
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { extendTheme } from "@chakra-ui/react"
import {
    RouterProvider,
} from "react-router-dom";
import default_router from "./routes/default_router";
import App from "./App";


axios.defaults.baseURL = 'http://localhost:8081'
// axios.defaults.baseURL = 'http://localhost:8083'
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
