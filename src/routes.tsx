import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "components/header/header";
import GamesPage from "pages/Games/Games";
import SingleGamePage from "pages/SingleGame/SingleGame";
import CreateEditFields from "pages/CreateEditFields/CreateEditFields";

const HeaderWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderWrapper />,
    children: [
      {
        path: "/",
        element: <GamesPage />,
      },
      {
        path: "/game/:id",
        element: <SingleGamePage />,
      },
      {
        path: "/edit/:id",
        element: <CreateEditFields />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="page-not-found">
        <h1>404</h1>
        <h3>Page not found</h3>
      </div>
    ),
  },
]);

export default router;
