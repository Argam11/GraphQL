import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "components/header/header";
import Main from "pages/Main/Main";
import GamePage from "pages/GamePage/GamePage";
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
        element: <Main />,
      },
      {
        path: "/game/:id",
        element: <GamePage />,
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
