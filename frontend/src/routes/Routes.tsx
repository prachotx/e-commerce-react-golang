import { RouterProvider, createBrowserRouter } from "react-router";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductByID from "../pages/ProductByID";
import Account from "../pages/Account";
import AddAddress from "../pages/AddAddress";
import EditAddress from "../pages/EditAddress";
import Cart from "../pages/Cart";
import CreateOrder from "../pages/AddOrder";
import Orders from "../pages/Orders";
import OrderByID from "../pages/OrderByID";
import ProductAdmin from "../pages/ProductAdmin";
import AddProduct from "../pages/AddProduct";
import CategoryAdmin from "../pages/CategoryAdmin";
import AddCategory from "../pages/AddCategory";
import EditCategory from "../pages/EditCategory";
import EditProduct from "../pages/EditProduct";
import OrderAdmin from "../pages/OrderAdmin";

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
          element: <AddAddress />,
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
          path: "/admin/products",
          element: <ProductAdmin />,
        },
        {
          path: "/admin/add_product",
          element: <AddProduct />,
        },
        {
          path: "/admin/edit_product/:id",
          element: <EditProduct />,
        },
        {
          path: "/admin/categorys",
          element: <CategoryAdmin />,
        },
        {
          path: "/admin/add_category",
          element: <AddCategory />,
        },
        {
          path: "/admin/edit_category/:id",
          element: <EditCategory />,
        },
        {
          path: "/admin/orders",
          element: <OrderAdmin />,
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
