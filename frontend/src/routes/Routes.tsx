import { RouterProvider, createBrowserRouter } from "react-router";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductByID from "../pages/ProductByID";
import Account from "../pages/Account";
import CreateAddress from "../pages/CreateAddress";
import EditAddress from "../pages/EditAddress";
import Cart from "../pages/Cart";
import CreateOrder from "../pages/CreateOrder";
import Orders from "../pages/Orders";
import OrderByID from "../pages/OrderByID";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage />,
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
          element: <Cart />,
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/orders/:id",
          element: <OrderByID />
        },
        {
          path: "/create_order",
          element: <CreateOrder />,
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
