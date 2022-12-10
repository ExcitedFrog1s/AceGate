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

const theme = extendTheme({
    colors: {
      frog: {
        400: '#7551FF',
        500: "#422afb",
        600: "#3311DB",
      },
      navy:{
        50: '#d0dcfb',
        100: '#aac0fe',
        200: '#a3b9f8',
        300: '#728fea',
        400: '#3652ba',
        500: '#1b3bbb',
        600: '#24388a'
    }
    },
})

axios.defaults.baseURL = 'https://mock.apifox.cn/m1/1955876-0-default'
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
