import { Navigate, Outlet } from "react-router"
import { useAuth } from "../providers/authProvider"
import Loading from "../components/Loading"

const RoleBasedRoute = () => {
  const { token, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loading />
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default RoleBasedRoute
