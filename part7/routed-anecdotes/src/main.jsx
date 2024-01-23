import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AnecdoteList} from "./components/AnecdoteList.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {CreateNew} from "./components/CreateNew.jsx";
import {AnecdotesProvider} from "./contexts/anecdotes.jsx";
import {NotificationProvider} from "./contexts/notification.jsx";
import {Anecdote} from "./components/Anecdote.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <AnecdoteList/>
            },
            {
                path: "/createNew",
                element: <CreateNew/>
            },
            {
                path: "/anecdote/:id",
                element: <Anecdote/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationProvider>
        <AnecdotesProvider>
            <RouterProvider router={router} />
        </AnecdotesProvider>
    </NotificationProvider>
)