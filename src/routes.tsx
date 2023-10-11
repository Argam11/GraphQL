import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "components/header/header";
import Main from "pages/Main/Main";
import CreateEditFields from "pages/CreateEditFields/CreateEditFields";

const HeaderWrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderWrapper />,
    children: [
      {
        path: "/main",
        element: <Main />,
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
