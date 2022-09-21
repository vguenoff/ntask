import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from 'app/store'
import Search from 'components/Search'
import reportWebVitals from './reportWebVitals'
import Exchange from 'components/Exchange'
import Details from 'components/Details'

import './index.scss'

const container = document.getElementById('root')
const root = createRoot(container)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Search />,
        children: [
            {
                path: ':exchangePair',
                element: <Exchange />,
                children: [
                    {
                        path: 'details',
                        element: <Details />,
                    },
                ],
            },
        ],
    },
])

root.render(
    <React.StrictMode>
        <Provider {...{ store }}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
