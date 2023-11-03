import App from "./src/components/App";
import ErrorPage from "./src/components/ErrorPage";
import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Settings from "./src/components/Settings";
import UserFeed from "./src/components/UserFeed";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/Login',
                element: <Login />,
            },
            {
                path: '/UserFeed',
                element: <UserFeed />
            },
            {
                path: '/Settings',
                element: <Settings />,
            },
        ]

    }
]

export default routes;