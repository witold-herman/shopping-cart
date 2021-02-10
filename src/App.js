import './CSS/app.css'
import React from "react";
import {DataFetch} from "./DataFetch";
import { ToastProvider } from 'react-toast-notifications';

export const App = () => {

    return (
        <>
            <ToastProvider>
                <div className="app-container">
                    <DataFetch/>
                </div>
            </ToastProvider>
        </>
    )
};
