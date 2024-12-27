import { Navigate, Outlet } from "react-router"
import { useAuth } from "../provider/authProvider"

const RoleBasedRoute = () => {
  const { token, user } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default RoleBasedRoute
