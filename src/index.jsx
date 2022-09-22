import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from 'app/store'

import Search from 'components/Search'
import Exchanges from 'components/Exchanges'
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
                element: <Exchanges />,
                children: [
                    {
                        path: 'details/:exchangeName',
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
