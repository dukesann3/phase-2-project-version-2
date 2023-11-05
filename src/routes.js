import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Login from "./components/Login";
import Settings from "./components/Settings";
import UserFeed from "./components/UserFeed";

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
                path: '/UserFeed/:username',
                element: <UserFeed />
            },
            {
                path: '/Settings',
                element: <Settings />
            },
        ]

    }
]

export default routes;