import { Navigate, Outlet } from "react-router"
import { useAuth } from "../providers/authProvider"

const ProtectedRoute = () => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
