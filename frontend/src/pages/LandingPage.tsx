import Navbar from "../components/Navbar"
import Welcome from "../components/Welcome"
import Footer from "../components/Footer"
import Subscribe from "../components/Subscribe"
import { useLocation } from "react-router"
import { useEffect } from "react"
import { alertSuccess } from "../utils/alertSuccess"
import { ToastContainer } from "react-toastify"

const LandingPage = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.successMessage) {
      alertSuccess(location.state?.successMessage)
    }
  }, [location.state])

  return (
    <main className="p-2">
      <Navbar />
      <Welcome />
      <Subscribe />
      <Footer />
      <ToastContainer />
    </main>
  )
}

export default LandingPage