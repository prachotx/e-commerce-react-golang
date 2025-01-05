import { RouterProvider, createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductByID from "../pages/ProductByID";
import Account from "../pages/Account";
import CreateAddress from "../pages/CreateAddress";
import EditAddress from "../pages/EditAddress";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id",
      element: <ProductByID />,
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/cart",
          element: <div>Cart Page</div>,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/account/address",
          element: <CreateAddress />,
        },
        {
          path: "/account/address/:id",
          element: <EditAddress />,
        }
      ],
    },
  ];

  const routesForAdminOnly = [
    {
      path: "/admin",
      element: <RoleBasedRoute />,
      children: [
        {
          path: "/admin/dashboard",
          element: <div>Admin Dashboard</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForAdminOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
